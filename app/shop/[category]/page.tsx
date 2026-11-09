import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SmartImage } from '@/components/SmartImage';
import { JsonLd } from '@/components/JsonLd';
import { FaqAccordion } from '@/components/FaqAccordion';
import { CategoryProductGrid } from './CategoryProductGrid';
import { AllProductLinks } from '@/components/AllProductLinks';
import { CATEGORIES, PRODUCTS, POSTS, SITE, getShopCategoryNav, CATEGORY_FAQ, CATEGORY_GUIDES } from '@/config/site';
import { buildSeoTitle, categoryHasProducts, truncateDescription } from '@/lib/seo';
import { buildFaqSchema } from '@/lib/faq';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

// Subcategory SEO Configuration Map — title/description/h1 sourced from
// docs/keyword-map.md (keyword-engine pass, Sept 2026). Every category with a
// real or qualitative primary keyword gets an entry here so its <title> and
// meta description lead with that keyword instead of the raw category label.
// Categories not listed (currently only `linkage-triangles`, which returned
// zero data even at broad keyword-export scope — see product-gaps.md) fall
// through to the generic buildSeoTitle()/truncateDescription() below.
const CATEGORY_SEO_MAP: Record<
  string,
  {
    title: string;
    description: string;
    h1?: string;
  }
> = {
  'adult-electric-dirt-bikes': {
    title: 'Adult Electric Dirt Bike | High-Power 60V–72V E-Motos',
    description:
      'Discover the best adult electric dirt bike selection in Australia. Featuring Stark VARG, Surron Ultra Bee, and Talaria Sting with high-discharge powertrains.',
    h1: 'Adult Electric Dirt Bike Range',
  },
  'kids-youth-electric-dirt-bikes': {
    title: 'Kids Electric Dirt Bike | Youth & Mini-Moto | AEMC',
    description:
      'Safe, durable, and adjustable kids electric dirt bike models from KTM, STACYC, and OSET. Built-in speed limiters and lightweight frames for young riders.',
    h1: 'Kids Electric Dirt Bike & Youth Off-Road',
  },
  'adr-road-legal-dirt-bikes': {
    title: 'Road-Legal Electric Dirt Bike | ADR Street Approved E-Motos',
    description:
      'Ride legally from street to trail. Shop ADR-certified electric dirt bike models equipped with VIN, mirrors, and lights for Australian road registration.',
    h1: 'Road-Legal Electric Dirt Bike Models',
  },
  'electric-dirt-bikes': {
    title: 'Electric Dirt Bike Range | AEMC',
    description:
      "Australia's full electric dirt bike range — motocross, trail, kids, road-legal and farm models, all backed by a 2-year factory warranty and fast crate delivery.",
    h1: 'Electric Dirt Bike Range',
  },
  'full-size-motocross': {
    title: 'Electric Motocross Bikes Australia | AEMC',
    description:
      'Full-size electric motocross bikes matching 110-450cc petrol power — holeshot torque, long-travel suspension and 21"/18" wheels for the track.',
  },
  'trail-mid-weight-enduro': {
    title: 'Electric Trail Bikes | Mid-Weight Enduro | AEMC',
    description:
      'Electric trail bikes built for rocky ridges, singletrack and outback bush navigation — nimble, high-endurance enduro machines with up to 140km range per charge.',
  },
  'junior-trials-youth-dirt-bikes': {
    title: 'Kids Electric Dirt Bike | Junior & Trials | AEMC',
    description:
      'Kids electric dirt bike and junior trials models for youth riders mastering throttle control, balance and technical riding — precision power, governed for safety.',
  },
  'utility-farm-e-bikes': {
    title: 'Electric Farm Bikes Australia | AEMC',
    description:
      'Silent electric farm bikes and utility workhorses for cattle stations, paddock mustering and fence inspections — heavy-duty, without scaring livestock.',
  },
  'balance-mini-bikes': {
    title: 'Electric Balance Bikes for Kids | AEMC',
    description:
      'Electric balance bikes and mini bikes for kids aged 3-9 learning throttle control and balance fundamentals on grass and dirt — governed, lightweight starters.',
  },
  'parts-upgrades': {
    title: 'Electric Dirt Bike Parts & Upgrades | AEMC',
    description:
      'Electric dirt bike parts and upgrades — race-grade batteries, programmable controllers, FastAce suspension, oversized brakes and drivetrain components.',
  },
  'batteries-chargers': {
    title: 'Electric Dirt Bike Batteries & Chargers | AEMC',
    description:
      'Motorbike batteries and 72V high-discharge lithium packs, plus Australian 240V fast chargers for Surron, Talaria and Stark VARG electric dirt bikes.',
  },
  'high-capacity-batteries': {
    title: 'High-Capacity Motorbike Batteries | AEMC',
    description:
      'High-capacity motorbike batteries — hand-assembled 72V Molicel packs rated for 350A continuous discharge in high-temperature outback riding conditions.',
  },
  'fast-chargers': {
    title: 'Electric Bike Chargers | Fast 72V & 48V | AEMC',
    description:
      'Electric bike chargers rated 15A-20A with Australian 240V 10A plugs and smart voltage-curve monitoring, sized for 36V, 48V and 72V dirt bike packs.',
  },
  'controllers-electronics': {
    title: 'Electric Dirt Bike Controllers & Electronics | AEMC',
    description:
      'Electric dirt bike controllers, Bluetooth-programmable FOC units, water-sealed displays, quick-turn throttles and reinforced wiring for reliable power delivery.',
  },
  'aftermarket-controllers': {
    title: 'Aftermarket Ebike Controllers | 60A+ | AEMC',
    description:
      'Plug-and-play aftermarket ebike controllers (Torp, ASI, BAC) unlocking up to 25kW output and variable regenerative braking for your electric dirt bike.',
  },
  'displays-throttles': {
    title: 'Dirt Bike Thumb Throttles & Displays | AEMC',
    description:
      'Dirt bike thumb throttles and sunlight-readable colour TFT displays — waterproof CNC electronic throttles and bar switches for reliable trail control.',
  },
  'wiring-harnesses': {
    title: 'Dirt Bike Wiring Harnesses | AEMC',
    description:
      'IP67 waterproof dirt bike wiring harnesses built to resist outback bull-dust, engine-bay heat and trail snags on Surron, Talaria and Stark VARG builds.',
  },
  'suspension-steering': {
    title: 'Dirt Bike Suspension & Steering Parts | AEMC',
    description:
      'Dirt bike suspension upgrades — inverted front forks, piggyback rear shocks, CNC triple clamps and reinforced linkages for Surron, Talaria and Stark VARG.',
  },
  'front-forks': {
    title: 'Dirt Bike Front Forks | Inverted MX | AEMC',
    description:
      '48mm inverted hydraulic dirt bike front forks with 270mm of plush travel, tuned for Australian whoops and deep braking ruts on electric motocross builds.',
  },
  'rear-shocks': {
    title: 'Dirt Bike Rear Shocks | Piggyback Coil | AEMC',
    description:
      'Dirt bike rear shocks with high/low-speed compression adjustment and heavy spring options — piggyback coil shocks tuned for aggressive electric-bike riders.',
  },
  'brakes-rotors': {
    title: 'Dirt Bike Brakes & Rotors | AEMC',
    description:
      'Complete dirt bike brake sets — 4-piston hydraulic calipers, 250mm oversized floating discs, braided steel lines and sintered pads for hard-stopping power.',
  },
  'complete-brake-sets': {
    title: 'Dirt Bike Brake Upgrade Kits | AEMC',
    description:
      'Complete dirt bike brake upgrade kits — quad-piston hydraulic calipers and radial levers for one-finger stopping power on heavy 72V electric builds.',
  },
  'oversized-rotors': {
    title: 'Oversized Dirt Bike Brake Rotors | AEMC',
    description:
      'Oversized 250mm-260mm dirt bike brake rotors, laser-cut and heat-treated with CNC adapter brackets to eliminate brake fade on long, fast descents.',
  },
  'pads-lines': {
    title: 'Dirt Bike Brake Pads & Lines | AEMC',
    description:
      'Sintered dirt bike brake pads engineered for wet red clay and bull-dust conditions, paired with braided stainless hydraulic lines for consistent bite.',
  },
  'wheels-drivetrain': {
    title: 'Dirt Bike Wheels & Drivetrain Parts | AEMC',
    description:
      'Dirt bike wheel sets and drivetrain parts — heavy-duty 21"/18" wheelsets, knobby tyres, CNC sprockets, gold O-ring chains and silent belt-drive kits.',
  },
  'wheel-sets-tyres': {
    title: 'Dirt Bike Wheel Sets & Tyres | AEMC',
    description:
      'Dirt bike wheel sets and tyres — SM Pro Platinum billet spoke wheels pre-fitted with heavy-duty rim locks and Dunlop Geomax MX knobby tyres.',
  },
  'sprockets-chains': {
    title: 'Dirt Bike Sprockets & Chains | AEMC',
    description:
      'Dirt bike sprocket and chain kits — CNC 7075-T6 rear sprockets paired with Japanese DID gold racing chains for high-torque electric drivetrain longevity.',
  },
  'belt-drive-kits': {
    title: 'Dirt Bike Belt Drive Kits | AEMC',
    description:
      'Dirt bike belt drive conversion kits — carbon-corded Gates GT4 belts engineered for silent stealth trail riding and paddock cruising, no chain clatter.',
  },
  'riding-gear': {
    title: 'Dirt Bike Riding Gear & Protection | AEMC',
    description:
      'Dirt bike riding gear certified to AS/NZS 1698 and ECE 22.06 — full-face MX helmets, CE-rated body armour, off-road goggles and enduro boots.',
  },
  helmets: {
    title: 'Dirt Bike Helmets | Full-Face MX | AEMC',
    description:
      'Dirt bike helmets approved to ECE 22.06 and Australian AS/NZS 1698 — full-face motocross helmets with MIPS rotational protection and carbon composite shells.',
  },
  'body-armour': {
    title: 'Motocross Body Armour & Wrist Braces | AEMC',
    description:
      'Motocross body armour — CE Level 1 & 2 chest protectors, neck braces and wrist braces for full upper-body protection on every electric dirt bike ride.',
  },
  'body-armour-protection': {
    title: 'MX Body Armour & Protection Gear | AEMC',
    description:
      'MX body armour and protection gear — CE-certified chest roost deflectors, protection jackets and joint protection systems for motocross and enduro riding.',
  },
  'gloves-goggles': {
    title: 'Dirt Bike Goggles & Gloves | AEMC',
    description:
      'Dirt bike goggles and gloves — ultra-wide-vision motocross goggles with anti-fog lenses, paired with four-way-stretch off-road riding gloves.',
  },
  boots: {
    title: 'Motocross Boots | Enduro & Dirt Bike | AEMC',
    description:
      'Motocross boots and dirt bike boots with biomechanical ankle pivots, replaceable sole systems and deep-lugged traction soles for enduro and MX riding.',
  },
  accessories: {
    title: 'Electric Dirt Bike Accessories | AEMC',
    description:
      'Electric dirt bike accessories — ute hitch carriers, foldable pit stands, custom graphics kits and electrical-safe cleaning bundles for the whole build.',
  },
  'bike-stands-tools': {
    title: 'Dirt Bike Stands & Pit Tools | AEMC',
    description:
      'Dirt bike motorcycle stands and pit tools — foldable composite and aircraft-grade aluminium lift stands, plus FIM-approved environmental pit mats.',
  },
  'storage-transport': {
    title: 'Motorbike Carriers & Transport | AEMC',
    description:
      'Motorbike carriers and transport gear — heavy-duty 2-inch hitch bike carriers, soft-loop tie-down straps and weatherproof covers for e-moto transport.',
  },
  'graphics-plastics-kits': {
    title: 'Dirt Bike Graphics & Plastics Kits | AEMC',
    description:
      'Dirt bike graphics kits and restyle plastics — heavy-duty 21mil vinyl decals and gloss polypropylene panels for Surron, Talaria, E-Ride Pro and Stark VARG.',
  },
  'maintenance-chemicals': {
    title: 'E-Moto Cleaning & Chain Lube | AEMC',
    description:
      'E-moto cleaning products and chain lube — waterless bike wash, O-ring/X-ring PTFE chain lubricant and electrical-safe contact cleaner for high-voltage builds.',
  },
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const customSeo = CATEGORY_SEO_MAP[categorySlug];

  if (!category && !customSeo) return { title: 'Category Not Found' };

  const title = customSeo?.title || buildSeoTitle(category?.name || '');
  const description = truncateDescription(customSeo?.description || category?.description || '');

  // Brand views of the shared [category] route are canonical at /brands/…
  // (the hub at /brands/, each brand at /brands/<slug>/) — see app/sitemap.ts.
  const isBrandView = category?.section === 'brands' && category?.parent === 'brands';
  const canonicalPath =
    categorySlug === 'brands' ? '/brands/' : isBrandView ? `/brands/${categorySlug}/` : `/shop/${categorySlug}/`;
  const canonical = `https://${SITE.domain}${canonicalPath}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    ...(category && !categoryHasProducts(category) ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: category?.image || '/images/home/hero-1.webp' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [category?.image || '/images/home/hero-1.webp'],
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const customSeo = CATEGORY_SEO_MAP[categorySlug];

  if (!category) {
    notFound();
  }

  const isBrandsRoot = category.slug === 'brands';
  const brandCategories = CATEGORIES.filter(
    (c) => c.section === 'brands' && c.parent === 'brands'
  );

  const categoryProducts = PRODUCTS.filter(
    (p: any) =>
      isBrandsRoot ||
      p.category === category.slug ||
      p.brand === category.slug ||
      (p.parentCategories && p.parentCategories.includes(category.slug)) ||
      (category.slug === 'adult-electric-dirt-bikes' && (p.category === 'full-size-motocross' || p.category === 'trail-mid-weight-enduro')) ||
      (category.slug === 'kids-youth-electric-dirt-bikes' && (p.category === 'junior-trials-youth-dirt-bikes' || p.category === 'balance-mini-bikes'))
  );

  const pageHeading = customSeo?.h1 || category.name;
  const categoryFaq = (CATEGORY_FAQ as Record<string, { question: string; answer: string }[]>)[category.slug] || [];
  const guideSlugs = (CATEGORY_GUIDES as Record<string, string[]>)[category.slug] || [];
  const guides = guideSlugs
    .map((s) => (POSTS as any[]).find((p) => p.slug === s))
    .filter(Boolean) as any[];

  // Child categories to expose as a drill-down "Category" filter on hub pages
  const subcategories = CATEGORIES.filter((c) => c.parent === category.slug).map((c) => ({
    slug: c.slug,
    name: c.name,
  }));

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
        name: 'Shop',
        item: `https://${SITE.domain}/shop/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: pageHeading,
        item: `https://${SITE.domain}/shop/${category.slug}/`,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd data={breadcrumbsSchema} />
      {categoryFaq.length > 0 && <JsonLd data={buildFaqSchema(categoryFaq)} />}

      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-400 font-mono flex items-center gap-2">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/shop/" className="hover:text-white">Shop</Link>
        <span>/</span>
        <span className="text-[#C87D55]">{pageHeading}</span>
      </nav>

      {/* Hero Header with Single H1 */}
      <div className="relative rounded-3xl overflow-hidden bg-[#17191C] border border-[#2B2F36] p-8 sm:p-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C87D55] font-mono">
            Category Showcase
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {pageHeading}
          </h1>
          <p className="text-base text-stone-300 leading-relaxed">
            {category.description}
          </p>
          <div className="pt-2 text-xs font-mono text-emerald-400">
            • {categoryProducts.length} Models Available for Immediate AU Crate Delivery
          </div>
        </div>
      </div>

      {/* If Brands Root, display clickable Brand Cards */}
      {isBrandsRoot && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
              Authorised Brand Showrooms
            </h2>
            <Link
              href="/brands/"
              className="text-xs font-semibold text-[#C87D55] hover:text-white inline-flex items-center gap-1"
            >
              <span>View Full Brands Directory</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {brandCategories.map((brand) => {
              const modelCount = PRODUCTS.filter(
                (p: any) =>
                  p.brand === brand.slug ||
                  p.category === brand.slug ||
                  (p.parentCategories && p.parentCategories.includes(brand.slug)),
              ).length;
              return (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}/`}
                  className="group flex items-center gap-3 rounded-xl border border-[#2B2F36] bg-[#17191C] p-2.5 transition-all hover:border-[#C87D55] hover:bg-[#1D2024]"
                >
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-white">
                    <SmartImage
                      src={brand.image}
                      alt={`${brand.name} logo`}
                      fill
                      fit="contain"
                      className="p-1"
                      sizes="44px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[13px] font-bold leading-tight text-white transition-colors group-hover:text-[#C87D55]">
                      {brand.name}
                    </h3>
                    <span className="font-mono text-[11px] text-stone-400">
                      {modelCount} {modelCount === 1 ? 'product' : 'products'}
                    </span>
                  </div>
                  <span className="shrink-0 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#C87D55]">
                    &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Products Grid with Interactive Filters */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
          {isBrandsRoot ? 'All Electric Dirt Bikes Across Brands' : `${category.name} Inventory`}
        </h2>

        <CategoryProductGrid
          initialProducts={categoryProducts}
          categorySlug={category.slug}
          categoryName={category.name}
          subcategories={subcategories}
          categoryNav={getShopCategoryNav()}
        />
      </section>

      {!isBrandsRoot && (
        <AllProductLinks products={categoryProducts} heading={`All ${category.name} products`} />
      )}

      {/* Related guides — reverse-direction internal links to blog posts (Batch 7) */}
      {guides.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
            Related Guides
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
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
        </section>
      )}

      {/* Category FAQ — only categories with real question-intent keyword data get a block (docs/faq-bank.md) */}
      {categoryFaq.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
            {category.name} — Common Questions
          </h2>
          <div className="max-w-3xl">
            <FaqAccordion items={categoryFaq} idPrefix="cat" />
          </div>
        </section>
      )}
    </div>
  );
}
