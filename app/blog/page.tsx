import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { WordPressPostGrid } from "@/components/WordPressPostGrid";
import { getAllPosts, getCategories, getPostsByCategory } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artykuły dealshare pobierane z WordPress REST API."
};

type BlogPageProps = {
  searchParams?: {
    category?: string;
  };
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === searchParams?.category);
  const posts = category ? await getPostsByCategory(category.id) : await getAllPosts();

  return (
    <main>
      <section className="bg-navy-gradient py-20 text-white">
        <Container>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">Blog</p>
          <h1 className="heading-title-enter mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">Wiedza i kontekst dla decyzji B2B.</h1>
          <p className="heading-copy-enter mt-6 max-w-2xl text-lg leading-8 text-white/74">
            Lista wpisów jest pobierana z WordPressa przez REST API, a frontend pozostaje częścią aplikacji Next.js.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeading title="Kategorie" description="Jeśli WordPress zwróci kategorie, pojawią się jako filtry prowadzące do przefiltrowanej listy wpisów." />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className={`soft-lift rounded-md border px-4 py-2 text-sm font-bold transition ${!category ? "border-electric bg-electric text-white" : "border-slate-200 bg-white text-navy hover:border-electric hover:bg-electric/5"}`}
            >
              Wszystkie
            </Link>
            {categories.map((item) => (
              <Link
                key={item.id}
                href={`/blog?category=${item.slug}`}
                className={`soft-lift rounded-md border px-4 py-2 text-sm font-bold transition ${category?.id === item.id ? "border-electric bg-electric text-white" : "border-slate-200 bg-white text-navy hover:border-electric hover:bg-electric/5"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow={category?.name ?? "Wszystkie wpisy"} title="Artykuły" />
          <div className="mt-8">
            <WordPressPostGrid posts={posts} />
          </div>
        </Container>
      </section>

      <CTASection title="Szukasz konkretnych możliwości dla firmy?" buttonLabel="Zobacz oferty" buttonHref="/oferty" />
    </main>
  );
}
