import Link from 'next/link';

interface LinkProduct {
  slug: string;
  name: string;
  category: string;
}

/**
 * Server-rendered text links to every product in a listing. The product grids
 * paginate client-side (16 per page), so products beyond page 1 otherwise have
 * no crawlable link. Renders nothing when everything already fits on one page.
 */
export function AllProductLinks({
  products,
  heading,
  pageSize = 16,
}: {
  products: LinkProduct[];
  heading: string;
  pageSize?: number;
}) {
  if (products.length <= pageSize) return null;
  return (
    <nav aria-label={heading} className="space-y-4">
      <h2 className="text-lg font-bold uppercase text-white tracking-tight">{heading}</h2>
      <ul className="columns-1 sm:columns-2 lg:columns-3 gap-x-8 text-sm text-stone-400 [&>li]:mb-2 [&>li]:break-inside-avoid">
        {products.map((p) => (
          <li key={p.slug}>
            <Link href={`/shop/${p.category}/${p.slug}/`} className="hover:text-[#C87D55] transition">
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
