<?php
/**
 * Server-side deploy diagnostic for subdomain document roots.
 * Open: https://your-subdomain/.../diag.php
 * Delete this file after debugging if you prefer.
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$root = __DIR__;
$entries = [];
$nestedHint = null;

foreach (scandir($root) as $name) {
  if ($name === '.' || $name === '..') {
    continue;
  }
  $path = $root . DIRECTORY_SEPARATOR . $name;
  $isDir = is_dir($path);
  $entries[] = [
    'name' => $name,
    'type' => $isDir ? 'dir' : 'file',
    'readable' => is_readable($path),
    'size' => $isDir ? null : @filesize($path),
  ];

  // Detect git clone nested one level deep (common with cPanel + git pull)
  if ($isDir && is_readable($path . DIRECTORY_SEPARATOR . 'index.html')) {
    $nestedHint = $name . '/index.html exists — subdomain docroot may be the parent folder, while the site lives in this subfolder';
  }
}

usort($entries, function ($a, $b) {
  return strcasecmp($a['name'], $b['name']);
});

echo json_encode([
  'ok' => true,
  'docRoot' => $root,
  'scriptFilename' => isset($_SERVER['SCRIPT_FILENAME']) ? $_SERVER['SCRIPT_FILENAME'] : null,
  'documentRootEnv' => isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] : null,
  'httpHost' => isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : null,
  'requestUri' => isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : null,
  'indexReadable' => is_readable($root . DIRECTORY_SEPARATOR . 'index.html'),
  'htaccessReadable' => is_readable($root . DIRECTORY_SEPARATOR . '.htaccess'),
  'nestedProjectHint' => $nestedHint,
  'entries' => $entries,
], JSON_PRETTY_PRINT);
