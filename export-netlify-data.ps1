$ErrorActionPreference = "Stop"

$BaseUrl = "https://flourishing-capybara-4be82b.netlify.app"
$OutDir = Join-Path $PSScriptRoot "exports"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

Write-Host ""
Write-Host "Exportador de datos Laminas Mundial 2026" -ForegroundColor Cyan
Write-Host "Origen: $BaseUrl"
Write-Host ""
Write-Host "Ingresa la cuenta que usabas dentro de la web app, no la cuenta de GitHub." -ForegroundColor Yellow
Write-Host ""

$Email = Read-Host "Email de la app"
$SecurePassword = Read-Host "Contrasena de la app" -AsSecureString
$PasswordPtr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecurePassword)

try {
  $Password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($PasswordPtr)
  $SigninBody = @{
    email = $Email
    password = $Password
  } | ConvertTo-Json -Compress

  Write-Host ""
  Write-Host "Entrando al backend antiguo..." -ForegroundColor Cyan
  $Signin = Invoke-RestMethod `
    -Uri "$BaseUrl/api/signin" `
    -Method Post `
    -ContentType "application/json" `
    -Body $SigninBody

  if (-not $Signin.token) {
    throw "No se recibio token de sesion desde Netlify."
  }

  Write-Host "Descargando album, perfil, comunidad y solicitudes..." -ForegroundColor Cyan
  $State = Invoke-RestMethod `
    -Uri "$BaseUrl/api/state" `
    -Method Get `
    -Headers @{ Authorization = "Bearer $($Signin.token)" }

  $Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $SafeEmail = ($Email -replace '[^a-zA-Z0-9._-]', '_')
  $JsonPath = Join-Path $OutDir "netlify-export-$SafeEmail-$Timestamp.json"
  $CsvPath = Join-Path $OutDir "netlify-inventory-$SafeEmail-$Timestamp.csv"

  $Mine = @($State.stickerRows | Where-Object { $_.user_id -eq $State.profile.id })
  $Export = [ordered]@{
    exportedAt = (Get-Date).ToString("o")
    source = $BaseUrl
    email = $Email
    user = $Signin.user
    profile = $State.profile
    community = $State.community
    profiles = $State.profiles
    stickerRows = $State.stickerRows
    requests = $State.requests
    counts = [ordered]@{
      mineOwned = @($Mine | Where-Object { $_.status -eq "owned" }).Count
      mineMissing = @($Mine | Where-Object { $_.status -eq "missing" }).Count
      mineDuplicates = @($Mine | Where-Object { $_.status -eq "duplicates" }).Count
      communityStickerRows = @($State.stickerRows).Count
      requests = @($State.requests).Count
    }
  }

  $Export | ConvertTo-Json -Depth 30 | Set-Content -LiteralPath $JsonPath -Encoding UTF8
  $Mine |
    Sort-Object status, sticker_id |
    Select-Object user_id, sticker_id, status |
    Export-Csv -LiteralPath $CsvPath -NoTypeInformation -Encoding UTF8

  Write-Host ""
  Write-Host "Exportacion lista." -ForegroundColor Green
  Write-Host "JSON completo: $JsonPath"
  Write-Host "CSV inventario: $CsvPath"
  Write-Host ""
  Write-Host "Resumen:" -ForegroundColor Cyan
  Write-Host "Tengo:       $($Export.counts.mineOwned)"
  Write-Host "Me faltan:   $($Export.counts.mineMissing)"
  Write-Host "Repetidas:   $($Export.counts.mineDuplicates)"
  Write-Host "Solicitudes: $($Export.counts.requests)"
  Write-Host ""
} finally {
  if ($PasswordPtr -ne [IntPtr]::Zero) {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($PasswordPtr)
  }
  $Password = $null
}

Read-Host "Presiona Enter para cerrar"
