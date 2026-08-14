# Generates data/gallery-images.js from assets/images folders.
# Deduplicates identical photos reused across folders/pages
# (same filename or same file content).
# Run: powershell -File scripts/generate-gallery-images.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$imagesRoot = Join-Path $root "assets\images"
$outFile = Join-Path $root "data\gallery-images.js"
$extPattern = '\.(jpe?g|png|webp)$'
$nl = [Environment]::NewLine

# Prefer more specific folders first so room photos stay under room sections.
$sections = [ordered]@{
  "hotel\rooms\SUPERIOR"            = "Superior"
  "hotel\rooms\DELUXE"              = "Deluxe"
  "hotel\rooms\SUPERDELUXE"         = "Super Deluxe"
  "hotel\rooms\EXECUTIVE RM"        = "Executive Room"
  "hotel\rooms\SUITE"               = "Suite"
  "hotel\rooms\Throne"              = "Property"
  "dining"                          = "Dining"
  "facilities\pool"                 = "Infinity Pool"
  "facilities\Bar and Lounge"       = "Bar and Lounge"
  "facilities\Reception"            = "Reception"
  "facilities\Restaurant"           = "Restaurant"
  "hotel"                           = "Hotel"
  "facilities"                      = "Facilities"
  "about"                           = "About"
  "home"                            = "Home"
}

function Encode-UrlPathCompat([string]$relativePath) {
  $parts = $relativePath -split '/'
  ($parts | ForEach-Object { [uri]::EscapeDataString($_) }) -join '/'
}

function Get-FileFingerprint([System.IO.FileInfo]$file) {
  $sha = [System.Security.Cryptography.SHA256]::Create()
  try {
    $stream = [System.IO.File]::OpenRead($file.FullName)
    try {
      $hash = [BitConverter]::ToString($sha.ComputeHash($stream)).Replace("-", "").ToLowerInvariant()
    } finally {
      $stream.Dispose()
    }
  } finally {
    $sha.Dispose()
  }
  return $hash
}

$seenNames = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::OrdinalIgnoreCase)
$seenHashes = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::OrdinalIgnoreCase)
$sectionBlocks = New-Object System.Collections.Generic.List[string]
$totalKept = 0
$totalSkipped = 0

foreach ($relDir in $sections.Keys) {
  $label = $sections[$relDir]
  $dir = Join-Path $imagesRoot $relDir
  $paths = New-Object System.Collections.Generic.List[string]

  if (Test-Path -LiteralPath $dir) {
    Get-ChildItem -LiteralPath $dir -File |
      Where-Object { $_.Name -match $extPattern } |
      # Prefer filenames without a leading underscore when duplicates exist.
      Sort-Object { if ($_.Name.StartsWith('_')) { '1' + $_.Name.ToLowerInvariant() } else { '0' + $_.Name.ToLowerInvariant() } } |
      ForEach-Object {
        # Treat "_DSC8163.jpg" and "DSC8163.jpg" as the same photo.
        $baseKey = ($_.Name -replace '^_', '').ToLowerInvariant()
        if ($seenNames.Contains($baseKey)) {
          $script:totalSkipped++
          return
        }

        $hash = Get-FileFingerprint $_
        if ($seenHashes.Contains($hash)) {
          $script:totalSkipped++
          return
        }

        [void]$seenNames.Add($baseKey)
        [void]$seenHashes.Add($hash)

        $folderUrl = ($relDir -replace '\\', '/')
        $rel = "assets/images/$folderUrl/$($_.Name)"
        [void]$paths.Add((Encode-UrlPathCompat $rel))
      }
  }

  if ($paths.Count -eq 0) { continue }

  $totalKept += $paths.Count
  $id = ($relDir -replace '[\\/ ]+', '-').ToLowerInvariant()
  $quoted = $paths | ForEach-Object { '        "' + $_ + '"' }
  $arrayBody = "[" + $nl + ($quoted -join ("," + $nl)) + $nl + "      ]"

  [void]$sectionBlocks.Add(
    ("    {" + $nl +
     '      "id": "' + $id + '",' + $nl +
     '      "label": "' + ($label -replace '"', '\"') + '",' + $nl +
     '      "images": ' + $arrayBody + $nl +
     "    }")
  )
}

$lines = New-Object System.Collections.Generic.List[string]
[void]$lines.Add("/**")
[void]$lines.Add(" * AUTO-GENERATED - do not edit by hand.")
[void]$lines.Add(" * Unique photos only (deduped by filename + file content).")
[void]$lines.Add(" * Regenerate: powershell -File scripts/generate-gallery-images.ps1")
[void]$lines.Add(" */")
[void]$lines.Add("window.EllipseGalleryImages = {")
[void]$lines.Add("  sections: [")
[void]$lines.Add(($sectionBlocks -join ("," + $nl)))
[void]$lines.Add("  ]")
[void]$lines.Add("};")
[void]$lines.Add("")

$content = ($lines -join $nl)
New-Item -ItemType Directory -Force -Path (Split-Path $outFile) | Out-Null
[System.IO.File]::WriteAllText($outFile, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output "Wrote $outFile ($totalKept unique images, skipped $totalSkipped duplicates)"
