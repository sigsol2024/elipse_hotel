const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const canonicals = {
  "index.html": "https://ellipsehotelslagos.com/",
  "about.html": "https://ellipsehotelslagos.com/about",
  "rooms.html": "https://ellipsehotelslagos.com/rooms",
  "room-details.html": "https://ellipsehotelslagos.com/room-details",
  "dining.html": "https://ellipsehotelslagos.com/dining",
  "facilities.html": "https://ellipsehotelslagos.com/facilities",
  "gallery.html": "https://ellipsehotelslagos.com/gallery",
  "contact.html": "https://ellipsehotelslagos.com/contact",
  "terms.html": "https://ellipsehotelslagos.com/terms",
};

const pages = [
  "about",
  "rooms",
  "room-details",
  "dining",
  "facilities",
  "gallery",
  "contact",
  "terms",
];

function transform(content, fileName) {
  let out = content;
  out = out.replace(/href="index\.html#book"/g, 'href="/#book"');
  out = out.replace(/href="index\.html"/g, 'href="/"');
  for (const page of pages) {
    out = out.replace(new RegExp(`href="${page}\\.html#`, "g"), `href="/${page}#`);
    out = out.replace(new RegExp(`href="${page}\\.html"`, "g"), `href="/${page}"`);
    out = out.replace(new RegExp(`"${page}\\.html#`, "g"), `"/${page}#`);
    out = out.replace(new RegExp(`"${page}\\.html"`, "g"), `"/${page}"`);
  }
  out = out.replace(/href="css\//g, 'href="/css/');
  out = out.replace(/href="js\//g, 'href="/js/');
  out = out.replace(/src="js\//g, 'src="/js/');
  out = out.replace(/src="data\//g, 'src="/data/');
  out = out.replace(/src="api\//g, 'src="/api/');
  out = out.replace(/href="assets\//g, 'href="/assets/');
  out = out.replace(/src="assets\//g, 'src="/assets/');
  out = out.replace(/url\('assets\//g, "url('/assets/");
  out = out.replace(/url\("assets\//g, 'url("/assets/');
  out = out.replace(/js\/site-chrome\.js\?v=[^"]+/g, "js/site-chrome.js?v=20260829b");
  out = out.replace(/js\/rooms\.js\?v=[^"]+/g, "js/rooms.js?v=20260829a");

  const canon = canonicals[fileName];
  if (canon && !/rel="canonical"/.test(out)) {
    out = out.replace(
      /(<meta name="description"[^>]+>)/,
      `$1\n  <link rel="canonical" href="${canon}" />`
    );
  }
  return out;
}

for (const fileName of Object.keys(canonicals)) {
  const filePath = path.join(root, fileName);
  const before = fs.readFileSync(filePath, "utf8");
  const after = transform(before, fileName);
  if (after !== before) {
    fs.writeFileSync(filePath, after);
    console.log("updated", fileName);
  }
}
