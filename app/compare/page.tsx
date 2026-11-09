import React from 'react';
import { withOpenGraph } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { CompareTool, type CompareGroup, type CompareItem } from '@/components/CompareTool';
import { PRODUCTS, SHOP, SITE } from '@/config/site';

export const metadata: Metadata = withOpenGraph({
  title: 'Compare Electric Dirt Bikes | Side-by-Side Spec Tool | AEMC',
  description:
    'Compare any two electric dirt bikes side by side — power, top speed, range, battery, weight and price across the full Australian lineup.',
  alternates: {
    canonical: `https://${SITE.domain}/compare/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
}, '/compare/');

const toItem = (p: any): CompareItem => ({
  slug: p.slug,
  name: p.name,
  brandName: p.brandName || p.brand,
  category: p.category,
  subcategoryName: p.subcategoryName,
  price: p.price,
  image: p.images?.[0] || '',
  roadLegal: p.roadLegal,
  // fold useful top-level fields into specs so the matrix can read them
  specs: {
    Voltage: p.voltage,
    Capacity: p.capacity,
    ChargeRate: p.chargeRate,
    Output: p.output,
    ...(p.specs || {}),
  },
});

export default function ComparePage() {
  const bikeItems = PRODUCTS.filter(
    (p: any) => p.isBike && p.specs?.Voltage && p.specs?.TopSpeed,
  ).map(toItem);

  const batteryItems = PRODUCTS.filter((p: any) => p.category === 'high-capacity-batteries').map(toItem);
  const chargerItems = PRODUCTS.filter((p: any) => p.category === 'fast-chargers').map(toItem);

  const groups: CompareGroup[] = [
    {
      id: 'bikes',
      label: 'Electric Dirt Bikes',
      noun: 'Bike',
      items: bikeItems,
      specRows: [
        { label: 'Peak Power', keys: ['PeakPower'], better: 'high' },
        { label: 'Top Speed', keys: ['TopSpeed'], better: 'high' },
        { label: 'Trail Range', keys: ['Range'], better: 'high' },
        { label: 'Battery', keys: ['Battery'] },
        { label: 'Voltage', keys: ['Voltage'], better: 'high' },
        { label: 'Weight', keys: ['Weight'] },
        { label: 'Road Legal', keys: ['RoadLegal'] },
        { label: 'Target Rider', keys: ['TargetAudience'] },
      ],
    },
    {
      id: 'batteries',
      label: 'Batteries',
      noun: 'Battery',
      items: batteryItems,
      specRows: [
        { label: 'Voltage', keys: ['Voltage'], better: 'high' },
        { label: 'Capacity', keys: ['Capacity'], better: 'high' },
        { label: 'Peak Discharge', keys: ['PeakDischarge', 'DischargeRating'], better: 'high' },
        { label: 'Cells', keys: ['Cells', 'CellType', 'CellConfiguration', 'Configuration'] },
        { label: 'BMS', keys: ['BMS'] },
        { label: 'Weight', keys: ['Weight'] },
        { label: 'Fits', keys: ['Fitment'] },
      ],
    },
    {
      id: 'chargers',
      label: 'Chargers',
      noun: 'Charger',
      items: chargerItems,
      specRows: [
        { label: 'Output', keys: ['OutputPower', 'Output'], better: 'high' },
        { label: 'Charge Time', keys: ['ChargingTime', 'ChargeSpeed', 'ChargeTime'] },
        { label: 'Input', keys: ['InputVoltage'] },
        { label: 'Compliance', keys: ['Compliance'] },
        { label: 'Connector', keys: ['Connector'] },
        { label: 'Weight', keys: ['Weight'] },
        { label: 'Fits', keys: ['Fitment'] },
      ],
    },
  ];

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compare Electric Dirt Bikes',
        item: `https://${SITE.domain}/compare/`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <JsonLd data={breadcrumbsSchema} />

      <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-stone-400">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#C87D55]">Compare Models</span>
      </nav>

      <div className="max-w-3xl space-y-4">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C87D55]">
          Interactive Spec Tool
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
          Compare Electric Dirt Bikes
        </h1>
        <p className="text-sm leading-relaxed text-stone-300 sm:text-base">
          Switch between electric dirt bikes, high-capacity batteries and fast chargers, then pick any
          two to see their key specs and price side by side. Change either dropdown at any time to
          compare a different pair.
        </p>
      </div>

      <CompareTool groups={groups} cryptoDiscount={SHOP.cryptoDiscount} />

      <div className="rounded-2xl border border-[#23272E] bg-[#141619] p-6 text-center sm:p-8">
        <h2 className="text-lg font-bold uppercase tracking-tight text-white">
          Not sure which pair to start with?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-stone-400">
          Browse the full catalogue or talk to our NSW workshop for a recommendation based on your
          riding style, rider height and where you ride.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/shop/"
            className="rounded-xl bg-[#8C4A2F] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#A35839]"
          >
            Browse All Models &rarr;
          </Link>
          <Link
            href="/contact/"
            className="rounded-xl border border-[#2B2F36] bg-[#17191C] px-6 py-3 text-sm font-bold text-stone-200 transition-colors hover:border-[#8C4A2F]"
          >
            Ask the Workshop
          </Link>
        </div>
      </div>
    </div>
  );
}
