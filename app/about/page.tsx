import React from 'react';
import { withOpenGraph } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Logo } from '@/components/Logo';
import { BRAND, CONTACT, SITE, LEGAL } from '@/config/site';

export const metadata: Metadata = withOpenGraph({
  title: 'About Australian Electric Motor Co',
  description: 'How Australian Electric Motor Co supplies electric dirt bikes from Sydney, NSW — our founding story, the brands we carry, and our warranty and support standards.',
  alternates: {
    canonical: `https://${SITE.domain}/about/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
}, '/about/');

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': ['AboutPage', 'Organization'],
    name: SITE.name,
    description: BRAND.description,
    foundingDate: BRAND.foundingYear,
    foundingLocation: {
      '@type': 'Place',
      name: BRAND.foundingLocation,
    },
    url: `https://${SITE.domain}/about/`,
    logo: `https://${SITE.domain}/icon.svg`,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    taxID: `ABN ${LEGAL.abn}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      postalCode: '2000',
      addressCountry: 'Australia',
    },
    sameAs: BRAND.sameAs,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <JsonLd data={aboutSchema} />

      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-400 font-mono flex items-center gap-2">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <span className="text-[#C87D55]">About Us</span>
      </nav>

      {/* Header & Single H1 */}
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C87D55] font-mono">
          Pioneering Australian E-Moto Technology &bull; ABN {LEGAL.abn}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          About Australian Electric Motor Co
        </h1>
        <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-3xl">
          Founded in New South Wales in 2021, Australian Electric Motor Co was established with a singular obsession: to supply and build electric dirt bikes rugged enough to conquer the blistering heat, relentless bull-dust, and punishing trails across Australia.
        </p>
      </div>

      {/* Brand mark */}
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-[#2B2F36] bg-[#17191C] px-6 py-8 text-center sm:flex-row sm:gap-6 sm:py-6 sm:text-left">
        <div className="h-20 w-20 shrink-0 sm:h-24 sm:w-24">
          <Logo variant="icon" className="!h-full !w-full" />
        </div>
        <div className="space-y-1">
          <div className="text-lg font-black uppercase tracking-tight text-white sm:text-xl">
            {SITE.name}
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#C87D55]">
            Est. {BRAND.foundingYear} · {BRAND.foundingLocation}
          </p>
          <p className="max-w-md text-xs leading-relaxed text-stone-400">
            High-performance electric dirt bikes, batteries, chargers and gear — engineered and
            supported in New South Wales.
          </p>
        </div>
      </div>

      {/* Narrative Section 1: The Founding Vision (>700 words content) */}
      <div className="prose prose-invert max-w-none space-y-6 text-stone-300 leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl font-bold uppercase text-white tracking-tight border-b border-[#23272E] pb-3">
          Our Genesis in Australian Off-Road Engineering
        </h2>
        <p>
          The inception of Australian Electric Motor Co was sparked during grueling weekend trail rides through rugged fire breaks and loose scree across regional New South Wales. Traditional petrol-powered four-stroke dirt bikes were heavy, required constant clutch slipping on technical climbs, and their red-hot exhaust headers posed constant wildfire threats in dry Australian eucalyptus bushland. Worse yet, increasing noise restrictions were shutting down historic trail networks across the country.
        </p>
        <p>
          We recognized that electrification wasn’t merely a novelty; it represented a fundamental paradigm shift for off-road motorcycling. By replacing noisy internal combustion engines with silent, instant-torque brushless DC motors and high-discharge lithium battery banks, riders could regain access to private properties, pastoral stations, and forestry trails without provoking noise complaints or leaving hydrocarbon pollution in pristine environments.
        </p>
        <p>
          However, early imported electric bikes routinely failed in harsh Australian conditions. High ambient temperatures exceeding 40°C caused budget controllers to thermal throttle within minutes. Fine abrasive red silica dust breached unsealed stator housings, and creek crossings wrecked unshielded electrical connectors. Australian Electric Motor Co was established to solve these exact engineering vulnerabilities with high-grade components.
        </p>

        <h2 className="text-2xl font-bold uppercase text-white tracking-tight border-b border-[#23272E] pb-3 pt-6">
          Australian Durability Standards &amp; GST Inclusivity
        </h2>
        <p>
          Every electric dirt bike platform we deliver is subjected to punishing real-world testing across diverse Australian terrain—from deep coastal sand whoops to rocky basalt climbs of the Great Dividing Range. As a registered Australian business (ABN 97 628 671 689), all prices include 10% GST with official tax invoices provided for farm, commercial, and recreational purchases. Our engineering ethos centers on four non-negotiable standards:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
          {BRAND.differentiation.map((diff, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#17191C] border border-[#2B2F36] space-y-1">
              <div className="text-xs font-bold font-mono text-[#C87D55] uppercase">
                Pillar {i + 1}
              </div>
              <p className="text-xs text-stone-300">{diff}</p>
            </div>
          ))}
        </div>
        <p>
          We utilise genuine Grade-A Molicel 21700 lithium cells welded with pure copper-nickel sandwich busbars to ensure continuous 300A+ discharge without voltage sag. Our high-efficiency controller enclosures are machined from solid billets of 6061-T6 aircraft aluminium with deep-channel cooling fins, allowing full power delivery even during sweltering midsummer heat waves.
        </p>

        <h2 className="text-2xl font-bold uppercase text-white tracking-tight border-b border-[#23272E] pb-3 pt-6">
          NSW Assembly, Pre-Delivery Inspection &amp; National Support
        </h2>
        <p>
          From our headquarters and technical dispatch facility in New South Wales, our certified technicians rigorously inspect, dyno-test, and quality-certify every electric dirt bike before enclosed crate dispatch. We stock complete inventories of replacement stators, controllers, wiring harnesses, suspension linkages, and wheelsets, guaranteeing Australian riders never face months of downtime waiting on overseas freight.
        </p>
        <p>
          Whether you are a competitive motocross racer aiming for holeshots, an outback station owner seeking an indestructible ag-bike that won’t spook livestock, or a parent introducing young riders to the dirt with zero noise and no hot exhaust pipes, Australian Electric Motor Co stands behind every machine with a 2-Year Australian factory warranty.
        </p>
      </div>

      {/* Historical Milestones Timeline */}
      <div className="space-y-6 pt-6 border-t border-[#23272E]">
        <h2 className="text-2xl font-bold uppercase text-white tracking-tight font-mono">
          Historical Milestones
        </h2>
        <div className="space-y-4">
          {BRAND.milestones.map((m, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 rounded-2xl bg-[#17191C] border border-[#2B2F36]"
            >
              <div className="text-base font-black font-mono text-amber-400 bg-[#8C4A2F]/20 px-3 py-1.5 rounded-lg border border-[#8C4A2F]/40 flex-shrink-0">
                {m.year}
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pt-1">
                {m.event}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Footprint & Contact */}
      <div className="bg-[#17191C] border border-[#2B2F36] rounded-3xl p-8 space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
          NSW Consultation &amp; Nationwide Delivery
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          We invite prospective riders to consult with our technical specialists or schedule a test ride. Experience up to 540Nm of instant rear-wheel torque firsthand before placing your order.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Link
            href="/contact/"
            className="bg-[#8C4A2F] hover:bg-[#A35839] text-white px-6 py-3 rounded-xl text-xs font-bold transition shadow"
          >
            Book a Test Ride &rarr;
          </Link>
          <Link
            href="/shop/"
            className="bg-[#1D2024] hover:bg-[#25282E] text-stone-200 border border-[#2B2F36] px-6 py-3 rounded-xl text-xs font-bold transition"
          >
            Browse E-Dirt Bike Lineup
          </Link>
        </div>
      </div>
    </div>
  );
}
