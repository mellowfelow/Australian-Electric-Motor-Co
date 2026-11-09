import React from 'react';
import { withOpenGraph } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { FaqAccordion } from '@/components/FaqAccordion';
import { FAQ, FAQ_FULL_BANK, SITE } from '@/config/site';
import { buildFaqSchema } from '@/lib/faq';
import { waLink } from '@/lib/whatsapp';

export const metadata: Metadata = withOpenGraph({
  title: 'Electric Dirt Bike FAQ | Australia | AEMC',
  description: 'Answers on electric dirt bike cost, road-legal rules, kids and balance bikes, charging, warranty and payment options — from Australian Electric Motor Co.',
  alternates: {
    canonical: `https://${SITE.domain}/faq/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
}, '/faq/');

export default function FAQPage() {
  // The full bank (all themes flattened) feeds the FAQPage schema, so every
  // question visible on the page is represented in structured data — the
  // homepage's 8-question FAQ is a subset of good-to-know basics; this page
  // is the complete, themed reference.
  const allBankItems = FAQ_FULL_BANK.flatMap((section) => section.items);

  const faqSchema = [
    buildFaqSchema([...FAQ, ...allBankItems]),
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
          name: 'FAQ',
          item: `https://${SITE.domain}/faq/`,
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <JsonLd data={faqSchema} />

      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-400 font-mono flex items-center gap-2">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <span className="text-[#C87D55]">FAQ</span>
      </nav>

      {/* Header with Single H1 */}
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C87D55] font-mono">
          Rider Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
          Everything you need to know about our Australian-engineered electric dirt bikes, battery longevity, off-grid charging, and national crate shipping.
        </p>
      </div>

      {/* Quick Answers — the same 8 highest-impact questions as the homepage */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
          Quick Answers
        </h2>
        <FaqAccordion items={FAQ} idPrefix="quick" />
      </div>

      {/* Full themed bank — every real question extracted from the keyword exports, see docs/faq-bank.md */}
      {FAQ_FULL_BANK.map((section) => (
        <div key={section.theme} className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
            {section.theme}
          </h2>
          <FaqAccordion items={section.items} idPrefix={section.theme.toLowerCase().replace(/[^a-z0-9]+/g, '-')} />
        </div>
      ))}

      {/* Still have questions CTA */}
      <div className="bg-[#141619] border border-[#2B2F36] rounded-3xl p-8 sm:p-10 text-center space-y-4">
        <h3 className="text-xl font-bold uppercase text-white tracking-tight">
          Still Have Technical Questions?
        </h3>
        <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto leading-relaxed">
          Our NSW technicians are available Monday through Saturday to discuss suspension tuning, battery upgrades, or booking a private test ride.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <a
            href={waLink('I have a question about suspension tuning or battery upgrades.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg"
          >
            Chat on WhatsApp &rarr;
          </a>
          <Link
            href="/contact/"
            className="bg-[#1D2024] hover:bg-[#25282E] text-stone-200 border border-[#2B2F36] px-6 py-3 rounded-xl text-xs font-bold transition"
          >
            Send Workshop Message
          </Link>
        </div>
      </div>
    </div>
  );
}
