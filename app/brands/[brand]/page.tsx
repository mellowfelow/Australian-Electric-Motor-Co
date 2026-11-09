import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { SmartImage } from '@/components/SmartImage';
import { FaqAccordion } from '@/components/FaqAccordion';
import { PaginatedProductGrid } from '@/components/PaginatedProductGrid';
import { AllProductLinks } from '@/components/AllProductLinks';
import { CATEGORIES, PRODUCTS, POSTS, SITE, BRAND_FAQ, BRAND_GUIDES } from '@/config/site';
import { buildFaqSchema } from '@/lib/faq';

interface BrandPageProps {
  params: Promise<{
    brand: string;
  }>;
}

export async function generateStaticParams() {
  const brandCategories = CATEGORIES.filter(
    (c) => c.section === 'brands' && c.parent === 'brands'
  );
  return brandCategories.map((c) => ({ brand: c.slug }));
}

// Per-brand title/description sourced from docs/keyword-map.md (keyword-engine
// pass, Sept 2026) — each description now mentions the brand's own real
// products instead of the one generic sentence every brand previously shared.
const BRAND_SEO: Record<string, { title: string; description: string }> = {
  surron: {
    title: 'Surron Electric Dirt Bikes | AEMC',
    description:
      'Shop genuine Surron electric dirt bikes in Australia — Light Bee X, Ultra Bee and Storm Bee, backed by factory warranty, Surron parts and battery stock.',
  },
  talaria: {
    title: 'Talaria Electric Dirt Bikes | AEMC',
    description:
      'Shop genuine Talaria electric dirt bikes in Australia — Sting R MX4, Sting Pro MX5 and the X3 (XXX), gearbox-driven and built for durable bush bashing.',
  },
  'stark-future': {
    title: 'Stark VARG Electric Dirt Bikes | AEMC',
    description:
      'Shop the Stark VARG in Australia — 80hp electric motocross technology setting lap records worldwide, with local warranty and spare parts support.',
  },
  'e-ride-pro': {
    title: 'E-Ride Pro Electric Dirt Bikes | AEMC',
    description:
      'Shop genuine E-Ride Pro electric dirt bikes — factory 72V, out-of-the-box high-voltage models engineered for relentless acceleration and hill-climbing grunt.',
  },
  ktm: {
    title: 'KTM Electric Dirt Bikes | AEMC',
    description:
      'Shop genuine KTM electric dirt bikes in Australia — Austrian motocross heritage with WP suspension and championship-winning junior race bikes.',
  },
  husqvarna: {
    title: 'Husqvarna Electric Dirt Bikes | AEMC',
    description:
      'Shop genuine Husqvarna electric dirt bikes in Australia — Swedish-styled junior and youth models with WP XACT air suspension and refined power delivery.',
  },
  gasgas: {
    title: 'GASGAS Electric Dirt Bikes | AEMC',
    description:
      'Shop genuine GASGAS electric dirt bikes in Australia — Spanish-inspired motocross machines built for pure riding fun and a competitive edge for junior racers.',
  },
  kuberg: {
    title: 'Kuberg Electric Dirt Bikes | AEMC',
    description:
      'Shop genuine Kuberg electric dirt bikes in Australia — handcrafted European models precision-engineered for young riders, freeriders and paddock transport.',
  },
  oset: {
    title: 'OSET Electric Dirt Bikes | AEMC',
    description:
      'Shop genuine OSET electric bikes in Australia — world-champion electric trials and balance bikes with micrometer-fine throttle modulation and safety dials.',
  },
  'rfn-apollo': {
    title: 'RFN Apollo Electric Dirt Bikes | AEMC',
    description:
      'Shop genuine RFN Apollo electric dirt bikes in Australia — rugged, rally-inspired models with reinforced chromoly frames and dual-mode riding profiles.',
  },
  'arctic-leopard': {
    title: 'Arctic Leopard Electric Dirt Bikes | AEMC',
    description:
      'Shop genuine Arctic Leopard electric dirt bikes in Australia — heavyweight mountain enduro machines with extreme 80V torque and climb-oriented chassis balance.',
  },
  stacyc: {
    title: 'STACYC Electric Balance Bikes | AEMC',
    description:
      'Shop genuine STACYC electric balance bikes in Australia — the global benchmark for building young riders’ confidence and balance before their first dirt bike.',
  },
  thumpstar: {
    title: 'Thumpstar Electric Dirt Bikes | AEMC',
    description:
      'Shop genuine Thumpstar electric dirt bikes in Australia — Aussie pit-bike heritage meets high-torque electric power for rugged backyard reliability.',
  },
  ubco: {
    title: 'UBCO Electric Utility Bikes | AEMC',
    description:
      'Shop genuine UBCO electric utility bikes in Australia — All-Wheel Drive (2X2) workhorses built for cattle stations, farm logistics and silent exploration.',
  },
  alpinestars: {
    title: 'Alpinestars Riding Gear Australia | AEMC',
    description:
      'Shop genuine Alpinestars motocross gear in Australia — Tech 7 Enduro and Tech 3S Youth boots, the Supertech SM5 helmet and Bionic Action V2 body armour.',
  },
  'fox-racing': {
    title: 'Fox Racing Motocross Gear Australia | AEMC',
    description:
      'Shop genuine Fox Racing motocross gear in Australia — adult and youth V1 helmets, the Youth Titan Sport roost deflector, Airline gloves and Comp youth boots.',
  },
};

// Gear brands (no bike products) — the brand-hub page and /brands/ index
// swap their bike-specific copy for gear-appropriate wording for these.
const GEAR_BRANDS = new Set(['alpinestars', 'fox-racing']);

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = CATEGORIES.find(
    (c) => c.slug === brandSlug && c.section === 'brands'
  );
  if (!brand) return { title: 'Brand Not Found' };

  const seo = BRAND_SEO[brand.slug];
  const title = seo?.title || `${brand.name} Electric Dirt Bikes | AEMC`;
  const description =
    seo?.description ||
    `Shop genuine ${brand.name} electric dirt bikes in Australia. Backed by the Australian Electric Motor Co factory warranty, NSW spare parts inventory, and national crated delivery.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${SITE.domain}/brands/${brand.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://${SITE.domain}/brands/${brand.slug}/`,
      images: [{ url: brand.image }],
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function BrandIndividualPage({ params }: BrandPageProps) {
  const { brand: brandSlug } = await params;
  const brand = CATEGORIES.find(
    (c) => c.slug === brandSlug && c.section === 'brands'
  );

  if (!brand) {
    notFound();
  }

  // Filter products belonging to this brand
  const brandProducts = PRODUCTS.filter(
    (p: any) =>
      p.brand === brand.slug ||
      p.category === brand.slug ||
      (p.parentCategories && p.parentCategories.includes(brand.slug))
  );

  const brandFaq = (BRAND_FAQ as Record<string, { question: string; answer: string }[]>)[brand.slug] || [];
  const isGear = GEAR_BRANDS.has(brand.slug);
  const brandGuides = ((BRAND_GUIDES as Record<string, string[]>)[brand.slug] || [])
    .map((s) => (POSTS as any[]).find((p) => p.slug === s))
    .filter(Boolean) as any[];

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${SITE.domain}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Brands',
        item: `https://${SITE.domain}/brands/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: brand.name,
        item: `https://${SITE.domain}/brands/${brand.slug}/`,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd data={breadcrumbsSchema} />
      {brandFaq.length > 0 && <JsonLd data={buildFaqSchema(brandFaq)} />}

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-400 font-mono flex items-center gap-2">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/brands/" className="hover:text-white">Brands</Link>
        <span>/</span>
        <span className="text-[#C87D55] font-semibold">{brand.name}</span>
      </nav>

      {/* Hero Header with Exactly One H1 */}
      <div className="relative rounded-3xl overflow-hidden bg-[#17191C] border border-[#2B2F36] p-8 sm:p-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-xl border border-[#2B2F36] bg-white">
            <SmartImage
              src={brand.image}
              alt={`${brand.name} logo`}
              fill
              fit="contain"
              priority
              className="p-3"
              sizes="160px"
            />
          </div>
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C87D55] uppercase tracking-wider font-bold">
              <span>Authorised Showroom</span>
              <span>•</span>
              <span>{isGear ? 'Genuine Australian Stock' : 'Australian Factory Support'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              {brand.name} {isGear ? 'Riding Gear' : 'Electric Dirt Bikes'}
            </h1>
            <p className="text-base text-stone-300 leading-relaxed">
              {brand.description}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
            <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              • {brandProducts.length} {isGear ? 'Items' : 'Models & Upgrades'} in Australian Stock
            </span>
            <span className="text-stone-300 bg-stone-800 border border-stone-700 px-3 py-1 rounded-full">
              • {isGear ? '5% Off With Any Bike in Your Cart' : '10% Crypto Discount Applied at Checkout'}
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {brandProducts.length > 0 ? (
        <>
          <PaginatedProductGrid products={brandProducts} />
          <AllProductLinks products={brandProducts} heading={`All ${brand.name} products`} />
        </>
      ) : (
        <div className="bg-[#17191C] border border-[#2B2F36] rounded-2xl p-10 text-center space-y-4">
          <h2 className="text-xl font-bold text-white uppercase">
            {isGear ? `More ${brand.name} Stock Arriving` : `New ${brand.name} Crated Shipments En Route`}
          </h2>
          <p className="text-sm text-stone-400 max-w-xl mx-auto">
            {isGear
              ? `Our next ${brand.name} order is on the way. Contact our team to check availability or be notified when specific items land.`
              : `Our next factory allocation of ${brand.name} electric dirt bikes is currently undergoing pre-delivery inspection. Contact our workshop team to pre-reserve your build slot.`}
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/contact/"
              className="bg-[#8C4A2F] hover:bg-[#A35839] text-white text-xs font-bold py-3 px-6 rounded-lg transition uppercase tracking-wider"
            >
              Contact Workshop Team
            </Link>
            <Link
              href="/brands/"
              className="border border-[#2B2F36] hover:border-stone-500 text-stone-300 text-xs font-bold py-3 px-6 rounded-lg transition uppercase tracking-wider"
            >
              View All Brands
            </Link>
          </div>
        </div>
      )}

      {/* Related guides — reverse-direction internal links to blog posts (Batch 7) */}
      {brandGuides.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
            Related Guides
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {brandGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/blog/${g.slug}/`}
                className="rounded-xl border border-[#2B2F36] bg-[#17191C] p-4 transition-colors hover:border-[#8C4A2F]"
              >
                <span className="text-[10px] font-mono uppercase tracking-wide text-[#C87D55]">{g.category}</span>
                <h3 className="mt-1 text-sm font-bold text-stone-100">{g.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-400 line-clamp-2">{g.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Brand FAQ — only brands with real question-intent keyword data get a block (docs/faq-bank.md) */}
      {brandFaq.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
            {brand.name} — Common Questions
          </h2>
          <div className="max-w-3xl">
            <FaqAccordion items={brandFaq} idPrefix="brand" />
          </div>
        </div>
      )}
    </div>
  );
}
