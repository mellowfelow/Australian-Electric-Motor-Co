import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo';
import { SITE } from '@/config/site';

// search/page.tsx is a Client Component — this server layout supplies its
// metadata so it doesn't inherit the shared root default title. Search
// results pages are noindex-friendly but still deserve a correct title.
export const metadata: Metadata = withOpenGraph({
  title: 'Search Electric Dirt Bikes & Parts | AEMC',
  description:
    'Search the Australian Electric Motor Co catalogue — electric dirt bikes, batteries, chargers, upgrades, riding gear and accessories.',
  alternates: { canonical: `https://${SITE.domain}/search/` },
  robots: { index: false, follow: true },
  other: { 'og:updated_time': new Date().toISOString() },
}, '/search/');

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
