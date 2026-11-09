import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo';
import { SITE } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `https://${SITE.domain}/contact/` },
  ],
};

// contact/page.tsx is a Client Component and can't export metadata itself —
// this server layout supplies its title/description so it no longer falls
// back to the shared root default (which was over-length and identical
// across contact/finance/wholesale/search).
export const metadata: Metadata = withOpenGraph({
  title: 'Contact & Workshop Support | AEMC',
  description:
    'Get in touch with Australian Electric Motor Co — WhatsApp, email or the enquiry form for advice on electric dirt bikes, parts, warranty and NSW workshop support.',
  alternates: { canonical: `https://${SITE.domain}/contact/` },
  other: { 'og:updated_time': new Date().toISOString() },
}, '/contact/');

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  );
}
