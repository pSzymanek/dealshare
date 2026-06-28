$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$exportDir = Join-Path $projectRoot "export"
$zipPath = Join-Path $exportDir "dealshare-webd.zip"
$temporaryZip = Join-Path $projectRoot "dealshare-webd.tmp.zip"

function Run-Step {
    param(
        [string]$Description,
        [scriptblock]$Action
    )

    Write-Host "`n==> $Description" -ForegroundColor Cyan
    & $Action
}

function New-ZipArchive {
    param(
        [string]$SourceDirectory,
        [string]$DestinationPath
    )

    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem

    $archive = [System.IO.Compression.ZipFile]::Open(
        $DestinationPath,
        [System.IO.Compression.ZipArchiveMode]::Create
    )

    try {
        Get-ChildItem -LiteralPath $SourceDirectory -File -Recurse | ForEach-Object {
            $relativePath = $_.FullName.Substring($SourceDirectory.Length).TrimStart("\", "/")
            $entryName = $relativePath.Replace("\", "/")

            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
                $archive,
                $_.FullName,
                $entryName,
                [System.IO.Compression.CompressionLevel]::Optimal
            ) | Out-Null
        }
    }
    finally {
        $archive.Dispose()
    }
}

Push-Location $projectRoot

try {
    Run-Step "Czyszczenie poprzedniego exportu" {
        if (Test-Path -LiteralPath $exportDir) {
            Remove-Item -LiteralPath $exportDir -Recurse -Force
        }

        if (Test-Path -LiteralPath $temporaryZip) {
            Remove-Item -LiteralPath $temporaryZip -Force
        }

        New-Item -ItemType Directory -Path $exportDir | Out-Null
    }

    Run-Step "Budowanie aplikacji Next.js" {
        & npm.cmd run build
        if ($LASTEXITCODE -ne 0) {
            throw "Build zakonczyl sie kodem $LASTEXITCODE. Export nie zostal przygotowany."
        }
    }

    Run-Step "Kopiowanie plikow aplikacji" {
        Copy-Item -LiteralPath (Join-Path $projectRoot ".next") -Destination $exportDir -Recurse
        Copy-Item -LiteralPath (Join-Path $projectRoot "public") -Destination $exportDir -Recurse
        Copy-Item -LiteralPath (Join-Path $projectRoot "db") -Destination $exportDir -Recurse
        New-Item -ItemType Directory -Path (Join-Path $exportDir "scripts") | Out-Null
        Copy-Item -LiteralPath (Join-Path $projectRoot "scripts\bootstrap-admin.mjs") -Destination (Join-Path $exportDir "scripts")

        @(
            ".nvmrc"
            ".env.example"
            "drizzle.config.ts"
            "next.config.mjs"
            "package-lock.json"
            "package.json"
            "server.js"
            "tsconfig.json"
        ) | ForEach-Object {
            Copy-Item -LiteralPath (Join-Path $projectRoot $_) -Destination $exportDir
        }

        @'
Ten folder zawiera aktualna paczke do wgrania na hosting Node/Next.

Wgraj plik `dealshare-webd.zip` na serwer i rozpakuj go w katalogu aplikacji.
Archiwum zawiera:
- `.next`
- `public`
- `db` z migracjami MySQL/MariaDB
- `scripts/bootstrap-admin.mjs`
- `package.json`
- `package-lock.json`
- `drizzle.config.ts`
- `next.config.mjs`
- `server.js`
- `tsconfig.json`
- `.env.example` jako wzor wymaganych zmiennych

Prawdziwe zmienne srodowiskowe pozostaja skonfigurowane osobno w aplikacji Node na hostingu.
Po rozpakowaniu uruchom `npm install`, `npm run db:migrate` i start aplikacji zgodnie z panelem hostingu.
'@ | Set-Content -LiteralPath (Join-Path $exportDir "README.md") -Encoding ASCII
    }

    Run-Step "Tworzenie archiwum dealshare-webd.zip" {
        New-ZipArchive -SourceDirectory $exportDir -DestinationPath $temporaryZip
        Move-Item -LiteralPath $temporaryZip -Destination $zipPath
    }

    $zipSizeMb = [math]::Round((Get-Item -LiteralPath $zipPath).Length / 1MB, 2)

    Write-Host "`nExport gotowy:" -ForegroundColor Green
    Write-Host "Folder: $exportDir"
    Write-Host "ZIP:    $zipPath ($zipSizeMb MB)"
}
catch {
    if (Test-Path -LiteralPath $temporaryZip) {
        Remove-Item -LiteralPath $temporaryZip -Force
    }

    Write-Error $_
    exit 1
}
finally {
    Pop-Location
}
