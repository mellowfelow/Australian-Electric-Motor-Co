import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo';
import { SITE } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
    { '@type': 'ListItem', position: 2, name: 'Pay in 4 & Finance', item: `https://${SITE.domain}/finance/` },
  ],
};

// finance/page.tsx is a Client Component — this server layout supplies its
// metadata so it doesn't inherit the shared root default title.
export const metadata: Metadata = withOpenGraph({
  title: 'Electric Dirt Bike Finance & Pay in 4 | AEMC',
  description:
    'Pay in 4 — four fortnightly instalments at 0% interest — plus asset finance on electric dirt bikes in Australia. Model your repayments in seconds.',
  alternates: { canonical: `https://${SITE.domain}/finance/` },
  other: { 'og:updated_time': new Date().toISOString() },
}, '/finance/');

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  );
}
