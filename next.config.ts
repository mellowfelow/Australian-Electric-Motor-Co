import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Let the optimizer's output sit in the browser/edge cache for ~31 days
    // instead of the 60s default — the source images rarely change and this
    // is what "serve static assets with an efficient cache policy" wants.
    minimumCacheTTL: 2678400,
    // No remote image hosts whitelisted — every product/category image is
    // local (public/images/...). Keeping this empty is a deliberate guard:
    // a stray hotlinked placeholder (Unsplash, Picsum, etc.) fails to render
    // at build/runtime instead of silently shipping, on top of crosscheck's
    // own text scan (9d).
    remotePatterns: [],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  async redirects() {
    // Legacy /electric-dirt-bikes/* page tree (retired — it duplicated /shop/*
    // for the same keywords). Redirect every old URL, including the dead
    // duplicate-slug aliases that never had their own products, to the
    // canonical /shop/ page.
    const legacyBikeSubcategories: Record<string, string> = {
      'adult-electric-dirt-bikes': 'adult-electric-dirt-bikes',
      'full-size-motocross': 'full-size-motocross',
      'trail-mid-weight-enduro': 'trail-mid-weight-enduro',
      'trail-enduro': 'trail-mid-weight-enduro',
      'kids-youth-electric-dirt-bikes': 'kids-youth-electric-dirt-bikes',
      'junior-trials-youth-dirt-bikes': 'junior-trials-youth-dirt-bikes',
      'junior-trials': 'junior-trials-youth-dirt-bikes',
      'balance-mini-bikes': 'balance-mini-bikes',
      'adr-road-legal-dirt-bikes': 'adr-road-legal-dirt-bikes',
      'road-legal-electric-dirt-bikes': 'adr-road-legal-dirt-bikes',
      'utility-farm-e-bikes': 'utility-farm-e-bikes',
      'utility-farm-ebikes': 'utility-farm-e-bikes',
    };

    return [
      {
        source: '/electric-dirt-bikes',
        destination: '/shop/electric-dirt-bikes/',
        permanent: true,
      },
      ...Object.entries(legacyBikeSubcategories).map(([from, to]) => ({
        source: `/electric-dirt-bikes/${from}`,
        destination: `/shop/${to}/`,
        permanent: true,
      })),
      // The four dead duplicate slugs never had their own page under /shop/
      // either — redirect those direct hits too, in case they were crawled.
      {
        source: '/shop/trail-enduro',
        destination: '/shop/trail-mid-weight-enduro/',
        permanent: true,
      },
      {
        source: '/shop/junior-trials',
        destination: '/shop/junior-trials-youth-dirt-bikes/',
        permanent: true,
      },
      {
        source: '/shop/road-legal-electric-dirt-bikes',
        destination: '/shop/adr-road-legal-dirt-bikes/',
        permanent: true,
      },
      {
        source: '/shop/utility-farm-ebikes',
        destination: '/shop/utility-farm-e-bikes/',
        permanent: true,
      },
      // Legacy /parts-upgrades/* page tree (retired Sept 2026 — it duplicated
      // /shop/parts-upgrades/ and /shop/batteries-chargers/ with its own
      // self-referencing canonicals, cannibalising the keyword-mapped /shop/
      // pages).
      {
        source: '/parts-upgrades',
        destination: '/shop/parts-upgrades/',
        permanent: true,
      },
      {
        source: '/parts-upgrades/batteries-chargers',
        destination: '/shop/batteries-chargers/',
        permanent: true,
      },
    ];
  },
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
