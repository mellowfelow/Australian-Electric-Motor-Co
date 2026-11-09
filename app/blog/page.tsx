import React from 'react';
import { withOpenGraph } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SmartImage } from '@/components/SmartImage';
import { JsonLd } from '@/components/JsonLd';
import { POSTS, SITE } from '@/config/site';

export const metadata: Metadata = withOpenGraph({
  title: 'Electric Dirt Bike Guides & Trail Tech | AEMC',
  description: 'Buying guides, battery and charging explainers, gear advice and petrol-vs-electric comparisons for electric dirt bike riders in Australia.',
  alternates: {
    canonical: `https://${SITE.domain}/blog/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
}, '/blog/');

export default function BlogIndexPage() {
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
        name: 'Trail Tech Blog',
        item: `https://${SITE.domain}/blog/`,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd data={breadcrumbsSchema} />

      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-400 font-mono flex items-center gap-2">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <span className="text-[#C87D55]">Trail Tech Blog</span>
      </nav>

      {/* Header & Single H1 */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C87D55] font-mono">
          Knowledge From The Outback Test Track
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          Trail Tech &amp; E-Moto Guides
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
          Deep dives into high-discharge lithium architectures, off-grid solar charging setups, Australian trail compliance, and electric vs petrol comparisons.
        </p>
      </div>

      {/* Grid of articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="bg-[#17191C] border border-[#2B2F36] rounded-2xl overflow-hidden hover:border-[#8C4A2F] transition-all flex flex-col group"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-black">
              <SmartImage
                src={post.image}
                alt={post.title}
                aspectRatio="4/3"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#C87D55] font-bold">{post.category}</span>
                  <span className="text-stone-400">{post.readTime}</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-[#C87D55] transition line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div className="pt-2 border-t border-[#23272E] flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">{post.date}</span>
                <span className="text-[#C87D55] font-bold">Read Guide &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
