import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Frontmatter {
  title: string;
  date?: string;
  description?: string;
}

type Props = {
  params: {
    slug: string;
  };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'mdx', `${params.slug}.mdx`);
  let source: string;
  try {
    source = await fs.readFile(filePath, 'utf8');
  } catch (err) {
    return {
      title: 'Not Found',
    };
  }

  const { frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}
export default async function ArticlePage({ params }: any) {
  const { slug } = params;

  const filePath = path.join(process.cwd(), 'mdx', `${slug}.mdx`);

  let source: string;
  try {
    source = await fs.readFile(filePath, 'utf8');
  } catch (err) {
    return notFound();
  }

  type MDXResult = {
    content: React.ReactNode;
    frontmatter: Frontmatter;
  };

  const result: MDXResult = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  const { content, frontmatter } = result;

  return (
    <article className='prose prose-neutral max-w-prose mx-auto py-8'>
      <h1>{frontmatter.title}</h1>
      <div className='prose prose-emerald'>{content}</div>
    </article>
  );
}

// Generate static params for SSG at build time
export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), 'mdx'));

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''),
    }));
}
