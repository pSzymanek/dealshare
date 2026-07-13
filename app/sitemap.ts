import type { MetadataRoute } from "next";
import { offers } from "@/lib/offers";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/oferty",
  "/umowy-na-energie",
  "/sankcja-kredytu-darmowego",
  "/moc-obliczeniowa",
  "/o-nas",
  "/kontakt",
  "/blog",
  "/polityka-prywatnosci",
  "/regulamin"
];

const weekly = "weekly" as const;
const monthly = "monthly" as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/oferty" ? weekly : monthly,
    priority: route === "" ? 1 : route === "/oferty" ? 0.9 : 0.6
  }));

  const offerPages = offers.map((offer) => ({
    url: `${siteConfig.url}/oferty/${offer.slug}`,
    lastModified: now,
    changeFrequency: monthly,
    priority: 0.8
  }));

  return [...pages, ...offerPages];
}
