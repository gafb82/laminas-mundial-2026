$ErrorActionPreference = "Stop"

function Read-SecretText($Prompt) {
  $secure = Read-Host $Prompt -AsSecureString
  $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
  } finally {
    if ($ptr -ne [IntPtr]::Zero) {
      [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
    }
  }
}

function Invoke-Json($Method, $Uri, $Headers, $Body = $null) {
  $params = @{
    Method = $Method
    Uri = $Uri
    Headers = $Headers
  }
  if ($null -ne $Body) {
    $params.ContentType = "application/json"
    $params.Body = ($Body | ConvertTo-Json -Depth 30 -Compress)
  }
  return Invoke-RestMethod @params
}

function Find-SupabaseUser($SupabaseUrl, $ServiceKey, $Email) {
  $headers = @{
    apikey = $ServiceKey
    Authorization = "Bearer $ServiceKey"
  }
  $page = 1
  do {
    $result = Invoke-Json "GET" "$SupabaseUrl/auth/v1/admin/users?page=$page&per_page=100" $headers
    $users = @($result.users)
    $match = $users | Where-Object { $_.email -eq $Email } | Select-Object -First 1
    if ($match) { return $match }
    $page += 1
  } while ($users.Count -eq 100 -and $page -le 20)
  return $null
}

function New-OrGet-SupabaseUser($SupabaseUrl, $ServiceKey, $Email, $Password) {
  $headers = @{
    apikey = $ServiceKey
    Authorization = "Bearer $ServiceKey"
  }

  $existing = Find-SupabaseUser $SupabaseUrl $ServiceKey $Email
  if ($existing) { return $existing }

  try {
    return Invoke-Json "POST" "$SupabaseUrl/auth/v1/admin/users" $headers @{
      email = $Email
      password = $Password
      email_confirm = $true
      user_metadata = @{
        migrated_from = "netlify"
      }
    }
  } catch {
    $existing = Find-SupabaseUser $SupabaseUrl $ServiceKey $Email
    if ($existing) { return $existing }
    throw
  }
}

function Split-Chunks($Items, $Size) {
  for ($i = 0; $i -lt $Items.Count; $i += $Size) {
    $end = [Math]::Min($i + $Size - 1, $Items.Count - 1)
    @($Items[$i..$end])
  }
}

$ExportDir = Join-Path $PSScriptRoot "exports"
$ExportFile = Get-ChildItem -Path $ExportDir -Filter "netlify-export-*.json" |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

if (-not $ExportFile) {
  throw "No encontre exportaciones en $ExportDir. Ejecuta primero export-netlify-data.ps1."
}

Write-Host ""
Write-Host "Migrador Netlify -> Supabase" -ForegroundColor Cyan
Write-Host "Exportacion: $($ExportFile.FullName)"
Write-Host ""
Write-Host "Antes de continuar, el proyecto Supabase debe tener ejecutado supabase-schema.sql en SQL Editor." -ForegroundColor Yellow
Write-Host ""

$SupabaseUrl = (Read-Host "Supabase Project URL, ej: https://xxxx.supabase.co").Trim().TrimEnd("/")
$AnonKey = Read-SecretText "Supabase anon public key"
$ServiceKey = Read-SecretText "Supabase service_role key (no se guardara)"
$NewPassword = Read-SecretText "Nueva contrasena para entrar a la app en Supabase"

$export = Get-Content -Raw -LiteralPath $ExportFile.FullName | ConvertFrom-Json
$email = [string]$export.email
if (-not $email) { throw "La exportacion no contiene email." }

$serviceHeaders = @{
  apikey = $ServiceKey
  Authorization = "Bearer $ServiceKey"
  Prefer = "return=representation"
}

Write-Host ""
Write-Host "Verificando tablas Supabase..." -ForegroundColor Cyan
try {
  Invoke-Json "GET" "$SupabaseUrl/rest/v1/communities?select=id&limit=1" $serviceHeaders | Out-Null
} catch {
  Write-Host ""
  Write-Host "No pude leer la tabla communities. Ejecuta supabase-schema.sql en Supabase SQL Editor y vuelve a correr este script." -ForegroundColor Red
  Write-Host "Archivo SQL: $PSScriptRoot\supabase-schema.sql"
  throw
}

Write-Host "Creando o reutilizando usuario Supabase para $email..." -ForegroundColor Cyan
$supabaseUser = New-OrGet-SupabaseUser $SupabaseUrl $ServiceKey $email $NewPassword
$userId = [string]$supabaseUser.id

Write-Host "Migrando comunidad..." -ForegroundColor Cyan
$communityBody = @(
  @{
    name = [string]$export.community.name
    code = [string]$export.community.code
    created_by = $userId
  }
)
$community = Invoke-Json "POST" "$SupabaseUrl/rest/v1/communities?on_conflict=code&select=*" @{
  apikey = $ServiceKey
  Authorization = "Bearer $ServiceKey"
  Prefer = "resolution=merge-duplicates,return=representation"
} $communityBody
$communityId = [string]@($community)[0].id

Write-Host "Migrando perfil..." -ForegroundColor Cyan
$profileBody = @(
  @{
    id = $userId
    display_name = [string]$export.profile.displayName
    location = [string]$export.profile.location
    community_id = $communityId
    updated_at = (Get-Date).ToString("o")
  }
)
Invoke-Json "POST" "$SupabaseUrl/rest/v1/profiles?on_conflict=id" @{
  apikey = $ServiceKey
  Authorization = "Bearer $ServiceKey"
  Prefer = "resolution=merge-duplicates,return=minimal"
} $profileBody | Out-Null

Write-Host "Limpiando inventario anterior del usuario en Supabase..." -ForegroundColor Cyan
Invoke-Json "DELETE" "$SupabaseUrl/rest/v1/user_stickers?user_id=eq.$userId" @{
  apikey = $ServiceKey
  Authorization = "Bearer $ServiceKey"
  Prefer = "return=minimal"
} | Out-Null

$oldUserId = [string]$export.profile.id
$rows = @($export.stickerRows | Where-Object { $_.user_id -eq $oldUserId } | ForEach-Object {
  @{
    user_id = $userId
    sticker_id = [string]$_.sticker_id
    status = [string]$_.status
    updated_at = (Get-Date).ToString("o")
  }
})

Write-Host "Migrando $($rows.Count) registros de laminas..." -ForegroundColor Cyan
foreach ($chunk in (Split-Chunks $rows 250)) {
  Invoke-Json "POST" "$SupabaseUrl/rest/v1/user_stickers" @{
    apikey = $ServiceKey
    Authorization = "Bearer $ServiceKey"
    Prefer = "return=minimal"
  } $chunk | Out-Null
}

$owned = @($rows | Where-Object { $_.status -eq "owned" }).Count
$missing = @($rows | Where-Object { $_.status -eq "missing" }).Count
$duplicates = @($rows | Where-Object { $_.status -eq "duplicates" }).Count

$configPath = Join-Path $PSScriptRoot "config.js"
@"
window.APP_CONFIG = {
  backend: "supabase",
  supabaseUrl: "$SupabaseUrl",
  supabaseAnonKey: "$AnonKey"
};
"@ | Set-Content -LiteralPath $configPath -Encoding UTF8

$reportPath = Join-Path $ExportDir ("supabase-migration-report-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".json")
[ordered]@{
  migratedAt = (Get-Date).ToString("o")
  export = $ExportFile.FullName
  supabaseUrl = $SupabaseUrl
  email = $email
  userId = $userId
  communityId = $communityId
  counts = [ordered]@{
    owned = $owned
    missing = $missing
    duplicates = $duplicates
    total = $rows.Count
  }
} | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $reportPath -Encoding UTF8

Write-Host ""
Write-Host "Migracion completa." -ForegroundColor Green
Write-Host "Tengo:     $owned"
Write-Host "Faltan:    $missing"
Write-Host "Repetidas: $duplicates"
Write-Host "Total:     $($rows.Count)"
Write-Host ""
Write-Host "Config actualizado: $configPath"
Write-Host "Reporte: $reportPath"
Write-Host ""
Write-Host "Ahora puedes entrar a GitHub Pages con:"
Write-Host "Email: $email"
Write-Host "Contrasena: la nueva contrasena que acabas de escribir"
Write-Host ""

Read-Host "Presiona Enter para cerrar"
