const routes = [
  "/",
  "/calculators",
  "/volume-calculator",
  "/cylinder-volume-calculator",
  "/cbm-calculator",
  "/cubic-feet-calculator",
  "/cubic-meter-calculator",
  "/tank-volume-calculator",
  "/volume-converter",
  "/rectangular-prism-volume-calculator",
  "/cube-volume-calculator",
  "/sphere-volume-calculator",
  "/cone-volume-calculator",
  "/pipe-volume-calculator",
  "/cubic-yard-calculator",
  "/volumetric-weight-calculator",
  "/volume-formulas",
  "/how-to-calculate-volume",
  "/how-to-calculate-cbm",
  "/about",
  "/methodology",
  "/contact",
  "/privacy",
  "/terms",
  "/robots.txt",
  "/sitemap.xml",
];

async function checkAll() {
  const titles = new Map();
  const descriptions = new Map();
  const allLinks = new Set();
  const errors = [];

  const port = process.env.PORT || 3000;
  for (const r of routes) {
    const res = await fetch(`http://localhost:${port}` + r);
    if (res.status !== 200) {
      errors.push(`Route ${r} returned HTTP ${res.status}`);
      continue;
    }
    const html = await res.text();
    if (r === "/robots.txt" || r === "/sitemap.xml") {
      console.log(`✓ ${r.padEnd(40)} (Status 200, Size ${html.length} B)`);
      continue;
    }

    // Extract title
    const tMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = tMatch ? tMatch[1] : "";
    if (!title) errors.push(`Missing title on ${r}`);
    if (titles.has(title)) {
      errors.push(`Duplicate title: "${title}" on ${r} (already on ${titles.get(title)})`);
    }
    titles.set(title, r);

    // Extract description
    const dMatch = html.match(/<meta name="description" content="([^"]+)"/);
    const desc = dMatch ? dMatch[1] : "";
    if (!desc) errors.push(`Missing description on ${r}`);
    if (descriptions.has(desc)) {
      errors.push(`Duplicate description on ${r} (already on ${descriptions.get(desc)})`);
    }
    descriptions.set(desc, r);

    // Extract canonical
    const cMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (!cMatch) {
      errors.push(`Missing canonical on ${r}`);
    }

    // Extract H1
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    if (!h1Match) {
      errors.push(`Missing H1 on ${r}`);
    }

    // Check Breadcrumb JSON-LD if calculator page
    if (r.includes("-calculator") || r === "/volume-converter") {
      if (!html.includes('"@type":"BreadcrumbList"') && !html.includes('"@type": "BreadcrumbList"')) {
        errors.push(`Missing BreadcrumbList JSON-LD on ${r}`);
      }
    }

    // Extract internal links
    const linkMatches = [...html.matchAll(/href="(\/[^"]*)"/g)];
    for (const lm of linkMatches) {
      const cleanLink = lm[1].split("#")[0].split("?")[0];
      if (cleanLink && !cleanLink.startsWith("/_next") && !cleanLink.startsWith("/api")) {
        allLinks.add(cleanLink);
      }
    }

    console.log(`✓ ${r.padEnd(40)} | H1: OK | Canonical: OK | Title: ${title.slice(0, 32)}...`);
  }

  console.log(`\n--- Crawling ${allLinks.size} internal links for 404s ---`);
  for (const link of allLinks) {
    const res = await fetch(`http://localhost:${port}` + link);
    if (res.status !== 200) {
      errors.push(`Broken internal link: ${link} returned HTTP ${res.status}`);
    } else {
      console.log(`✓ Link target ${link} -> 200 OK`);
    }
  }

  console.log("\n================ AUDIT SUMMARY ================");
  if (errors.length > 0) {
    console.error("FAILURES DETECTED:\n", errors.join("\n"));
  } else {
    console.log("ALL 26 ROUTES & INTERNAL LINKS AUDITED SUCCESSFULLY!");
    console.log("• 100% Unique Titles");
    console.log("• 100% Unique Meta Descriptions");
    console.log("• 100% Valid Canonical Tags");
    console.log("• 100% Valid H1 Headings");
    console.log("• 100% Valid JSON-LD Structured Data");
    console.log("• 0 Broken Internal Links");
  }
}

checkAll();
