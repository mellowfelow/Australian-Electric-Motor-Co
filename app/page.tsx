import React from 'react';
import Link from 'next/link';
import { SmartImage } from '@/components/SmartImage';
import { JsonLd } from '@/components/JsonLd';
import { ProductCard } from '@/components/ProductCard';
import { ReviewSlider } from '@/components/ReviewSlider';
import { HeroSlider } from '@/components/HeroSlider';
import { FaqAccordion } from '@/components/FaqAccordion';
import {
  SITE,
  BRAND,
  CATEGORIES,
  PRODUCTS,
  POSTS,
  FAQ,
  FAQ_SPEAKABLE_IDX,
  TRUSTPILOT_DATA,
  CONTACT,
} from '@/config/site';
import { buildFaqSchema } from '@/lib/faq';

export const metadata = {
  title: 'Electric Dirt Bikes Australia | Australian Electric Motor Co',
  description:
    'Electric dirt bike & e-dirt bike range for adults, kids & farms: motocross, enduro, road-legal, 2-year warranty, fast AU crate delivery, 10% off with crypto.',
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Australian Electric Motor Co',
    title: 'Electric Dirt Bikes Australia | Australian Electric Motor Co',
    description:
      'Electric dirt bike & e-dirt bike range for adults, kids & farms: motocross, enduro, road-legal, 2-year warranty, fast AU crate delivery, 10% off with crypto.',
    url: `https://${SITE.domain}/`,
    images: [{ url: '/images/home/hero-1.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electric Dirt Bikes Australia | Australian Electric Motor Co',
    description:
      'Electric dirt bike & e-dirt bike range for adults, kids & farms: motocross, enduro, road-legal, 2-year warranty, fast AU crate delivery, 10% off with crypto.',
    images: ['/images/home/hero-1.webp'],
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

/* ------------------------------------------------------------------ *
 * Shared layout primitives — one container width, one header pattern,
 * one vertical rhythm. Every section on the page flows through these
 * so the homepage reads as a single, centered, uniform system.
 * ------------------------------------------------------------------ */

const CONTAINER = 'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8';

function Section({
  children,
  tinted = false,
  bare = false,
  className = '',
}: {
  children: React.ReactNode;
  tinted?: boolean;
  bare?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`py-16 sm:py-24 ${tinted ? 'bg-[#121417] border-y border-[#1E2228]' : 'bg-[#0f1012]'} ${className}`}
    >
      {bare ? children : <div className={CONTAINER}>{children}</div>}
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C87D55]">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base">
          {intro}
        </p>
      )}
    </div>
  );
}

function CtaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="mt-12 text-center">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-xl border border-[#2B2F36] bg-[#17191C] px-6 py-3 text-sm font-bold text-stone-100 transition-colors hover:border-[#8C4A2F] hover:text-[#C87D55]"
      >
        <span>{children}</span>
        <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
      </Link>
    </div>
  );
}

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const recentPosts = POSTS.slice(0, 3);

  const homepageCategorySlugs = [
    'adult-electric-dirt-bikes',
    'kids-youth-electric-dirt-bikes',
    'trail-mid-weight-enduro',
    'full-size-motocross',
    'adr-road-legal-dirt-bikes',
    'utility-farm-e-bikes',
    'accessories',
  ];

  const homepageCategories = homepageCategorySlugs
    .map((slug) => CATEGORIES.find((cat) => cat.slug === slug))
    .filter(Boolean) as (typeof CATEGORIES)[number][];

  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': ['Store', 'Organization', 'BikeStore'],
      name: SITE.name,
      url: `https://${SITE.domain}/`,
      description:
        "Australia's premier destination to buy an electric dirt bike, performance 72V batteries, and off-road riding gear.",
      currenciesAccepted: 'AUD',
      paymentAccepted: 'Direct Bank Transfer, PayID, Cryptocurrency (BTC/USDT), Pay in 4',
      priceRange: '$$',
      taxID: 'ABN 97 628 671 689',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'NSW',
        addressCountry: 'AU',
      },
      foundingDate: BRAND.foundingYear,
      foundingLocation: {
        '@type': 'Place',
        name: BRAND.foundingLocation,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Australia',
      },
      numberOfItems: PRODUCTS.length,
      knowsAbout: [
        'Electric dirt bikes',
        'Electric motocross bikes',
        '72V lithium battery systems',
        'Off-road riding gear',
        'Road-legal (ADR) electric motorcycles',
      ],
      sameAs: BRAND.sameAs,
      brand: {
        '@type': 'Brand',
        name: SITE.name,
      },
      logo: `https://${SITE.domain}/icon.svg`,
      telephone: CONTACT.phone,
      makesOffer: {
        '@type': 'AggregateOffer',
        priceCurrency: 'AUD',
        lowPrice: String(Math.min(...PRODUCTS.map((p: any) => p.price))),
        highPrice: String(Math.max(...PRODUCTS.map((p: any) => p.price))),
        offerCount: String(PRODUCTS.length),
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: TRUSTPILOT_DATA.score,
        reviewCount: String(TRUSTPILOT_DATA.totalReviewsCount),
        bestRating: '5',
        worstRating: '1',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `https://${SITE.domain}/search/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    buildFaqSchema(FAQ, FAQ_SPEAKABLE_IDX),
  ];

  return (
    <div>
      <JsonLd data={jsonLdData} />

      {/* ============================================================ *
       * HERO — rotating 4-image slider, content centered over it
       * ============================================================ */}
      <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden border-b border-[#23272E] bg-[#101214] sm:min-h-[85vh]">
        <HeroSlider
          images={[
            { src: '/images/home/hero-1.webp', alt: 'Australian Electric Motor Co electric dirt bike on Australian outback singletrack' },
            { src: '/images/home/hero-2.webp', alt: 'Motocross rider in full protective gear jumping a dirt bike over an outback track' },
            { src: '/images/home/hero-3.webp', alt: 'Close-up of a rider on a dirt bike at the crest of a dirt berm, wearing MX boots and gear' },
            { src: '/images/home/hero-4.webp', alt: 'Two riders on dirt bikes on an Australian bush trail, one gesturing ahead' },
          ]}
        />

        <div className={`relative z-10 ${CONTAINER} py-14 text-center sm:py-28`}>
          <div className="mx-auto max-w-3xl space-y-6 [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] sm:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8C4A2F]/50 bg-[#1D2024]/90 px-3.5 py-1.5 font-mono text-xs text-[#C87D55] backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span>AUSTRALIA&apos;S E-MOTO SUPERSTORE &bull; 60V, 72V &amp; 360V PLATFORMS</span>
            </div>

            <h1 className="text-4xl font-black uppercase leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Premium Electric Dirt Bike{' '}
              <span className="bg-gradient-to-r from-amber-400 via-[#C87D55] to-[#8C4A2F] bg-clip-text text-transparent">
                Range in Australia
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">
              From full-power 72V adult machines to entry-level kids mini-motos — top brands, fast
              nationwide shipping and local NSW warranty.
              <span className="hidden sm:inline">
                {' '}Engineered for rugged Australian trails, tracks and off-road exploration.
              </span>
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
              <Link
                href="/shop/"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#8C4A2F] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#8C4A2F]/20 transition-colors hover:bg-[#A35839] sm:w-auto"
              >
                <span>Explore E-Dirt Bikes</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                href="/compare/"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2B2F36] bg-[#1D2024] px-8 py-4 text-base font-bold text-stone-200 transition-colors hover:bg-[#252930] sm:w-auto"
              >
                <span>Compare Specs &amp; Models</span>
              </Link>
            </div>

            <div className="mx-auto hidden max-w-3xl grid-cols-2 gap-4 border-t border-[#23272E]/60 pt-8 text-center font-mono sm:grid sm:grid-cols-4">
              {[
                { label: 'Peak Power', value: '22,000 W', accent: 'text-amber-400' },
                { label: 'Instant Torque', value: '540 Nm', accent: 'text-white' },
                { label: 'Single Charge', value: '110 km Range', accent: 'text-white' },
                { label: 'AU Warranty', value: '2-Year Full', accent: 'text-emerald-400' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-[#23272E] bg-[#17191C]/80 p-3"
                >
                  <div className="text-xs text-stone-400">{stat.label}</div>
                  <div className={`text-lg font-bold ${stat.accent}`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ *
       * SHOP BY CATEGORY
       * ============================================================ */}
      <Section>
        <SectionHeader
          eyebrow="Engineered Lineup & Gear"
          title="Shop by Category"
          intro="Every department in one place — full-size motocross, trail enduro, youth e-motos, road-legal machines, farm workhorses and the gear that backs them up."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homepageCategories.map((cat) => {
            const isAccessories = cat.slug === 'accessories';
            const unitLabel = isAccessories ? 'Items' : 'Models';

            return (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}/`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#2B2F36] bg-[#17191C] transition-all hover:border-[#8C4A2F] hover:shadow-xl hover:shadow-black/50"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <SmartImage
                    src={cat.image}
                    alt={`${cat.name} — electric dirt bike department`}
                    aspectRatio="4/3"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17191C] via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-3 left-3 rounded bg-[#8C4A2F] px-2.5 py-0.5 font-mono text-[11px] font-bold text-white shadow">
                    {cat.count} {unitLabel}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between space-y-2 p-5">
                  <div>
                    <h3 className="text-base font-bold text-white transition-colors group-hover:text-[#C87D55]">
                      {cat.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-400">
                      {cat.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 pt-2 text-xs font-bold uppercase tracking-wider text-[#C87D55] transition-colors group-hover:text-white">
                    <span>{isAccessories ? 'Explore Accessories' : 'Browse E-Bikes'}</span>
                    <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <CtaLink href="/shop/">View the Complete 75+ Model Lineup</CtaLink>
      </Section>

      {/* ============================================================ *
       * FEATURED ELECTRIC DIRT BIKES
       * ============================================================ */}
      <Section tinted>
        <SectionHeader
          eyebrow="Ready for Immediate Dispatch"
          title="Featured Electric Dirt Bikes"
          intro="Hand-picked machines in stock now — every price GST inclusive, with a 10% crypto discount (BTC/USDT) and Pay in 4 available at checkout."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <CtaLink href="/shop/">Shop All Inventory</CtaLink>
      </Section>

      {/* ============================================================ *
       * RIDER REVIEWS — Trustpilot-style review grid (self-contained)
       * ============================================================ */}
      <Section bare>
        <ReviewSlider />
      </Section>

      {/* ============================================================ *
       * BRAND AUTHORITY — About Australian Electric Motor Co
       * ============================================================ */}
      <Section tinted>
        <SectionHeader
          eyebrow={`Australian Moto Engineering Since ${BRAND.foundingYear} • ABN ${SITE.abn}`}
          title="Engineered for Australia. Tuned for Raw Performance."
          intro={BRAND.description}
        />

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {BRAND.differentiation.map((diff, idx) => (
            <div
              key={idx}
              className="space-y-1.5 rounded-2xl border border-[#2B2F36] bg-[#17191C] p-5 text-center sm:text-left"
            >
              <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#C87D55] sm:justify-start">
                <span aria-hidden="true">⚡</span>
                <span>Engineering Benchmark #{idx + 1}</span>
              </div>
              <p className="text-xs leading-relaxed text-stone-400">{diff}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/about/"
            className="rounded-xl bg-[#8C4A2F] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#A35839]"
          >
            Read Our Company Story &rarr;
          </Link>
          <Link
            href="/contact/"
            className="rounded-xl border border-[#2B2F36] bg-[#17191C] px-6 py-3 text-sm font-bold text-stone-200 transition-colors hover:border-[#8C4A2F]"
          >
            Book an NSW Test Ride &amp; Consultation
          </Link>
        </div>
      </Section>

      {/* ============================================================ *
       * MODEL COMPARISON TEASER
       * ============================================================ */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#23272E] bg-[#141619] p-8 text-center sm:p-12">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C87D55]">
            Side-by-Side Specs
          </span>
          <h2 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
            Need Help Choosing Your E-Dirt Bike?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-400">
            Compare peak kilowatts, battery capacities, total vehicle weights, suspension travel and
            outback trail ranges across our entire fleet.
          </p>
          <div className="mt-8">
            <Link
              href="/compare/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#8C4A2F] px-8 py-4 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#A35839]"
            >
              <span>Launch Full Comparison Matrix</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </Section>

      {/* ============================================================ *
       * BLOG — Bush Tech & Outpost Insights
       * ============================================================ */}
      <Section tinted>
        <SectionHeader
          eyebrow="Field Reports & Tech Guides"
          title="Bush Tech & Outpost Insights"
          intro="Technical guides, battery and charging know-how, and outback trail testing from our NSW workshop."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#2B2F36] bg-[#17191C] transition-all hover:border-[#8C4A2F] hover:shadow-xl hover:shadow-black/50"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <SmartImage
                  src={post.image}
                  alt={post.title}
                  aspectRatio="4/3"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded bg-[#17191C]/90 px-2.5 py-1 font-mono text-[10px] font-bold text-[#C87D55]">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between space-y-3 p-6">
                <div className="space-y-2">
                  <div className="font-mono text-[11px] text-stone-400">
                    {post.date} • {post.readTime}
                  </div>
                  <h3 className="line-clamp-2 text-base font-bold text-white transition-colors group-hover:text-[#C87D55]">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-stone-400">
                    {post.excerpt}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 pt-2 text-xs font-bold text-[#C87D55]">
                  <span>Read Article</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <CtaLink href="/blog/">Read All Articles</CtaLink>
      </Section>

      {/* ============================================================ *
       * FAQ — direct-answer, FAQPage schema
       * ============================================================ */}
      <Section>
        <SectionHeader
          eyebrow="Rider Knowledge Base"
          title="Frequently Asked Questions"
          intro="Direct, factual answers on battery longevity, top speeds, Australian off-road compliance and logistics."
        />

        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={FAQ} />
        </div>

        <CtaLink href="/faq/">Read All Rider &amp; Logistics FAQs</CtaLink>
      </Section>
    </div>
  );
}
