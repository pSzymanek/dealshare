import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { getPostBySlug } from "@/lib/wordpress";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post?.title ?? "Wpis blogowy",
    description: post?.excerpt ?? "Wpis blogowy dealshare.",
    alternates: {
      canonical: `/blog/${slug}`
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const date = new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(new Date(post.date));
  const category = post.categories[0]?.name ?? "Blog";

  return (
    <main>
      <article>
        <section className="bg-navy-gradient py-20 text-white">
          <Container>
            <Link href="/blog" className="back-link text-sm font-bold text-cyan transition hover:text-white">
              ← Wróć do bloga
            </Link>
            <div className="mt-8 max-w-4xl">
              <Badge tone="teal">{category}</Badge>
              <h1 className="heading-title-enter mt-6 text-4xl font-black tracking-tight sm:text-6xl">{post.title}</h1>
              <time dateTime={post.date} className="heading-copy-enter mt-6 block text-sm font-semibold text-white/66">
                {date}
              </time>
            </div>
          </Container>
        </section>

        {post.featuredImage ? (
          <div className="bg-white">
            <Container className="-mt-10">
              <div className="relative aspect-[16/7] overflow-hidden rounded-lg border border-white shadow-card">
                <Image src={post.featuredImage} alt={post.featuredImageAlt ?? post.title} fill priority sizes="100vw" className="object-cover" />
              </div>
            </Container>
          </div>
        ) : null}

        <section className="bg-white py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </Container>
        </section>
      </article>

      <CTASection title="Chcesz porozmawiać o możliwościach dla firmy?" buttonLabel="Skontaktuj się" buttonHref="/kontakt" />
    </main>
  );
}
