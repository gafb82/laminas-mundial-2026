$ErrorActionPreference = "Stop"

$RepoName = "laminas-mundial-2026"
$Gh = Join-Path $PSScriptRoot "..\.tools\gh-portable\bin\gh.exe"

if (-not (Test-Path $Gh)) {
  $Gh = "gh"
}

Write-Host "Verificando sesion de GitHub..."
& $Gh auth status

Write-Host "Creando repositorio GitHub si no existe..."
& $Gh repo create "gfloresbasaez/$RepoName" --public --source . --remote origin --push

Write-Host "Activando GitHub Pages desde main / root..."
try {
  & $Gh api `
    --method POST `
    -H "Accept: application/vnd.github+json" `
    "/repos/gfloresbasaez/$RepoName/pages" `
    -f "source[branch]=main" `
    -f "source[path]=/"
} catch {
  Write-Host "GitHub Pages ya puede estar activo. Verificando..."
}

Write-Host ""
Write-Host "Listo. URL esperada:"
Write-Host "https://gfloresbasaez.github.io/$RepoName/"
Write-Host ""
Write-Host "Agrega esa URL en Supabase Authentication > URL Configuration."
