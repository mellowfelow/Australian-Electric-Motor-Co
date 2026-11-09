import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { TAXONOMY_SECTIONS, BRAND, CONTACT, SHOP, FINANCE, SITE } from '@/config/site';
import { waLink } from '@/lib/whatsapp';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#101214] border-t border-[#23272E] text-stone-300">
      {/* Upper Trust Strip */}
      <div className="border-b border-[#23272E] py-8 bg-[#141619]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#8C4A2F]/20 border border-[#8C4A2F]/40 flex items-center justify-center text-amber-400 text-2xl flex-shrink-0">
                ⚡
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">72V High-Output</h4>
                <p className="text-xs text-stone-400">Up to 25kW brushless outback power</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#8C4A2F]/20 border border-[#8C4A2F]/40 flex items-center justify-center text-amber-400 text-2xl flex-shrink-0">
                🛡️
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">2-Year AU Warranty</h4>
                <p className="text-xs text-stone-400">Frame, motor &amp; battery covered</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#8C4A2F]/20 border border-[#8C4A2F]/40 flex items-center justify-center text-amber-400 text-2xl flex-shrink-0">
                🪙
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">10% Crypto Discount</h4>
                <p className="text-xs text-stone-400">Save 10% paying via BTC or USDT</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#8C4A2F]/20 border border-[#8C4A2F]/40 flex items-center justify-center text-amber-400 text-2xl flex-shrink-0">
                💳
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Pay in 4 Available</h4>
                <p className="text-xs text-stone-400">4 interest-free fortnightly payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg">
              <Logo variant="footer" />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {BRAND.description}
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1.5 font-mono">
              <p className="text-stone-300 font-semibold uppercase tracking-wider">
                Headquarters &amp; Dispatch Facility
              </p>
              <p>{CONTACT.address}</p>
              <p>
                Email:{' '}
                <a
                  href="mailto:riders&#64;australianelectricmotorco.com.au"
                  className="text-[#C87D55] hover:underline"
                >
                  riders&#64;australianelectricmotorco.com.au
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, '')}`} className="text-stone-200 hover:underline">
                  {CONTACT.phone}
                </a>
              </p>
              <p>
                WhatsApp:{' '}
                <a
                  href={waLink('I have a question about your electric dirt bikes.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  Direct Technician Chat ({CONTACT.whatsapp})
                </a>
              </p>
            </div>
          </div>

          {/* Departments */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Shop Departments
            </h3>
            <ul className="space-y-2 text-sm text-stone-400">
              {TAXONOMY_SECTIONS.map((sec) => (
                <li key={sec.slug}>
                  <Link
                    href={`/shop/${sec.slug}/`}
                    className="hover:text-[#C87D55] transition flex items-center gap-1.5"
                  >
                    <span className="text-xs">{sec.icon}</span>
                    <span>{sec.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop/" className="hover:text-[#C87D55] transition font-semibold text-stone-200 block pt-1">
                  All Products &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Guides */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Tools &amp; Tech
            </h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/finance/" className="hover:text-[#C87D55] transition flex items-center gap-1.5">
                  <span>Pay in 4 Calculator</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold">
                    0%
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/compare/" className="hover:text-[#C87D55] transition">
                  Model Comparison Matrix
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="hover:text-[#C87D55] transition">
                  Bush Tech &amp; Touring Guides
                </Link>
              </li>
              <li>
                <Link href="/faq/" className="hover:text-[#C87D55] transition">
                  Range, Charging &amp; Rego FAQ
                </Link>
              </li>
              <li>
                <Link href="/search/" className="hover:text-[#C87D55] transition">
                  Search Inventory
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/about/" className="hover:text-[#C87D55] transition">
                  About Australian Electric Motor Co
                </Link>
              </li>
              <li>
                <Link href="/wholesale/" className="hover:text-[#C87D55] transition">
                  Wholesale &amp; Fleet Orders
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-[#C87D55] transition">
                  Contact &amp; NSW Workshop
                </Link>
              </li>
              <li>
                <a href="/llms.txt" className="hover:text-[#C87D55] transition font-mono text-xs text-stone-400">
                  llms.txt (Agent Resource)
                </a>
              </li>
              <li>
                <a href="/.well-known/mcp/server-card.json" className="hover:text-[#C87D55] transition font-mono text-xs text-stone-400">
                  MCP Server Card
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Regulatory Notice */}
        <div className="mt-12 pt-8 border-t border-[#23272E] text-xs text-stone-400 space-y-3">
          <p className="leading-relaxed">
            <strong className="text-stone-400">Australian Off-Road &amp; Regulatory Notice:</strong> Australian Electric Motor Co electric dirt bikes are purpose-built high-performance competition off-road motorcycles engineered for private property, pastoral stations, dedicated motocross parks, and sanctioned trails. Unless specifically road-complianced with ADR lighting kits and approved state road registration, electric dirt bikes are not intended for use on public roads. Always wear full AS/NZS-certified motorcycle safety gear. All prices include 10% Australian GST.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1C1F24] text-[11px] font-mono">
            <p>
              &copy; {currentYear} Australian Electric Motor Co Pty Ltd. ABN 97 628 671 689 (
              <a
                href="https://abr.business.gov.au/ABN/View?id=97628671689"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-white underline"
              >
                Verify on ABR
              </a>
              ). Registered for GST (NSW, Australia). All prices GST inclusive.
            </p>
            <div className="flex items-center gap-4">
              <span>Currency: AUD ($ Inc. GST)</span>
              <span>•</span>
              <span className="text-amber-400 font-semibold">10% Crypto Discount Active</span>
              <span>•</span>
              <span>Pay in 4 Available</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
