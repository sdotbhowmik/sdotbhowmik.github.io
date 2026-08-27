# subrata.tech - Hostinger upload checklist
# Run this from the repo root before each Hostinger upload to make sure
# nothing is missing. Compares local files against the live site.
#
# Usage (PowerShell, from this folder):
#   .\upload-checklist.ps1

$ErrorActionPreference = 'Stop'
$repoRoot = $PSScriptRoot
$base     = 'https://subrata.tech'

# Files that MUST be live for the page to render correctly
$required = @(
    'index.html'
    'style.css'
    'script.js'
    'animations.js'
    'pipeline-config.js'
    '.htaccess'
    '404.html'
    'images/logo/Logo_Final_Black.png'
    'images/profile-1.jpeg'
    'images/cert-placeholder.svg'
    'images/certificates/CODECHEF_ML_CERTIFICATE.png'
    'images/favicon_io/favicon.ico'
    'projects/Selenium_Framework.png'
    'projects/Appium_Framework.png'
    'projects/Playwright_Framework.png'
    'projects/Performence_Testing.png'
    'projects/RobotFramework.png'
    'pdf/CV_SubrataKumarBhowmik.pdf'
)

Write-Host "`n=== Local files ===" -ForegroundColor Cyan
foreach ($f in $required) {
    $local = Join-Path $repoRoot $f
    if (Test-Path -LiteralPath $local) {
        $size = (Get-Item $local).Length
        Write-Host ("  OK   {0,-60} {1,8} bytes" -f $f, $size) -ForegroundColor Green
    } else {
        Write-Host ("  MISS {0,-60}" -f $f) -ForegroundColor Red
    }
}

Write-Host "`n=== Live server check ===" -ForegroundColor Cyan
Write-Host "Probing $base ...`n"

foreach ($f in $required) {
    $url = "$base/$($f -replace '\\','/')"
    try {
        $r = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        $code = $r.StatusCode
        if ($code -eq 200) {
            Write-Host ("  OK   {0,-3} {1}" -f $code, $url) -ForegroundColor Green
        } else {
            Write-Host ("  ??   {0,-3} {1}" -f $code, $url) -ForegroundColor Yellow
        }
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        if (-not $code) { $code = 'ERR' }
        Write-Host ("  FAIL {0,-3} {1}" -f $code, $url) -ForegroundColor Red
    }
}

Write-Host "`n=== Done ===" -ForegroundColor Cyan
Write-Host "Any FAIL line above means that file is missing from Hostinger."
Write-Host "Re-upload it via File Manager or FTP and re-run this script."
