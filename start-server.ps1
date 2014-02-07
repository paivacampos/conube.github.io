$appPort = '8090'
$appRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$appRoot = $appRoot + '\_site'
$appArgs = '/path:"{0}" /port:{1}' -f $appRoot, $appPort

$iisexpress = Join-Path `
    (Get-ItemProperty 'HKLM:\SOFTWARE\Wow6432Node\Microsoft\IISExpress\8.0' 'InstallPath').InstallPath `
    'iisexpress.exe'

Write-Host 'Starting NuPeek Server using IIS Express'
Write-Host $iisexpress ' ' $appArgs
Start-Process $iisexpress -ArgumentList $appArgs -WindowStyle Hidden