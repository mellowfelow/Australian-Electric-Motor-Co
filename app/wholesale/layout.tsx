import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo';
import { SITE } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
    { '@type': 'ListItem', position: 2, name: 'Wholesale & Fleet', item: `https://${SITE.domain}/wholesale/` },
  ],
};

// wholesale/page.tsx is a Client Component — this server layout supplies its
// metadata so it doesn't inherit the shared root default title.
export const metadata: Metadata = withOpenGraph({
  title: 'Electric Dirt Bike Wholesale & Fleet Orders | AEMC',
  description:
    'Wholesale and bulk electric dirt bike orders for dealers, agricultural stations and fleet buyers in Australia. Apply for trade pricing.',
  alternates: { canonical: `https://${SITE.domain}/wholesale/` },
  other: { 'og:updated_time': new Date().toISOString() },
}, '/wholesale/');

export default function WholesaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  );
}
