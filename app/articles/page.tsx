// app/articles/page.tsx
import Link from 'next/link';
import { getAllMdxSlugs } from '../lib/utils';

export default function ArticlesPage() {
  const slugs = getAllMdxSlugs();

  return (
    <div className='prose mx-auto p-4'>
      <h1>All Articles</h1>
      <ul>
        {slugs.map((slug) => (
          <li key={slug}>
            <Link href={`/articles/${slug}`}>{slug.replace(/-/g, ' ')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
