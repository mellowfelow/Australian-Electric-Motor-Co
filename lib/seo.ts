/**
 * Shared title/description builders — keep every generated <title> in the
 * ~50-60 char band and every meta description free of a stray "..." when
 * the source text was never actually truncated.
 */

import type { Metadata } from 'next';
import { PRODUCTS, SITE } from '@/config/site';

const BRAND_FULL = 'Australian Electric Motor Co';
const BRAND_SHORT = 'AEMC';
const TITLE_MAX = 60;

/**
 * `{name} | Australian Electric Motor Co`, falling back to the short brand
 * (`AEMC`) and finally the bare name, whichever first fits the 60-char band.
 */
export function buildSeoTitle(name: string): string {
  const full = `${name} | ${BRAND_FULL}`;
  if (full.length <= TITLE_MAX) return full;
  const short = `${name} | ${BRAND_SHORT}`;
  if (short.length <= TITLE_MAX) return short;
  if (name.length <= TITLE_MAX) return name;
  // Even the bare name is over the band — trim to the last whole word that
  // fits, dropping any trailing connective/punctuation. No ellipsis: a title
  // is a label, not a sentence.
  const cut = name.slice(0, TITLE_MAX);
  const lastSpace = cut.lastIndexOf(' ');
  return cut
    .slice(0, lastSpace > 40 ? lastSpace : TITLE_MAX)
    .replace(/[\s—–:,;&-]+$/, '')
    .replace(/\s+(and|or|the|a|for|to|of|with|vs)$/i, '');
}

/** Truncate to `max` chars on a word boundary — only appends an ellipsis when it actually cut something. */
export function truncateDescription(text: string, max = 155): string {
  const clean = (text || '').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[.,;:\s]+$/, '')}…`;
}

/**
 * Adds page-specific openGraph + twitter blocks to a route's metadata. Without
 * them a route inherits the root layout's homepage og:title / og:description /
 * og:url, so social previews and og:url all point at the homepage.
 */
export function withOpenGraph(meta: Metadata & { title: string; description: string }, path: string): Metadata {
  const image = { url: '/images/home/hero-1.webp', width: 1200, height: 800, alt: SITE.name };
  return {
    ...meta,
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: 'en_AU',
      title: meta.title,
      description: meta.description,
      url: `https://${SITE.domain}${path}`,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [image.url],
    },
  };
}

/**
 * True when the category listing would show at least one product — mirrors the
 * filter in app/shop/[category]/page.tsx. Empty categories are kept out of the
 * sitemap and marked noindex so they aren't indexed as thin pages.
 */
export function categoryHasProducts(category: { slug: string }): boolean {
  const slug = category.slug;
  if (slug === 'brands') return true;
  return PRODUCTS.some(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (p: any) =>
      p.category === slug ||
      p.brand === slug ||
      (Array.isArray(p.parentCategories) && p.parentCategories.includes(slug)) ||
      (slug === 'adult-electric-dirt-bikes' && (p.category === 'full-size-motocross' || p.category === 'trail-mid-weight-enduro')) ||
      (slug === 'kids-youth-electric-dirt-bikes' && (p.category === 'junior-trials-youth-dirt-bikes' || p.category === 'balance-mini-bikes')),
  );
}
