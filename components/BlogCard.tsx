import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/wordpress";
import { Badge } from "./Badge";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const date = new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium" }).format(new Date(post.date));
  const category = post.categories[0]?.name ?? "Blog";

  return (
    <article className="card-glass soft-lift group rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-card">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] bg-navy-gradient">
          {post.featuredImage ? (
            <Image src={post.featuredImage} alt={post.featuredImageAlt ?? post.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Image src="/sygnet.svg" alt="" width={86} height={86} className="opacity-80" />
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="teal">{category}</Badge>
          <time dateTime={post.date} className="text-xs font-semibold text-slate-500">
            {date}
          </time>
        </div>
        <h3 className="mt-4 text-xl font-black tracking-tight text-navy">
          <Link href={`/blog/${post.slug}`} className="transition hover:text-electric">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="arrow-link mt-5 inline-flex text-sm font-bold text-electric transition group-hover:text-teal">
          Czytaj więcej →
        </Link>
      </div>
    </article>
  );
}
