const http = require("http");

const routes = [
  "/",
  "/sphere-volume-calculator",
  "/cylinder-volume-calculator",
  "/cbm-calculator",
  "/tank-volume-calculator",
  "/volume-converter"
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () =>
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        })
      );
    }).on("error", reject);
  });
}

async function verify() {
  console.log("Starting comprehensive asset verification on http://localhost:3000\n");
  const assetErrors = [];

  // 1. Verify favicons/icons directly
  for (const iconPath of ["/favicon.ico", "/icon.svg"]) {
    const res = await fetchUrl("http://localhost:3000" + iconPath);
    console.log(`Icon check: ${iconPath} -> HTTP ${res.statusCode} (${res.headers["content-type"]})`);
    if (res.statusCode !== 200) {
      assetErrors.push(`Icon ${iconPath} failed with HTTP ${res.statusCode}`);
    }
  }

  // 2. For each route, fetch HTML and extract all CSS/JS assets, then fetch each asset
  for (const route of routes) {
    console.log(`\nTesting route: ${route}`);
    const htmlRes = await fetchUrl("http://localhost:3000" + route);
    if (htmlRes.statusCode !== 200) {
      assetErrors.push(`Route ${route} failed with HTTP ${htmlRes.statusCode}`);
      continue;
    }
    console.log(`  HTML: HTTP 200 (${htmlRes.body.length} bytes)`);

    // Check for any legacy/invalid layout.css references
    if (htmlRes.body.includes("layout.css")) {
      assetErrors.push(`Route ${route} contains invalid reference to layout.css!`);
    }

    // Extract all link and script tags
    const assetUrls = new Set();
    const linkMatches = [...htmlRes.body.matchAll(/href="(\/_next\/static\/[^"]+)"/g)];
    for (const m of linkMatches) {
      assetUrls.add(m[1]);
    }
    const scriptMatches = [...htmlRes.body.matchAll(/src="(\/_next\/static\/[^"]+)"/g)];
    for (const m of scriptMatches) {
      assetUrls.add(m[1]);
    }

    // Also look for icon links
    const iconMatches = [...htmlRes.body.matchAll(/href="(\/(?:icon|favicon)[^"]*)"/g)];
    for (const m of iconMatches) {
      assetUrls.add(m[1]);
    }

    // Verify each asset
    for (const asset of assetUrls) {
      const aRes = await fetchUrl("http://localhost:3000" + asset);
      const isOk = aRes.statusCode === 200;
      console.log(`    ${isOk ? "✓" : "✗"} Asset: ${asset} -> HTTP ${aRes.statusCode} (${aRes.headers["content-type"]})`);
      if (!isOk) {
        assetErrors.push(`Asset ${asset} on route ${route} failed with HTTP ${aRes.statusCode}`);
      }
    }
  }

  // 3. Repeated hard-refresh simulation (10 iterations per route)
  console.log("\nSimulating multiple rapid hard-refreshes (10 per route)...");
  for (let i = 1; i <= 10; i++) {
    for (const route of routes) {
      const res = await fetchUrl("http://localhost:3000" + route);
      if (res.statusCode !== 200) {
        assetErrors.push(`Hard-refresh iteration ${i} for ${route} returned HTTP ${res.statusCode}`);
      }
    }
  }
  console.log("All 10 hard-refresh iterations complete for all routes!");

  console.log("\n================ VERIFICATION SUMMARY ================");
  if (assetErrors.length === 0) {
    console.log("ALL ROUTES AND ASSETS VERIFIED WITH 100% HTTP 200 OK!");
    console.log("• Zero 404 errors on CSS, JS chunks, and favicons");
    console.log("• Zero 500 errors on icon.svg");
    console.log("• Zero references to layout.css");
    console.log("• Clean production stability across hard refreshes");
  } else {
    console.error("FAILURES DETECTED:\n", assetErrors.join("\n"));
    process.exit(1);
  }
}

verify().catch((err) => {
  console.error("Verification failed with exception:", err);
  process.exit(1);
});
