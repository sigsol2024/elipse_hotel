<?php
/**
 * Runtime room-image discovery (Apache/PHP hosts).
 * Scans assets/images/hotel/{Standard Room|Deluxe Room|Executive Suite}/
 * and emits the same window.EllipseRoomImages shape as data/room-images.js.
 *
 * Optional: point pages at this file instead of data/room-images.js for
 * fully automatic gallery updates without regenerating a manifest.
 */
header('Content-Type: application/javascript; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');

$folders = [
  'standard' => 'Standard Room',
  'deluxe' => 'Deluxe Room',
  'executive' => 'Executive Suite',
];

$root = dirname(__DIR__);
$hotelRoot = $root . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'hotel';
$exts = ['jpg', 'jpeg', 'png', 'webp'];

function encode_asset_path($relative) {
  $parts = explode('/', $relative);
  return implode('/', array_map('rawurlencode', $parts));
}

$bySlug = [];
foreach ($folders as $slug => $folderName) {
  $dir = $hotelRoot . DIRECTORY_SEPARATOR . $folderName;
  $files = [];
  if (is_dir($dir)) {
    foreach (scandir($dir) as $name) {
      if ($name === '.' || $name === '..') continue;
      $path = $dir . DIRECTORY_SEPARATOR . $name;
      if (!is_file($path)) continue;
      $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
      if (!in_array($ext, $exts, true)) continue;
      $files[] = $name;
    }
    natcasesort($files);
    $files = array_values($files);
  }
  $paths = [];
  foreach ($files as $name) {
    $paths[] = encode_asset_path('assets/images/hotel/' . $folderName . '/' . $name);
  }
  $bySlug[$slug] = $paths;
}

$payload = [
  'root' => 'assets/images/hotel',
  'folders' => $folders,
  'bySlug' => $bySlug,
];

echo "window.EllipseRoomImages = " . json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . ";\n";
