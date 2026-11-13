import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { SubcategoryCards } from '@/components/SubcategoryCards';
import { CategoryProductGrid } from '@/app/shop/[category]/CategoryProductGrid';
import { CATEGORIES, PRODUCTS, SITE, getShopCategoryNav } from '@/config/site';

export const metadata: Metadata = {
  title: 'Electric Dirt Bikes For Sale | Parts & Gear | AEMC',
  description:
    'Electric dirt bikes for sale across Australia, plus batteries, chargers, upgrades, riding gear and accessories — filter by brand, price and road-legal status.',
  alternates: { canonical: `https://${SITE.domain}/shop/` },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: 'Electric Dirt Bikes For Sale | Parts & Gear | AEMC',
    description:
      'The complete Australian Electric Motor Co catalogue — electric dirt bikes for sale, batteries, chargers, upgrades, riding gear and accessories.',
    url: `https://${SITE.domain}/shop/`,
    images: [{ url: '/images/home/hero-2.webp' }],
  },
  other: { 'og:updated_time': new Date().toISOString() },
};

export default function ShopPage() {
  const categoryNav = getShopCategoryNav();

  const departmentCards = [
    { slug: 'electric-dirt-bikes', name: 'Electric Dirt Bikes' },
    { slug: 'parts-upgrades', name: 'Parts & Upgrades' },
    { slug: 'riding-gear', name: 'Riding Gear' },
    { slug: 'accessories', name: 'Accessories' },
    { slug: 'brands', name: 'Shop by Brand' },
  ]
    .map((d) => {
      const c = CATEGORIES.find((x) => x.slug === d.slug);
      const count =
        d.slug === 'brands'
          ? CATEGORIES.filter((x) => x.section === 'brands' && x.parent === 'brands').length
          : PRODUCTS.filter(
              (p: any) => p.category === d.slug || p.parentCategories?.includes(d.slug),
            ).length;
      return { slug: d.slug, name: d.name, description: c?.description, image: c?.image, count };
    })
    .filter((d) => d.count > 0);

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `https://${SITE.domain}/shop/` },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <JsonLd data={breadcrumbsSchema} />

      <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-stone-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <span className="text-[#C87D55]">Shop</span>
      </nav>

      <div className="relative overflow-hidden rounded-3xl border border-[#2B2F36] bg-[#17191C] p-8 sm:p-12">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C87D55]">
            The Complete Catalogue
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Electric Dirt Bikes For Sale
          </h1>
          <p className="text-base leading-relaxed text-stone-300">
            Every electric dirt bike we have for sale in Australia, plus batteries, chargers,
            upgrades and riding gear, in one place. Jump to a department below, or use the filters to
            narrow by category, brand, price and road-legal status.
          </p>
          <div className="pt-1 font-mono text-xs text-emerald-400">
            • {PRODUCTS.length} products • NSW dispatch • GST inclusive
          </div>
        </div>
      </div>

      <section className="space-y-5">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">Shop by department</h2>
        <SubcategoryCards items={departmentCards} variant="compact" />
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">Browse the full range</h2>
        <CategoryProductGrid
          initialProducts={PRODUCTS as any}
          categorySlug="all"
          categoryName="the full range"
          categoryNav={categoryNav}
        />
      </section>
    </div>
  );
}
