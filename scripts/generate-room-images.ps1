# Generates data/room-images.js by scanning assets/images/hotel/rooms/{Room Folder}/
# Run after adding or removing room photos:
#   powershell -File scripts/generate-room-images.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$roomsRoot = Join-Path $root "assets\images\hotel\rooms"
$outFile = Join-Path $root "data\room-images.js"

# slug => exact folder name under assets/images/hotel/rooms/
$folderMap = [ordered]@{
  superior       = "SUPERIOR"
  deluxe         = "DELUXE"
  "super-deluxe" = "SUPERDELUXE"
  executive      = "EXECUTIVE RM"
  suite          = "SUITE"
}

$extPattern = '\.(jpe?g|png|webp)$'

function Encode-UrlPathCompat([string]$relativePath) {
  $parts = $relativePath -split '/'
  ($parts | ForEach-Object { [uri]::EscapeDataString($_) }) -join '/'
}

$nl = [Environment]::NewLine
$bySlugBlocks = New-Object System.Collections.Generic.List[string]

foreach ($slug in $folderMap.Keys) {
  $folderName = $folderMap[$slug]
  $dir = Join-Path $roomsRoot $folderName
  $paths = New-Object System.Collections.Generic.List[string]

  if (Test-Path -LiteralPath $dir) {
    Get-ChildItem -LiteralPath $dir -File |
      Where-Object { $_.Name -match $extPattern } |
      Sort-Object { $_.Name.ToLowerInvariant() } |
      ForEach-Object {
        $rel = "assets/images/hotel/rooms/$folderName/$($_.Name)"
        [void]$paths.Add((Encode-UrlPathCompat $rel))
      }
  }

  if ($paths.Count -eq 0) {
    $arrayBody = "[]"
  } else {
    $quoted = $paths | ForEach-Object { '      "' + $_ + '"' }
    $arrayBody = "[" + $nl + ($quoted -join ("," + $nl)) + $nl + "    ]"
  }

  [void]$bySlugBlocks.Add(('    "' + $slug + '": ' + $arrayBody))
}

$folderLines = ($folderMap.GetEnumerator() | ForEach-Object {
  '    "' + $_.Key + '": "' + ($_.Value -replace '\\', '\\' -replace '"', '\"') + '"'
}) -join ("," + $nl)

$lines = New-Object System.Collections.Generic.List[string]
[void]$lines.Add("/**")
[void]$lines.Add(" * AUTO-GENERATED - do not edit by hand.")
[void]$lines.Add(" * Source: assets/images/hotel/rooms/{SUPERIOR|DELUXE|SUPERDELUXE|EXECUTIVE RM|SUITE}/")
[void]$lines.Add(" * Regenerate: powershell -File scripts/generate-room-images.ps1")
[void]$lines.Add(" *")
[void]$lines.Add(" * Room galleries are folder-driven: every jpg/jpeg/png/webp in a room folder")
[void]$lines.Add(" * is included in deterministic (case-insensitive filename) order.")
[void]$lines.Add(" */")
[void]$lines.Add("window.EllipseRoomImages = {")
[void]$lines.Add('  root: "assets/images/hotel/rooms",')
[void]$lines.Add("  folders: {")
[void]$lines.Add($folderLines)
[void]$lines.Add("  },")
[void]$lines.Add("  bySlug: {")
[void]$lines.Add(($bySlugBlocks -join ("," + $nl)))
[void]$lines.Add("  }")
[void]$lines.Add("};")
[void]$lines.Add("")

$content = ($lines -join $nl)

New-Item -ItemType Directory -Force -Path (Split-Path $outFile) | Out-Null
[System.IO.File]::WriteAllText($outFile, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output "Wrote $outFile"
foreach ($slug in $folderMap.Keys) {
  $dir = Join-Path $roomsRoot $folderMap[$slug]
  $n = @(Get-ChildItem -LiteralPath $dir -File -ErrorAction SilentlyContinue | Where-Object { $_.Name -match $extPattern }).Count
  Write-Output ("  {0}: {1} image(s) from '{2}'" -f $slug, $n, $folderMap[$slug])
}
