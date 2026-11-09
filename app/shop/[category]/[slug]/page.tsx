import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SmartImage } from '@/components/SmartImage';
import { JsonLd } from '@/components/JsonLd';
import { FaqAccordion } from '@/components/FaqAccordion';
import { AddToCartButton } from './AddToCartButton';
import { PRODUCTS, CATEGORIES, SITE, CONTACT, SHOP, FINANCE } from '@/config/site';
import { buildSeoTitle, truncateDescription } from '@/lib/seo';
import { buildFaqSchema } from '@/lib/faq';
import { waLink } from '@/lib/whatsapp';

interface ProductPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

// Batch 2 (docs/keyword-map.md): only the handful of products whose own CSV
// row showed genuine measured search volume for a phrase that's meaningfully
// different from the bare model name get an override here — appending a real,
// accurate qualifier (never a fabricated one). The other ~245 products keep
// buildSeoTitle(product.name): per keyword-map.md's own methodology, they got
// zero SKU-specific search volume (normal — nobody searches an exact spare-
// part SKU), so the bare model name IS the correct, honest title; there's no
// better keyword to substitute in without inventing one.
//
// Two real per-SKU keyword hits were deliberately left OUT of this map:
// - "Stark VARG MX (60hp)" matched "stark varg ex 60hp" (v30) in the export —
//   but that's the EX Enduro model's spec, not the MX's; using it would put a
//   wrong model name in the page's own title. Left on the honest fallback.
// - "Surron Hyper Bee" matched "surron hyper bee charger" (v20) — a charger
//   accessory search, not the bike itself. Same reasoning.
const PRODUCT_SEO_NAME_OVERRIDE: Record<string, string> = {
  'surron-ultra-bee': 'Surron Ultra Bee Electric Dirt Bike',
  'rfn-ares-rally-pro': 'RFN Ares Rally Pro Electric Dirt Bike',
  'stacyc-12edrive': 'STACYC 12eDRIVE Electric Balance Bike',
  'arctic-leopard-xe-pro-s': 'Arctic Leopard XE Pro S Electric Dirt Bike',
  'ubco-2x2-work-bike': 'UBCO 2X2 Work Electric Utility Bike',
  'ubco-2x2-adventure-bike': 'UBCO 2X2 Adventure Electric Utility Bike',
};

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };

  const seoName = PRODUCT_SEO_NAME_OVERRIDE[product.slug] || product.name;
  const title = buildSeoTitle(seoName);

  return {
    title,
    description: truncateDescription(product.shortDescription),
    alternates: {
      canonical: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
    },
    openGraph: {
      title: `${seoName} | Australian Electric Motor Co`,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === product.category);

  // ---- Related / cross-sell products -----------------------------------------
  const norm = (s: any) => (s || '').toString().toLowerCase();
  const sameBrandFirst = (list: any[]) =>
    [...list].sort(
      (a, b) =>
        (norm(b.brand) === norm(product.brand) ? 1 : 0) -
        (norm(a.brand) === norm(product.brand) ? 1 : 0),
    );
  const dedupe = (list: any[]) => {
    const seen = new Set<string>([product.slug]);
    return list.filter((p) => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });
  };

  // ---- Confirmed fitment: which bikes does this battery / charger / part fit? --
  const bikeProducts = PRODUCTS.filter((p: any) => p.isBike);
  const normName = (s: any): string =>
    (s || '')
      .toString()
      .toLowerCase()
      .replace(/sur[\s-]?ron/g, 'surron')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  const matchBike = (entry: string) => {
    for (const cand of entry.split('/')) {
      const c = normName(cand);
      if (c.length < 3) continue;
      const cWords = c.split(' ').filter((w) => w.length >= 3);
      const hit = bikeProducts.find((b: any) => {
        const bn = normName(b.name);
        if (bn.includes(c) || c.includes(bn)) return true;
        return cWords.filter((w) => bn.includes(w)).length >= 2;
      });
      if (hit) return hit;
    }
    return undefined;
  };
  const fitmentList: { label: string; bike?: any }[] = ((product as any).fitment || []).map(
    (entry: string) => ({ label: entry, bike: matchBike(entry) }),
  );
  const fitmentBikes = dedupe(
    fitmentList.map((f) => f.bike).filter(Boolean) as any[],
  );

  let related: any[] = [];
  let relatedHeading = 'Related products';
  let relatedBlurb = '';

  if ((product as any).isBike) {
    // Spares & add-ons a bike owner buys alongside — batteries, chargers, parts, then gear.
    const pools = [
      PRODUCTS.filter((p: any) => p.category === 'high-capacity-batteries'),
      PRODUCTS.filter((p: any) => p.category === 'fast-chargers'),
      PRODUCTS.filter((p: any) => p.isPart),
      PRODUCTS.filter((p: any) => p.isGear),
    ];
    const picked: any[] = [];
    for (const pool of pools) {
      for (const p of sameBrandFirst(pool)) {
        if (picked.length >= 8 && pool !== pools[0] && pool !== pools[1]) break;
        if (!picked.find((x) => x.slug === p.slug)) picked.push(p);
      }
    }
    related = dedupe(picked).slice(0, 4);
    relatedHeading = 'Spare batteries, chargers & upgrades for this bike';
    relatedBlurb =
      'Every bike ships with its own battery and charger — these are spares and replacements. Add any of them with a bike and you get 5% off the accessory at checkout.';
  } else {
    // A part / battery / charger / accessory / gear item — show siblings, then bikes it suits.
    const siblings = dedupe(
      PRODUCTS.filter(
        (p: any) =>
          p.category === product.category ||
          (p.parentCategories || []).some((c: string) =>
            (product.parentCategories || []).includes(c),
          ),
      ),
    );
    const bikes = fitmentBikes.length
      ? dedupe(fitmentBikes)
      : dedupe(sameBrandFirst(PRODUCTS.filter((p: any) => p.isBike)));
    related = dedupe([...bikes, ...siblings]).slice(0, 4);
    relatedHeading = fitmentBikes.length ? 'Fits these bikes — and 5% off with one' : 'Pairs well with';
    relatedBlurb = fitmentBikes.length
      ? 'This is a confirmed fit for the bikes below. Add it to the same order as any electric dirt bike and it comes off 5% cheaper automatically in your cart.'
      : 'Buy any part or accessory together with an electric dirt bike and it comes off 5% cheaper in your cart.';
  }

  // Pay in 4 calculation: 4 equal fortnightly instalments, 0% interest
  const payIn4Amount = Math.round(product.price / 4);
  const cryptoDiscountPrice = Math.round(product.price * (1 - SHOP.cryptoDiscount / 100));
  const cryptoSavings = product.price - cryptoDiscountPrice;

  // Pre-fill WhatsApp message
  const whatsappUrl = waLink(
    `I'm inquiring about the ${product.name} ($${product.price.toLocaleString()} AUD). Could you confirm current availability and Pay in 4 terms?`,
  );

  // Product Schema
  const productSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.images.map((img: string) => (img.startsWith('http') ? img : `https://${SITE.domain}${img}`)),
      sku: product.slug,
      brand: {
        '@type': 'Brand',
        name: SITE.name,
      },
      offers: {
        '@type': 'Offer',
        url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
        priceCurrency: SITE.currency,
        price: product.price,
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: SITE.name,
        },
      },
    },
    {
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
          name: category ? category.name : 'Category',
          item: `https://${SITE.domain}/shop/${product.category}/`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: product.name,
          item: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
        },
      ],
    },
  ];

  // Generic per-product FAQ (Batch 3, docs/faq-bank.md): SKU-level question
  // data essentially doesn't exist in the keyword export (nobody searches
  // the exact name of a specific spare-part SKU), so every product gets the
  // same small, honest template answered from its own real fields —
  // warranty scope differs for bikes vs. parts/gear (never a fabricated
  // term for the latter), and only bikes get the road-legal question.
  const productAny = product as any; // PRODUCTS is a union across bike/part/gear
  // shapes — isBike/roadLegal only exist on the bike branch, same reason the
  // rest of this file already casts PRODUCTS items to `any` when filtering.
  const productFaq: { question: string; answer: string }[] = [];
  if (!productAny.isBike) {
    productFaq.push({
      question: `Is the ${product.name} covered by the 5% bundle discount?`,
      answer: `Yes — any part, battery, charger, gear or accessory item, including the ${product.name}, gets an automatic 5% discount when it's in the same cart as an electric dirt bike, applied at checkout. The discount doesn't apply to bikes themselves.`,
    });
  }
  productFaq.push({
    question: `What warranty comes with the ${product.name}?`,
    answer: productAny.isBike
      ? `The ${product.name} is backed by a 2-Year Australian Factory Warranty covering the frame, motor, controller and battery, serviced with Australian parts stock.`
      : `Full-size electric dirt bikes carry a 2-Year Australian Factory Warranty on frame, motor, controller and battery. Warranty terms on parts, gear and accessories like the ${product.name} vary by item — contact our workshop team for the specifics before you order.`,
  });
  if (productAny.isBike) {
    productFaq.push({
      question: `Is the ${product.name} road-legal in Australia?`,
      answer: productAny.roadLegal
        ? `Yes — the ${product.name} is built and equipped for road registration (ADR-compliant), though final registration requirements vary by state. See our ADR Road-Legal range for the full lineup.`
        : `No — the ${product.name} is an off-road-only model. It doesn't need registration when ridden on private property or a designated trail network, the same as a petrol dirt bike. Browse our ADR Road-Legal range if you need a street-registerable model.`,
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <JsonLd data={productSchema} />
      <JsonLd data={buildFaqSchema(productFaq)} />

      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-400 font-mono flex flex-wrap items-center gap-2">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/shop/" className="hover:text-white">Shop</Link>
        <span>/</span>
        {category && (
          <>
            <Link href={`/shop/${category.slug}/`} className="hover:text-white">
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-[#C87D55] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Product Media Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#2B2F36]">
            <SmartImage
              src={product.images[0]}
              alt={`${product.name} electric dirt bike`}
              priority={true}
              fill
              fit="contain"
              className="p-6"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#8C4A2F] text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider font-mono shadow-xl">
                {product.badge}
              </span>
            )}
          </div>

          {/* Additional gallery thumbnails if available */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-lg overflow-hidden border border-[#2B2F36] bg-white cursor-pointer hover:border-amber-500 transition"
                >
                  <SmartImage
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    fit="contain"
                    className="p-2"
                    sizes="120px"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Quick Features Highlight Box */}
          <div className="p-4 rounded-xl bg-[#17191C] border border-[#2B2F36] grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-stone-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>2-Year AU Factory Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Nationwide Enclosed Crate Freight</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>IP67 Dust &amp; Creek Water Sealed</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>240V Aussie Wall Fast Charger</span>
            </div>
          </div>
        </div>

        {/* Right: Product Info, Price & Actions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C87D55] font-bold">
              {category?.name || 'Electric Dirt Bike'}
            </span>
            {/* Exactly ONE <h1> per page */}
            <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight font-sans">
              {product.name}
            </h1>
          </div>

          {/* Price Strip */}
          <div className="p-5 rounded-2xl bg-[#17191C] border border-[#2B2F36] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-stone-400 font-mono">Outright Purchase (AUD)</div>
                <div className="text-3xl font-black text-amber-400 font-mono">
                  ${product.price.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-full">
                  ⚡ 10% Crypto Off: ${cryptoDiscountPrice.toLocaleString()} AUD
                </div>
                <div className="text-[11px] text-emerald-300/80 mt-1 font-mono">
                  Save ${cryptoSavings.toLocaleString()} AUD paying with BTC or USDT
                </div>
              </div>
            </div>

            {/* Pay in 4 Highlight Box */}
            <div className="pt-3 border-t border-[#24272E] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono bg-[#141619] p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold border border-amber-500/40">
                  Pay in 4
                </span>
                <span className="text-stone-300">
                  or 4 interest-free payments of <strong className="text-white">${payIn4Amount.toLocaleString()} AUD</strong>
                </span>
              </div>
              <Link
                href="/finance/"
                className="text-amber-300 hover:underline font-semibold flex items-center gap-1"
              >
                <span>View Schedule</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Bundle-saver: 5% off this item when it ships with a bike */}
          {!(product as any).isBike && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/50 via-[#17191C] to-[#17191C] border border-emerald-500/40 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-300 font-bold font-mono text-sm">
                <span className="text-base">🎁</span>
                <span>Buying a bike? Take 5% off this.</span>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-sans">
                Add this to the same cart as any electric dirt bike and{' '}
                <strong>
                  ${product.price.toLocaleString()} becomes $
                  {Math.round(product.price * 0.95).toLocaleString()} AUD
                </strong>{' '}
                — the bundle discount is applied automatically at checkout, on every part, battery,
                charger and accessory in the order.
              </p>
            </div>
          )}

          {/* Confirmed fitment — which bikes this battery / charger / part fits */}
          {fitmentList.length > 0 && (
            <div className="p-4 rounded-xl bg-[#17191C] border border-[#2B2F36] space-y-3">
              <div className="flex items-center gap-2 text-white font-bold font-mono text-sm">
                <span className="text-emerald-400">✓</span>
                <span>Confirmed fitment — fits these bikes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {fitmentList.map((f, i) =>
                  f.bike ? (
                    <Link
                      key={i}
                      href={`/shop/${f.bike.category}/${f.bike.slug}/`}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-emerald-500/12 border border-emerald-500/35 text-emerald-200 hover:bg-emerald-500/25 transition inline-flex items-center gap-1"
                    >
                      <span>{f.label}</span>
                      <span aria-hidden>&rarr;</span>
                    </Link>
                  ) : (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#20242A] border border-[#2B2F36] text-stone-300"
                    >
                      {f.label}
                    </span>
                  ),
                )}
              </div>
              <p className="text-[11px] text-stone-400 font-sans leading-relaxed">
                Not sure it matches your build? Message the workshop on WhatsApp with your bike model
                and we&apos;ll confirm before you order.
              </p>
            </div>
          )}

          {/* Helmet Law & Australian Standards Compliance Box */}
          {(product.category === 'helmets' ||
            product.parentCategories?.includes('helmets') ||
            product.name.toLowerCase().includes('helmet')) && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border-2 border-emerald-500/50 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-sm">
                <span className="text-base">🇦🇺</span>
                <span>Australian Standards &amp; Motorsport Approved</span>
              </div>
              <p className="text-xs text-emerald-200/95 leading-relaxed font-sans">
                <strong>Complies with Australian Road &amp; Motorsport Standards (ECE 22.06 / AS/NZS 1698)</strong>. Certified for street-legal e-moto riding, off-road state forestry trails, and Motorcycling Australia (MA) sanctioned race events.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-emerald-300">
                <span className="bg-emerald-900/60 px-2.5 py-0.5 rounded border border-emerald-600/40">ECE 22.06 Standard</span>
                <span className="bg-emerald-900/60 px-2.5 py-0.5 rounded border border-emerald-600/40">AS/NZS 1698 Compliant</span>
                <span className="bg-emerald-900/60 px-2.5 py-0.5 rounded border border-emerald-600/40">100% Street &amp; Track Legal</span>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="text-sm text-stone-300 leading-relaxed space-y-3">
            <p>{product.description}</p>
          </div>

          {/* Add to Cart & Checkout Buttons (Client Component) */}
          <div className="space-y-3 pt-2">
            <AddToCartButton product={product} />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold py-3.5 px-6 rounded-xl text-sm transition"
            >
              <span>Chat With Technician on WhatsApp ({CONTACT.whatsapp})</span>
            </a>

            <div className="text-center">
              <Link
                href="/finance/"
                className="text-xs text-stone-400 hover:text-white underline font-mono inline-flex items-center gap-1"
              >
                <span>Need tailored station asset finance? Use our Finance Calculator</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Full Specifications Table */}
          {product.specs && (
            <div className="pt-6 border-t border-[#23272E] space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                Technical Specifications &amp; Build Details
              </h3>
              <div className="divide-y divide-[#23272E] border border-[#2B2F36] rounded-xl overflow-hidden bg-[#141619] text-xs font-mono">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-1">
                    <span className="text-stone-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-stone-100 font-semibold sm:text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="pt-12 border-t border-[#23272E] space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                {relatedHeading}
              </h2>
              {relatedBlurb && (
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
                  {relatedBlurb}
                </p>
              )}
            </div>
            <Link href="/shop/" className="shrink-0 text-xs font-bold text-[#C87D55] hover:text-white">
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/shop/${item.category}/${item.slug}/`}
                className="bg-[#17191C] border border-[#2B2F36] rounded-xl overflow-hidden hover:border-[#8C4A2F] transition p-4 space-y-3 group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
                  <SmartImage
                    src={item.images?.[0]}
                    alt={item.name}
                    fill
                    fit="contain"
                    className="p-3"
                    sizes="(max-width: 640px) 45vw, 22vw"
                  />
                  {!item.isBike && (
                    <span className="absolute top-2 left-2 bg-emerald-600/95 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wide shadow">
                      −5% with a bike
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#C87D55] transition truncate">
                  {item.name}
                </h3>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-amber-400 font-bold">${item.price.toLocaleString()} AUD</span>
                  <span className="text-[#C87D55]">View &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Common Questions — generic per-product FAQ, see productFaq above */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
          Common Questions
        </h2>
        <div className="max-w-3xl">
          <FaqAccordion items={productFaq} />
        </div>
      </div>
    </div>
  );
}
