export type WordPressRendered = {
  rendered: string;
};

export type RawWordPressCategory = {
  id: number;
  count: number;
  name: string;
  slug: string;
};

export type RawWordPressPost = {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: WordPressRendered;
  excerpt: WordPressRendered;
  content: WordPressRendered;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
    "wp:term"?: Array<Array<RawWordPressCategory>>;
  };
};

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
};

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  categories: BlogCategory[];
};

const apiUrl = process.env.WORDPRESS_API_URL;
const unavailableMessage = "Wpisy są chwilowo niedostępne.";

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function sanitizeWordPressHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

function mapPost(post: RawWordPressPost): BlogPost {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const terms = post._embedded?.["wp:term"]?.flat() ?? [];

  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    content: sanitizeWordPressHtml(post.content.rendered),
    date: post.date,
    featuredImage: media?.source_url,
    featuredImageAlt: media?.alt_text || stripHtml(post.title.rendered),
    categories: terms.map((term) => ({
      id: term.id,
      name: term.name,
      slug: term.slug
    }))
  };
}

async function wpFetch<T>(path: string): Promise<T | null> {
  if (!apiUrl) {
    return null;
  }

  try {
    const separator = path.includes("?") ? "&" : "?";
    const response = await fetch(`${apiUrl}${path}${separator}_embed=1`, {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await wpFetch<RawWordPressPost[]>(`/posts?per_page=${limit}`);
  return posts?.map(mapPost) ?? [];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await wpFetch<RawWordPressPost[]>("/posts?per_page=12");
  return posts?.map(mapPost) ?? [];
}

export async function getPostsByCategory(categoryId: number): Promise<BlogPost[]> {
  const posts = await wpFetch<RawWordPressPost[]>(`/posts?per_page=12&categories=${categoryId}`);
  return posts?.map(mapPost) ?? [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await wpFetch<RawWordPressPost[]>(`/posts?slug=${slug}`);
  return posts?.[0] ? mapPost(posts[0]) : null;
}

export async function getCategories(): Promise<BlogCategory[]> {
  if (!apiUrl) {
    return [];
  }

  try {
    const response = await fetch(`${apiUrl}/categories?per_page=30`, {
      next: { revalidate: 600 }
    });

    if (!response.ok) {
      return [];
    }

    const categories = (await response.json()) as RawWordPressCategory[];
    return categories
      .filter((category) => category.count > 0)
      .map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug
      }));
  } catch {
    return [];
  }
}

export { unavailableMessage };
