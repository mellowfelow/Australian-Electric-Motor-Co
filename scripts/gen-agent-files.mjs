// scripts/gen-agent-files.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Dynamically import site configuration
const siteConfigPath = path.resolve(rootDir, 'src/config/site.js');
const { SITE, CONTACT, SHOP, BRAND, CATEGORIES, PRODUCTS, POSTS } = await import(`file://${siteConfigPath}`);

const domain = SITE.domain || 'DOMAIN.com';
const baseUrl = `https://${domain}`;

// Ensure directories exist
const publicDir = path.resolve(rootDir, 'public');
const wellKnownDir = path.resolve(publicDir, '.well-known');
const mcpDir = path.resolve(wellKnownDir, 'mcp');
const agentSkillsDir = path.resolve(wellKnownDir, 'agent-skills');
const jsDir = path.resolve(publicDir, 'js');

[publicDir, wellKnownDir, mcpDir, agentSkillsDir, jsDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 1. Generate vercel.json
const vercelConfig = {
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "trailingSlash": true,
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": `www.${domain}` }],
      "destination": `https://${domain}/:path*`,
      "permanent": true
    }
  ],
  // The spec URLs for these are extensionless, but Vercel serves extensionless
  // static files as application/octet-stream regardless of the headers config
  // (isitagentready rejects the OAuth metadata for exactly this). Store them
  // with a .json extension (correct content-type) and rewrite the canonical
  // extensionless path to the real file.
  "rewrites": [
    { "source": "/.well-known/api-catalog", "destination": "/.well-known/api-catalog.json" },
    { "source": "/.well-known/oauth-protected-resource", "destination": "/.well-known/oauth-protected-resource.json" },
    { "source": "/.well-known/oauth-authorization-server", "destination": "/.well-known/oauth-authorization-server.json" },
    { "source": "/.well-known/openid-configuration", "destination": "/.well-known/openid-configuration.json" },
    { "source": "/.well-known/ucp", "destination": "/.well-known/ucp.json" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; connect-src 'self' https:; font-src 'self' data: https:;" },
        { "key": "Link", "value": `</.well-known/api-catalog>; rel="api-catalog", </.well-known/agent-skills/index.json>; rel="describedby", </llms.txt>; rel="describedby", </.well-known/mcp/server-card.json>; rel="service-desc", </auth.md>; rel="auth", </.well-known/openid-configuration>; rel="openid-configuration"` }
      ]
    },
    { "source": "/.well-known/api-catalog", "headers": [{ "key": "Content-Type", "value": "application/linkset+json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/agent-skills/index.json", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/mcp/server-card.json", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/oauth-protected-resource", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/oauth-authorization-server", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/openid-configuration", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/acp.json", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/ai-catalog.json", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/ucp", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/auth.md", "headers": [{ "key": "Content-Type", "value": "text/markdown; charset=utf-8" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/llms.txt", "headers": [{ "key": "Content-Type", "value": "text/plain; charset=utf-8" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/:path*.md", "headers": [{ "key": "Content-Type", "value": "text/markdown; charset=utf-8" }] },
    // Static assets ship straight from public/ and Vercel defaults them to
    // max-age=0, must-revalidate — every image re-fetched on every visit.
    // Give them a real cache lifetime (30 days + SWR) so "browser caching" /
    // "image expires headers" / "efficient cache policy" all pass. Filenames
    // aren't content-hashed, so keep it revalidating rather than immutable.
    { "source": "/images/:path*", "headers": [{ "key": "Cache-Control", "value": "public, max-age=2592000, stale-while-revalidate=86400" }] },
    { "source": "/(.*)\\.(ico|svg|png|jpg|jpeg|gif|webp|avif|woff|woff2|ttf|otf)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=2592000, stale-while-revalidate=86400" }] },
    { "source": "/api/:path*", "headers": [{ "key": "Access-Control-Allow-Origin", "value": "*" }, { "key": "Access-Control-Allow-Methods", "value": "GET, POST, OPTIONS" }, { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Accept, Mcp-Session-Id" }] }
  ]
};
fs.writeFileSync(path.resolve(rootDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2) + '\n');

// 2. Generate public/robots.txt
const robotsTxt = `User-agent: *
Disallow: /thank-you-contact/
Disallow: /thank-you-order/
Disallow: /thank-you-wholesale/
Disallow: /admin/
Sitemap: ${baseUrl}/sitemap.xml

Content-Signal: search=yes, ai-input=yes, ai-train=yes

# AI crawlers — welcome to index product and content pages
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: MistralAI-User
Allow: /

User-agent: MistralAI-Index
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Meta-WebIndexer
Allow: /

User-agent: cohere-ai
Allow: /

# Agent-readable resources
# llms.txt: ${baseUrl}/llms.txt
# API Catalog: ${baseUrl}/.well-known/api-catalog
# Agent Skills: ${baseUrl}/.well-known/agent-skills/index.json
# MCP Server Card: ${baseUrl}/.well-known/mcp/server-card.json
Agentmap: ${baseUrl}/.well-known/ai-catalog.json
`;
fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robotsTxt);

// 3. Generate public/llms.txt
const categoryList = CATEGORIES.map(c => `- [${c.name}](${baseUrl}/shop/${c.slug}/): ${c.description}`).join('\n');
const productList = PRODUCTS.map(p => `- [${p.name}](${baseUrl}/shop/${p.category}/${p.slug}/): $${p.price} ${SITE.currency} — ${p.shortDescription}`).join('\n');
// Priority map: the guides/answers most likely to be surfaced by an AI
// answer engine, newest first (they lead with a direct definition-hook
// answer to their primary keyword). Driven by POSTS so it can never drift.
const guideList = (POSTS || [])
  .slice()
  .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  .map(p => `- [${p.title}](${baseUrl}/blog/${p.slug}/): ${p.excerpt}`)
  .join('\n');

const llmsTxt = `# ${SITE.name}

> ${SITE.tagline}

${BRAND.description}

## Business & Contact
- Location: ${BRAND.foundingLocation}
- Country of Operation: ${CONTACT.country}
- Currency: ${SITE.currency}
- WhatsApp: ${CONTACT.whatsapp}
- Email: ${CONTACT.email}
- Minimum Order: $${SHOP.minOrder} ${SITE.currency}
- Free Shipping Threshold: $${SHOP.freeShippingThreshold} ${SITE.currency}
- Payment Methods: ${SHOP.paymentMethods.join(', ')}
- Crypto Settlement Discount: ${SHOP.cryptoDiscount}% off total order (BTC / USDT)
- Consumer Financing: Pay in 4 (4 equal fortnightly payments, 0% interest)

## Product Categories
${categoryList}

## Featured Electric Dirt Bikes & Parts
${productList}

## Guides & Answers
${guideList}

## Key Resources
- [Full Product Catalog](${baseUrl}/shop/): Complete inventory with technical specifications, power outputs, and battery sizes
- [Commercial & Wholesale Fleets](${baseUrl}/wholesale/): Ag, pastoral station, and dealership bulk order terms
- [Trail Tech Journal](${baseUrl}/blog/): Technical guides, battery charging tips, and outback trail testing
- [Frequently Asked Questions](${baseUrl}/faq/): Warranty, battery range, charging, and national crate shipping
- [Product Comparison Matrix](${baseUrl}/compare/): Side-by-side electric dirt bike specification comparison
- [Pay in 4 & Finance Calculator](${baseUrl}/finance/): Pay in 4 schedule and commercial station asset loan breakdown
- [Contact & Workshop Support](${baseUrl}/contact/): Direct inquiry form and NSW workshop location

## Optional
- [API Catalog](${baseUrl}/.well-known/api-catalog): Machine-readable endpoint directory (RFC 9727)
- [Agent Skills](${baseUrl}/.well-known/agent-skills/index.json): Automated discovery of commerce and search capabilities
- [MCP Server Card](${baseUrl}/.well-known/mcp/server-card.json): Model Context Protocol Streamable HTTP configuration
- [Authentication Specification](${baseUrl}/auth.md): Agent authorization and public access protocols
`;
fs.writeFileSync(path.resolve(publicDir, 'llms.txt'), llmsTxt);

// 4. Generate public/auth.md — follows the workos/auth.md discovery→use recipe
// (isitagentready parses the "Step 1 — Discover" links to the OAuth metadata).
// CRITICAL: MUST start with exactly # Auth.md
const authMd = `# Auth.md

Agent authentication recipe for **${SITE.name}** (${baseUrl}).

This service is **anonymous**: every resource is public, so there is no
registration, claim ceremony or token exchange. Discovery is still published so
agents can confirm that programmatically.

## Step 1 — Discover

### 1a. Protected Resource Metadata
Fetch: [\`${baseUrl}/.well-known/oauth-protected-resource\`](${baseUrl}/.well-known/oauth-protected-resource)

\`Content-Type: application/json\`. Fields: \`resource\`, \`resource_name\`,
\`authorization_servers\` (empty — no auth server), \`scopes_supported\` (empty),
\`bearer_methods_supported\` (empty), \`resource_documentation\` (this file).

### 1b. Authorization Server Metadata
Fetch: [\`${baseUrl}/.well-known/oauth-authorization-server\`](${baseUrl}/.well-known/oauth-authorization-server)

\`issuer\` is set; \`authorization_endpoint\`, \`token_endpoint\` and \`jwks_uri\`
are \`null\`. The profile-specific \`agent_auth\` block declares
\`register_uri: null\`, \`identity_types_supported: ["none"]\` and
\`credential_types_supported: ["none"]\`.

## Step 2 — Pick a method
The decision tree resolves to **anonymous**. Skip steps 3–5. No
\`identity_assertion\`, \`service_auth\` or registration is offered or required.

## Step 3 — Use resources
Call any public endpoint directly, no \`Authorization\` header:

| Resource | URL |
|---|---|
| Product catalogue (JSON) | ${baseUrl}/api/products/ |
| Category list (JSON) | ${baseUrl}/api/categories/ |
| Search (JSON) | ${baseUrl}/api/search/ |
| MCP server | ${baseUrl}/api/mcp/ |
| Full shop (HTML) | ${baseUrl}/shop/ |
| Wholesale | ${baseUrl}/wholesale/ |
| Guides | ${baseUrl}/blog/ |
| FAQ | ${baseUrl}/faq/ |

## Ordering
Human-in-the-loop required. Agents may browse and prepare order drafts via the
MCP server; a human completes checkout via WhatsApp or the order form.

## Errors
Standard HTTP status codes. \`429\` — back off and retry. No OAuth error codes
apply (no token layer).

## Revocation
Not applicable — no credentials are ever issued.
`;
fs.writeFileSync(path.resolve(publicDir, 'auth.md'), authMd);

// 5. Generate .well-known/api-catalog (RFC 9727)
const apiCatalog = {
  "linkset": [
    { "anchor": `${baseUrl}/`, "https://www.iana.org/assignments/link-relations/service-doc": [{ "href": `${baseUrl}/faq/` }], "title": `${SITE.name} — ${SITE.tagline}` },
    { "anchor": `${baseUrl}/shop/`, "type": "text/html", "title": `${SITE.name} Product Catalog` },
    { "anchor": `${baseUrl}/wholesale/`, "type": "text/html", "title": `${SITE.name} Wholesale` },
    { "anchor": `${baseUrl}/compare/`, "type": "text/html", "title": `${SITE.name} Product Comparison Tool` },
    { "anchor": `${baseUrl}/finance/`, "type": "text/html", "title": `${SITE.name} Finance Calculator` },
    { "anchor": `${baseUrl}/api/products/`, "type": "application/json", "title": `${SITE.name} Products API` },
    { "anchor": `${baseUrl}/api/categories/`, "type": "application/json", "title": `${SITE.name} Categories API` },
    { "anchor": `${baseUrl}/api/search/`, "type": "application/json", "title": `${SITE.name} Search API` },
    { "anchor": `${baseUrl}/api/mcp/`, "type": "application/json", "https://www.iana.org/assignments/link-relations/service-desc": [{ "href": `${baseUrl}/.well-known/mcp/server-card.json` }], "title": `${SITE.name} MCP Server` }
  ]
};
fs.writeFileSync(path.resolve(wellKnownDir, 'api-catalog.json'), JSON.stringify(apiCatalog, null, 2) + '\n');

// 5b. Generate .well-known/ai-catalog.json — ARD (Agentic Resource Discovery)
// capability manifest. https://agenticresourcediscovery.org / ards-project/ard-spec
const urn = (ns, name) => `urn:air:${SITE.domain}:${ns}:${name}`;
const aiCatalog = {
  specVersion: '0.1',
  host: {
    name: SITE.name,
    url: baseUrl,
    description: SITE.tagline,
  },
  entries: [
    {
      identifier: urn('commerce', 'product-catalog'),
      displayName: `${SITE.name} product catalog`,
      description: 'Full catalogue of electric dirt bikes, batteries, chargers, upgrades and riding gear with live AUD pricing and specs.',
      type: 'application/json',
      url: `${baseUrl}/api/products/`,
      representativeQueries: [
        'electric dirt bike for adults australia',
        'kids electric balance bike price',
        '72v battery for surron',
        'road legal electric dirt bike',
        'motocross helmet australia',
      ],
    },
    {
      identifier: urn('commerce', 'mcp-server'),
      displayName: `${SITE.name} MCP server`,
      description: 'Model Context Protocol endpoint: product search, catalogue browse, spec comparison and order-draft creation (human completes checkout).',
      type: 'application/json',
      url: `${baseUrl}/.well-known/mcp/server-card.json`,
      representativeQueries: [
        'search electric dirt bikes by price',
        'compare surron vs talaria specs',
        'draft an order for a Stark VARG',
      ],
    },
    {
      identifier: urn('content', 'buying-guides'),
      displayName: `${SITE.name} buying & tech guides`,
      description: 'Guides on electric dirt bike cost in Australia, battery and charging, road-legal rules, and gear selection.',
      type: 'text/html',
      url: `${baseUrl}/blog/`,
      representativeQueries: [
        'how much does an electric dirt bike cost in australia',
        'how long to charge an electric dirt bike',
        'are electric dirt bikes street legal in australia',
        'enduro vs motocross electric bike',
      ],
    },
    {
      identifier: urn('content', 'llms-txt'),
      displayName: `${SITE.name} llms.txt`,
      description: 'Plain-text site summary for language models: business facts, categories, products and key resources.',
      type: 'text/plain',
      url: `${baseUrl}/llms.txt`,
      representativeQueries: [
        'what does australian electric motor co sell',
        'australian electric motor co contact and payment options',
      ],
    },
    {
      identifier: urn('support', 'faq'),
      displayName: `${SITE.name} FAQ`,
      description: 'Answers on pricing, road-legal rules, kids and balance bikes, charging, warranty and payment.',
      type: 'text/html',
      url: `${baseUrl}/faq/`,
      representativeQueries: [
        'do electric dirt bikes need registration',
        'what payment options does australian electric motor co accept',
      ],
    },
  ],
};
fs.writeFileSync(path.resolve(wellKnownDir, 'ai-catalog.json'), JSON.stringify(aiCatalog, null, 2) + '\n');

// 6. Generate .well-known/agent-skills/index.json
const agentSkills = {
  "$schema": "https://agentskills.io/schema/v0.2.0/index.json",
  "name": SITE.name,
  "url": baseUrl,
  "description": SITE.tagline,
  "skills": [
    { "name": "search-products", "type": "commerce", "description": "Search electric dirt bikes and upgrades by keyword, category, or price", "url": `${baseUrl}/api/mcp/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "browse-catalog", "type": "navigation", "description": "Browse the full electric dirt bike and components catalog by category", "url": `${baseUrl}/shop/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "order-draft", "type": "commerce", "description": "Create a prefilled Australian order draft. Human completes the order via WhatsApp or Form.", "url": `${baseUrl}/api/mcp/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "wholesale-inquiry", "type": "commerce", "description": "Wholesale pricing tiers, pastoral station fleets, and bulk dealer ordering", "url": `${baseUrl}/wholesale/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "compare-products", "type": "commerce", "description": "Compare technical specifications across electric dirt bikes, power outputs, and battery capacities", "url": `${baseUrl}/compare/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "product-education", "type": "content", "description": "Educational outback guides, battery charging tips, and electrical engineering advice", "url": `${baseUrl}/blog/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "contact", "type": "support", "description": "Contact our NSW moto technicians for custom fitment or order inquiries", "url": `${baseUrl}/contact/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" }
  ]
};
fs.writeFileSync(path.resolve(agentSkillsDir, 'index.json'), JSON.stringify(agentSkills, null, 2) + '\n');

// 7. Generate .well-known/mcp/server-card.json (Vercel variant - live MCP endpoint)
const mcpServerCard = {
  "$schema": "https://modelcontextprotocol.io/schemas/server-card/v1.json",
  "serverInfo": {
    "name": SITE.name,
    "version": "1.0.0",
    "description": BRAND.description,
    "homepage": baseUrl,
    "contact": {
      "email": CONTACT.email,
      "whatsapp": CONTACT.whatsapp
    }
  },
  "transport": {
    "type": "streamable-http",
    "endpoint": `${baseUrl}/api/mcp/`
  },
  "capabilities": {
    "tools": [
      {
        "name": "search_products",
        "description": "Search products by keyword, category, max_price",
        "inputSchema": {
          "type": "object",
          "properties": {
            "query": { "type": "string" },
            "category": { "type": "string" },
            "max_price": { "type": "number" }
          }
        }
      },
      {
        "name": "get_product",
        "description": "Get full product details by slug",
        "inputSchema": {
          "type": "object",
          "required": ["slug"],
          "properties": {
            "slug": { "type": "string" }
          }
        }
      },
      {
        "name": "list_categories",
        "description": "List all product categories",
        "inputSchema": {
          "type": "object",
          "properties": {}
        }
      },
      {
        "name": "get_policies",
        "description": "Get shipping, payment, returns policies",
        "inputSchema": {
          "type": "object",
          "properties": {}
        }
      },
      {
        "name": "create_order_draft",
        "description": "Create prefilled order URL. Human completes — never captures payment.",
        "inputSchema": {
          "type": "object",
          "properties": {
            "items": { "type": "array" },
            "notes": { "type": "string" }
          }
        }
      }
    ],
    "resources": [
      { "name": "product-catalog", "description": "Full product catalog", "uri": `${baseUrl}/shop/` },
      { "name": "wholesale", "description": "Wholesale pricing and commercial fleets", "uri": `${baseUrl}/wholesale/` },
      { "name": "compare", "description": "Product comparison matrix", "uri": `${baseUrl}/compare/` },
      { "name": "blog", "description": "Educational outback content", "uri": `${baseUrl}/blog/` }
    ],
    "commerce": {
      "ordering": "human-assisted-whatsapp-or-form",
      "payment": SHOP.paymentMethods,
      "currency": SITE.currency,
      "minimumOrder": String(SHOP.minOrder),
      "freeShipping": String(SHOP.freeShippingThreshold)
    }
  },
  "legal": {
    "ageRestriction": "none",
    "productType": "electric-dirt-bikes",
    "compliance": "Australian Design Rules and Off-Road Competition Standards"
  }
};
fs.writeFileSync(path.resolve(mcpDir, 'server-card.json'), JSON.stringify(mcpServerCard, null, 2) + '\n');

// 8. Generate .well-known/oauth-protected-resource
const oauthProtectedResource = {
  "resource": baseUrl,
  "resource_name": `${SITE.name} Public Catalog`,
  "authorization_servers": [],
  "scopes_supported": [],
  "bearer_methods_supported": [],
  "resource_documentation": `${baseUrl}/auth.md`,
  "resource_policy_uri": `${baseUrl}/about/`,
  "tls_client_certificate_bound_access_tokens": false,
  "note": `All resources on ${domain} are publicly accessible. No OAuth tokens required.`
};
fs.writeFileSync(path.resolve(wellKnownDir, 'oauth-protected-resource.json'), JSON.stringify(oauthProtectedResource, null, 2) + '\n');

// 9. Generate .well-known/oauth-authorization-server
const oauthAuthServer = {
  "issuer": baseUrl,
  "authorization_endpoint": null,
  "token_endpoint": null,
  "jwks_uri": null,
  "grant_types_supported": [],
  "response_types_supported": [],
  "scopes_supported": [],
  "note": `${SITE.name} has no protected APIs. All resources publicly accessible.`,
  "public_resources": [
    `${baseUrl}/shop/`,
    `${baseUrl}/wholesale/`,
    `${baseUrl}/blog/`,
    `${baseUrl}/faq/`,
    `${baseUrl}/compare/`,
    `${baseUrl}/finance/`,
    `${baseUrl}/llms.txt`,
    `${baseUrl}/.well-known/api-catalog`,
    `${baseUrl}/.well-known/agent-skills/index.json`,
    `${baseUrl}/.well-known/mcp/server-card.json`
  ],
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No registration required. All content publicly accessible to agents."
  }
};
fs.writeFileSync(path.resolve(wellKnownDir, 'oauth-authorization-server.json'), JSON.stringify(oauthAuthServer, null, 2) + '\n');

// 10. Generate .well-known/openid-configuration
const openidConfig = {
  "issuer": baseUrl,
  "note": `${SITE.name} does not operate an OpenID Connect provider. All resources publicly accessible.`,
  "public_site": true,
  "authorization_endpoint": null,
  "token_endpoint": null,
  "userinfo_endpoint": null,
  "jwks_uri": null,
  "scopes_supported": [],
  "response_types_supported": [],
  "grant_types_supported": [],
  "subject_types_supported": [],
  "id_token_signing_alg_values_supported": []
};
fs.writeFileSync(path.resolve(wellKnownDir, 'openid-configuration.json'), JSON.stringify(openidConfig, null, 2) + '\n');

// 11. Generate .well-known/acp.json
const acpJson = {
  "protocol": { "name": "acp", "version": "0.1.0" },
  "name": SITE.name,
  "description": BRAND.description,
  "api_base_url": baseUrl,
  "homepage": baseUrl,
  "transports": ["https"],
  "capabilities": {
    "services": ["product-catalog", "wholesale", "compare", "finance", "blog", "faq", "mcp-server"],
    "ordering": "human-assisted",
    "payment_methods": SHOP.paymentMethods,
    "currency": SITE.currency,
    "minimum_order_usd": String(SHOP.minOrder),
    "free_shipping_threshold_usd": String(SHOP.freeShippingThreshold)
  },
  "contact": {
    "whatsapp": `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`,
    "email": CONTACT.email
  },
  "legal": {
    "age_restriction": "none",
    "region": "Australia",
    "ships_to": "Australia & Worldwide",
    "product_type": "electric-dirt-bikes",
    "compliance": "Australian Design Rules (ADR)"
  }
};
fs.writeFileSync(path.resolve(wellKnownDir, 'acp.json'), JSON.stringify(acpJson, null, 2) + '\n');

// 12. Generate .well-known/ucp (CRITICAL: "ucp": "1.0" field mandatory)
const ucpJson = {
  "ucp": "1.0",
  "protocol_version": "1.0",
  "spec": "https://ucp.dev/specification/overview/",
  "schema": "https://ucp.dev/schema/v1.json",
  "site": baseUrl,
  "name": SITE.name,
  "description": BRAND.description,
  "services": [
    { "id": "product-catalog", "type": "catalog", "url": `${baseUrl}/shop/`, "description": "Full electric dirt bike and components catalog" },
    { "id": "wholesale", "type": "b2b", "url": `${baseUrl}/wholesale/`, "description": "Wholesale pricing and commercial fleet ordering" },
    { "id": "mcp-server", "type": "mcp", "url": `${baseUrl}/api/mcp/`, "description": "MCP Streamable HTTP server" },
    { "id": "order", "type": "commerce", "url": `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`, "description": "Place orders via WhatsApp or human order draft" },
    { "id": "compare", "type": "tool", "url": `${baseUrl}/compare/`, "description": "Side-by-side product specifications matrix" },
    { "id": "finance", "type": "tool", "url": `${baseUrl}/finance/`, "description": "Australian electric dirt bike Pay in 4 and finance calculator" }
  ],
  "capabilities": ["browse", "search", "inquiry", "wholesale", "compare", "finance", "content", "mcp"],
  "endpoints": {
    "mcp": `${baseUrl}/api/mcp/`,
    "catalog": `${baseUrl}/shop/`,
    "contact": `${baseUrl}/contact/`,
    "agent_skills": `${baseUrl}/.well-known/agent-skills/index.json`,
    "mcp_server_card": `${baseUrl}/.well-known/mcp/server-card.json`,
    "api_catalog": `${baseUrl}/.well-known/api-catalog`,
    "llms_txt": `${baseUrl}/llms.txt`
  },
  "currency": SITE.currency,
  "minimum_order_usd": String(SHOP.minOrder),
  "payment_methods": SHOP.paymentMethods,
  "legal": {
    "age_restriction": "none",
    "product_type": "electric-dirt-bikes",
    "compliance": "Australian Design Rules (ADR)"
  }
};
fs.writeFileSync(path.resolve(wellKnownDir, 'ucp.json'), JSON.stringify(ucpJson, null, 2) + '\n');

// 13. Generate public/js/webmcp.js
const webmcpJs = `(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search ${SITE.name} electric dirt bikes and parts by keyword, category, or price",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
            category: { type: "string" },
            max_price: { type: "number" }
          }
        },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', String(max_price));
          const res = await fetch(\`${baseUrl}/api/search/?\${params}\`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse products by category",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string" }
          }
        },
        execute: async ({ category }) => {
          const url = category ? \`${baseUrl}/shop/\${category}/\` : \`${baseUrl}/shop/\`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate a WhatsApp order with a technician. 10% crypto discount or Pay in 4 available. Human completes.",
        inputSchema: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        execute: async ({ message }) => {
          const cleanPhone = "${CONTACT.whatsapp.replace(/[^0-9]/g, '')}";
          const url = message ? \`https://wa.me/\${cleanPhone}?text=\${encodeURIComponent(message)}\` : \`https://wa.me/\${cleanPhone}\`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "get_wholesale_info",
        description: "Get wholesale pricing tiers and station fleet information",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`${baseUrl}/wholesale/\`;
          return { url: \`${baseUrl}/wholesale/\` };
        }
      },
      {
        name: "compare_products",
        description: "Open the electric dirt bike comparison matrix",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`${baseUrl}/compare/\`;
          return { url: \`${baseUrl}/compare/\` };
        }
      },
      {
        name: "contact",
        description: "Contact ${SITE.name} NSW technicians for fitment or questions",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`${baseUrl}/contact/\`;
          return { url: \`${baseUrl}/contact/\` };
        }
      }
    ]
  });
})();
`;
fs.writeFileSync(path.resolve(jsDir, 'webmcp.js'), webmcpJs);

// 14. Generate public/[SITE.indexNowKey].txt
if (SITE.indexNowKey) {
  fs.writeFileSync(path.resolve(publicDir, `${SITE.indexNowKey}.txt`), SITE.indexNowKey + '\n');
}

console.log('✅ Successfully generated all agent-ready files from src/config/site.js');
