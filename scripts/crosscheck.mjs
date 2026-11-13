// scripts/crosscheck.mjs
// WebForge v9.1 - Pre-ship Crosscheck (exits non-zero on failure)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const appDir = path.resolve(rootDir, 'app');

function walkTsx(dir, exts = ['.tsx']) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkTsx(full, exts));
    else if (exts.some((ext) => entry.name.endsWith(ext))) out.push(full);
  }
  return out;
}

console.log('🔍 Starting WebForge v9.1 Pre-ship Crosscheck...');

let failures = [];
let warnings = [];

// 1. Load config
const siteConfigPath = path.resolve(rootDir, 'src/config/site.js');
if (!fs.existsSync(siteConfigPath)) {
  failures.push('B1: Missing src/config/site.js');
}

const { SITE, COMPLIANCE, PRODUCTS, CATEGORIES, POSTS, CATEGORY_GUIDES, BRAND_GUIDES, CATEGORY_FAQ, BRAND_FAQ } = await import(`file://${siteConfigPath}`);

// 2. Check Agent-Ready Files A-N (Mandatory on all sites)
const requiredAgentFiles = [
  'public/robots.txt',
  'public/llms.txt',
  'public/auth.md',
  // Extensionless spec URLs are served from these .json files via a vercel.json
  // rewrite (Vercel serves extensionless static files as octet-stream, which
  // isitagentready rejects for the OAuth metadata).
  'public/.well-known/api-catalog.json',
  'public/.well-known/agent-skills/index.json',
  'public/.well-known/mcp/server-card.json',
  'public/.well-known/oauth-protected-resource.json',
  'public/.well-known/oauth-authorization-server.json',
  'public/.well-known/openid-configuration.json',
  'public/.well-known/acp.json',
  'public/.well-known/ai-catalog.json',
  'public/.well-known/ucp.json',
  'public/js/webmcp.js',
  'vercel.json'
];

for (const file of requiredAgentFiles) {
  const fullPath = path.resolve(rootDir, file);
  if (!fs.existsSync(fullPath)) {
    failures.push(`B6: Missing mandatory agent-ready file: ${file}`);
  }
}

// 3. Check auth.md format: MUST start with exactly "# Auth.md"
const authMdPath = path.resolve(rootDir, 'public/auth.md');
if (fs.existsSync(authMdPath)) {
  const content = fs.readFileSync(authMdPath, 'utf8');
  if (!content.startsWith('# Auth.md')) {
    failures.push('B6 / N: public/auth.md must start with exactly "# Auth.md" as the first line');
  }
}

// 4. Check .well-known/ucp has mandatory "ucp": "1.0"
const ucpPath = path.resolve(rootDir, 'public/.well-known/ucp.json');
if (fs.existsSync(ucpPath)) {
  try {
    const ucp = JSON.parse(fs.readFileSync(ucpPath, 'utf8'));
    if (ucp.ucp !== '1.0') {
      failures.push('B6 / N: .well-known/ucp must contain "ucp": "1.0" field');
    }
  } catch (e) {
    failures.push(`B6: .well-known/ucp is invalid JSON: ${e.message}`);
  }
}

// 5. Check server-card.json tools match V1 live API
const serverCardPath = path.resolve(rootDir, 'public/.well-known/mcp/server-card.json');
if (fs.existsSync(serverCardPath)) {
  try {
    const card = JSON.parse(fs.readFileSync(serverCardPath, 'utf8'));
    const toolNames = (card.capabilities?.tools || []).map(t => t.name);
    const expected = ['search_products', 'get_product', 'list_categories', 'get_policies', 'create_order_draft'];
    for (const exp of expected) {
      if (!toolNames.includes(exp)) {
        failures.push(`B8: server-card.json missing required MCP tool: ${exp}`);
      }
    }
  } catch (e) {
    failures.push(`B8: server-card.json is invalid JSON: ${e.message}`);
  }
}

// 6. Check compliance banned terms across public output
if (COMPLIANCE?.bannedTerms && COMPLIANCE.bannedTerms.length > 0) {
  for (const term of COMPLIANCE.bannedTerms) {
    // Scan public files
    const scanDir = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(full);
        } else if (entry.isFile() && !entry.name.endsWith('.png') && !entry.name.endsWith('.jpg') && !entry.name.endsWith('.webp')) {
          const txt = fs.readFileSync(full, 'utf8');
          if (txt.toLowerCase().includes(term.toLowerCase())) {
            failures.push(`B7: Compliance violation! Banned term "${term}" found in ${full}`);
          }
        }
      }
    };
    scanDir(path.resolve(rootDir, 'public'));
  }
}

// 7. Check strategy docs are not in public/
if (fs.existsSync(path.resolve(rootDir, 'public/PROJECT.md')) || fs.existsSync(path.resolve(rootDir, 'public/docs'))) {
  failures.push('B4: Strategy docs found in public/ directory!');
}

// 8. Check vercel.json has Link header and trailingSlash
const vercelPath = path.resolve(rootDir, 'vercel.json');
if (fs.existsSync(vercelPath)) {
  const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  if (vercel.trailingSlash !== true) {
    failures.push('vercel.json must have "trailingSlash": true');
  }
}

// 9. Check products have images and valid prices
if (!PRODUCTS || PRODUCTS.length === 0) {
  failures.push('No products found in src/config/site.js');
} else {
  PRODUCTS.forEach(p => {
    if (!p.name || !p.price || !p.category || !p.slug) {
      failures.push(`Product missing required fields: ${JSON.stringify(p.name || p.slug)}`);
    }
    if (!p.images || p.images.length === 0) {
      failures.push(`Product has no images: ${p.name}`);
    } else {
      const first = p.images[0];
      // 9a. Regression guard: every product now has a real local photo — catch a
      // reintroduced remote placeholder (e.g. Unsplash) immediately, not at audit time.
      if (/^https?:\/\//.test(first)) {
        failures.push(`Product still on a remote placeholder image (no local photo): ${p.name}`);
      } else {
        // 9b. The referenced local file must actually exist in public/.
        const filePath = path.resolve(rootDir, 'public', first.replace(/^\//, ''));
        if (!fs.existsSync(filePath)) {
          failures.push(`Product image file missing on disk: ${p.name} -> ${first}`);
        }
      }
    }
  });
}

// 9c. Same rule for CATEGORY and POST images — after the Sept 2026 sweep every
// one points at a local file. Catch a reintroduced remote/Unsplash URL or a
// dead local path before it ships as a visible placeholder.
const imgSpot = (label, list) => {
  for (const item of list || []) {
    const img = item.image;
    if (!img) continue;
    if (/^https?:\/\//.test(img)) {
      failures.push(`${label} on a remote/placeholder image: ${item.slug || item.name} -> ${img}`);
    } else if (!fs.existsSync(path.resolve(rootDir, 'public', img.replace(/^\//, '')))) {
      failures.push(`${label} image file missing on disk: ${item.slug || item.name} -> ${img}`);
    }
  }
};
imgSpot('Category', CATEGORIES);
imgSpot('Post', POSTS);

// 9d. No hardcoded remote image URLs left in the app/component source (OG
// fallbacks, <SmartImage> defaults etc.) — these are latent placeholders.
// Also scans src/config/*.js, since that's exactly where a real placeholder
// slipped through undetected before (category images hotlinked to Unsplash,
// duplicated across unrelated categories) — the app/components-only scan
// missed it entirely.
const compDir = path.resolve(rootDir, 'components');
const srcConfigDir = path.resolve(rootDir, 'src/config');
const imageUrlScanFiles = [
  ...walkTsx(appDir),
  ...(fs.existsSync(compDir) ? walkTsx(compDir) : []),
  ...(fs.existsSync(srcConfigDir) ? walkTsx(srcConfigDir, ['.js']) : []),
];
for (const file of imageUrlScanFiles) {
  const s = fs.readFileSync(file, 'utf8');
  if (/(images\.unsplash\.com|picsum\.photos)/.test(s)) {
    failures.push(`9d: hardcoded remote image URL in ${path.relative(rootDir, file)}`);
  }
}

// 10. <title> length — mirrors lib/seo.ts buildSeoTitle(); keep in sync if that changes.
function buildSeoTitleCheck(name) {
  const full = `${name} | Australian Electric Motor Co`;
  if (full.length <= 60) return full;
  const short = `${name} | AEMC`;
  if (short.length <= 60) return short;
  return name;
}
const TITLE_WARN_MAX = 65; // hard target is 60; a couple of long product names land just over
for (const p of PRODUCTS) {
  const t = buildSeoTitleCheck(p.name);
  if (t.length > TITLE_WARN_MAX) {
    warnings.push(`Product <title> still long (${t.length} chars): ${p.name}`);
  }
}
for (const c of CATEGORIES) {
  const t = buildSeoTitleCheck(c.name);
  if (t.length > TITLE_WARN_MAX) {
    warnings.push(`Category <title> still long (${t.length} chars): ${c.name}`);
  }
}

// 10b. Hardcoded <title>/OG-title string literals in app/**/*.tsx and
// app/layout.tsx — the static route pages (/faq/, /blog/, /shop/, /about/,
// per-route layout.tsx...) don't go through buildSeoTitle, so scan their
// source for over-length `title:` literals. Fails the build (these are
// hand-authored and easy to keep in bounds).
const HARDCODED_TITLE_MAX = 60;
for (const file of [path.resolve(rootDir, 'app/layout.tsx'), ...walkTsx(appDir)]) {
  let src;
  try { src = fs.readFileSync(file, 'utf8'); } catch { continue; }
  // match `title: '...'` / `title: "..."` on one line (skips template literals /
  // computed titles, which are handled by lib/seo.ts and checked above)
  const re = /\btitle:\s*(['"])(.*?)\1/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const title = m[2];
    if (title && !title.includes('${') && title.length > HARDCODED_TITLE_MAX) {
      failures.push(`10b: hardcoded <title> is ${title.length} chars (>${HARDCODED_TITLE_MAX}) in ${path.relative(rootDir, file)}: "${title}"`);
    }
  }
}

// 11. Live placeholders that block GSC / keyword-mapping work — warn every run until set.
if (SITE.gscVerification === 'pending') {
  warnings.push('SITE.gscVerification is still "pending" — Search Console cannot verify this site yet.');
}
// Contact + wholesale forms send through Zoho SMTP (lib/mailer.ts) — this
// warning only fires locally (no .env.local) or if the vars genuinely
// aren't set in the Vercel project yet.
if (!process.env.ZOHO_SMTP_USER || !process.env.ZOHO_SMTP_PASSWORD) {
  warnings.push('ZOHO_SMTP_USER / ZOHO_SMTP_PASSWORD are not set — contact/wholesale form emails will not send; WhatsApp remains the only guaranteed-live channel. (Set them in Vercel env vars; locally this warning is expected.)');
}
if (!process.env.ADMIN_PASSCODE) {
  warnings.push('ADMIN_PASSCODE is not set — /admin/send-payment-email/ will reject every send with 503. (Set it in Vercel env vars; locally this warning is expected.)');
}
// lib/orderStore.ts checks several possible names since Vercel's "Connect a
// Project" flow lets you pick any prefix for the auto-created env vars.
const hasOrderStoreCreds = [
  ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
  ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
  ['STORAGE_REST_API_URL', 'STORAGE_REST_API_TOKEN'],
  ['STORAGE_KV_REST_API_URL', 'STORAGE_KV_REST_API_TOKEN'],
].some(([u, t]) => process.env[u] && process.env[t]);
if (!hasOrderStoreCreds) {
  warnings.push('No recognised Redis credential pair is set (checked UPSTASH_REDIS_REST_*, KV_REST_API_*, STORAGE_REST_API_*, STORAGE_KV_REST_API_*) — the /admin/orders/ dashboard will be empty and checkout orders will not be recorded (email/WhatsApp still work). (Create a Redis database in Vercel → Storage; locally this warning is expected.)');
}
if (SITE.domain && SITE.domain.includes('DOMAIN.')) {
  failures.push('B1: SITE.domain is still a placeholder in a production build.');
}

// 12. Internal-linking maps point only at real pages (Batch 7).
const postSlugs = new Set((POSTS || []).map(p => p.slug));
const catSlugs = new Set((CATEGORIES || []).map(c => c.slug));
for (const [catSlug, guideSlugs] of Object.entries(CATEGORY_GUIDES || {})) {
  if (!catSlugs.has(catSlug)) failures.push(`12: CATEGORY_GUIDES key "${catSlug}" is not a real category slug.`);
  for (const g of guideSlugs) {
    if (!postSlugs.has(g)) failures.push(`12: CATEGORY_GUIDES["${catSlug}"] -> "${g}" is not a real blog post slug.`);
  }
}
for (const [brandSlug, guideSlugs] of Object.entries(BRAND_GUIDES || {})) {
  for (const g of guideSlugs) {
    if (!postSlugs.has(g)) failures.push(`12: BRAND_GUIDES["${brandSlug}"] -> "${g}" is not a real blog post slug.`);
  }
}
for (const catSlug of Object.keys(CATEGORY_FAQ || {})) {
  if (!catSlugs.has(catSlug)) failures.push(`12: CATEGORY_FAQ key "${catSlug}" is not a real category slug.`);
}

// Result summary
console.log('\n--- CROSSCHECK REPORT ---');
if (warnings.length > 0) {
  console.log(`⚠️ Warnings (${warnings.length}):`);
  warnings.forEach(w => console.log(`   - ${w}`));
}

if (failures.length > 0) {
  console.error(`❌ FAILED (${failures.length} blocking issues):`);
  failures.forEach(f => console.error(`   - ${f}`));
  process.exit(1);
} else {
  console.log('✅ ALL PRE-SHIP CROSSCHECK AUDITS PASSED (0 errors). Ready for Vercel deploy!\n');
  process.exit(0);
}
