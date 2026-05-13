export type OfferCategory = {
  slug: string;
  name: string;
  description: string;
  accent: "blue" | "teal" | "cyan";
};

export const offerCategories: OfferCategory[] = [
  {
    slug: "finansowanie",
    name: "Finansowanie",
    description: "Dostęp do rozwiązań wspierających płynność, rozwój i realizację projektów.",
    accent: "blue"
  },
  {
    slug: "kontrakty-b2b",
    name: "Kontrakty B2B",
    description: "Wybrane zapytania, współprace i możliwości sprzedażowe dla firm.",
    accent: "teal"
  },
  {
    slug: "obsluga-firm",
    name: "Obsługa firm",
    description: "Partnerzy wspierający procesy operacyjne, prawne, księgowe i administracyjne.",
    accent: "cyan"
  },
  {
    slug: "technologie",
    name: "Rozwiązania technologiczne",
    description: "Narzędzia SaaS, automatyzacje i wdrożenia podnoszące efektywność organizacji.",
    accent: "blue"
  },
  {
    slug: "energia",
    name: "Energia i optymalizacja kosztów",
    description: "Usługi i partnerstwa pomagające analizować oraz porządkować koszty firmowe.",
    accent: "teal"
  },
  {
    slug: "doradztwo",
    name: "Doradztwo biznesowe",
    description: "Wsparcie eksperckie w rozwoju, partnerstwach i decyzjach operacyjnych.",
    accent: "cyan"
  }
];
