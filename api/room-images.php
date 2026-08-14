<?php
/**
 * Runtime room-image discovery (Apache/PHP hosts).
 * Scans assets/images/hotel/rooms/{SUPERIOR|DELUXE|SUPERDELUXE|EXECUTIVE RM|SUITE}/
 * and emits the same window.EllipseRoomImages shape as data/room-images.js.
 */
header('Content-Type: application/javascript; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');

$folders = [
  'superior' => 'SUPERIOR',
  'deluxe' => 'DELUXE',
  'super-deluxe' => 'SUPERDELUXE',
  'executive' => 'EXECUTIVE RM',
  'suite' => 'SUITE',
];

$root = dirname(__DIR__);
$roomsRoot = $root . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'hotel' . DIRECTORY_SEPARATOR . 'rooms';
$exts = ['jpg', 'jpeg', 'png', 'webp'];

function encode_asset_path($relative) {
  $parts = explode('/', $relative);
  return implode('/', array_map('rawurlencode', $parts));
}

$bySlug = [];
foreach ($folders as $slug => $folderName) {
  $dir = $roomsRoot . DIRECTORY_SEPARATOR . $folderName;
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
    $paths[] = encode_asset_path('assets/images/hotel/rooms/' . $folderName . '/' . $name);
  }
  $bySlug[$slug] = $paths;
}

$payload = [
  'root' => 'assets/images/hotel/rooms',
  'folders' => $folders,
  'bySlug' => $bySlug,
];

echo "window.EllipseRoomImages = " . json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . ";\n";
