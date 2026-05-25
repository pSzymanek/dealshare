export type OfferStatus = "Dostępne" | "Nowe" | "Premium";

export type OfferCategoryTag = {
  name: string;
  slug: string;
};

export type Offer = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  categories: OfferCategoryTag[];
  isIndividual?: boolean;
  description: string;
  status: OfferStatus;
  intro: string;
  audience: string[];
  scope: string[];
  process: string[];
  benefits: string[];
};

const categories = {
  financing: { name: "Finansowanie", slug: "finansowanie" },
  investments: { name: "Inwestycje", slug: "inwestycje" },
  contracts: { name: "Kontrakty B2B", slug: "kontrakty-b2b" },
  legal: { name: "Obsługa Prawna", slug: "obsluga-prawna" },
  energy: { name: "Energia i optymalizacja kosztów", slug: "energia" },
  individual: { name: "Inne/Indywidualne", slug: "inne-indywidualne" }
} satisfies Record<string, OfferCategoryTag>;

export const offers: Offer[] = [
  {
    slug: "kredyty-dla-firm",
    title: "Kredyty dla firm",
    category: categories.financing.name,
    categorySlug: categories.financing.slug,
    categories: [categories.financing],
    description: "Finansowanie dla firm planujących rozwój, inwestycje, większe zamówienia albo poprawę płynności.",
    status: "Dostępne",
    intro: "Oferta pomaga firmom uporządkować potrzeby finansowe i przejść do rozmowy z odpowiednim partnerem.",
    audience: ["Firmy z historią sprzedaży", "Przedsiębiorstwa planujące inwestycje", "Zespoły przygotowujące większe kontrakty"],
    scope: ["Wstępna kwalifikacja potrzeb", "Dobór potencjalnych partnerów", "Przekazanie kontekstu i kolejnych kroków"],
    process: ["Krótka rozmowa o sytuacji firmy", "Weryfikacja dopasowania", "Przedstawienie możliwych ścieżek współpracy"],
    benefits: ["Mniej przypadkowych kontaktów", "Lepsze dopasowanie rozmów", "Oszczędność czasu po stronie przedsiębiorcy"]
  },
  {
    slug: "infrastruktura-gpu",
    title: "Infrastruktura GPU",
    category: categories.investments.name,
    categorySlug: categories.investments.slug,
    categories: [categories.investments],
    description: "Możliwości inwestycyjne i partnerskie związane z zapleczem obliczeniowym oraz infrastrukturą GPU.",
    status: "Nowe",
    intro: "Oferta dla firm i partnerów, którzy chcą poznać kontekst inwestycji w infrastrukturę obliczeniową.",
    audience: ["Inwestorzy biznesowi", "Firmy technologiczne", "Partnerzy szukający projektów infrastrukturalnych"],
    scope: ["Opis projektu", "Wstępny kontekst inwestycyjny", "Połączenie z partnerem prowadzącym rozmowę"],
    process: ["Rozpoznanie profilu", "Przekazanie podstawowych informacji", "Umówienie dalszej rozmowy"],
    benefits: ["Szybszy dostęp do kontekstu", "Lepsza kwalifikacja rozmów", "Możliwość poznania niszowego obszaru inwestycji"]
  },
  {
    slug: "farmy-energii",
    title: "Farmy energii",
    category: categories.investments.name,
    categorySlug: categories.investments.slug,
    categories: [categories.investments],
    description: "Projekty i rozmowy inwestycyjne dotyczące farm energii oraz infrastruktury związanej z OZE.",
    status: "Nowe",
    intro: "Oferta porządkuje pierwszy kontakt dla podmiotów zainteresowanych projektami energetycznymi.",
    audience: ["Inwestorzy", "Firmy zainteresowane OZE", "Partnerzy rozwijający projekty energetyczne"],
    scope: ["Wstępna kwalifikacja zainteresowania", "Opis etapu projektu", "Kontakt z odpowiednim partnerem"],
    process: ["Brief potrzeb", "Dopasowanie projektu", "Rozmowa z partnerem"],
    benefits: ["Jasniejszy kontekst projektu", "Mniej rozproszonych rozmów", "Dostęp do wybranych możliwości"]
  },
  {
    slug: "kontrakty-flotowe",
    title: "Kontrakty flotowe",
    category: categories.contracts.name,
    categorySlug: categories.contracts.slug,
    categories: [categories.contracts],
    description: "Możliwości kontraktowe dla firm obsługujących floty, transport, usługi mobilne lub zaplecze operacyjne.",
    status: "Dostępne",
    intro: "Pomagamy uporządkować rozmowy wokół kontraktów flotowych i dopasować strony do konkretnego zapotrzebowania.",
    audience: ["Dostawcy usług B2B", "Firmy flotowe", "Partnerzy szukający kontraktów operacyjnych"],
    scope: ["Opis profilu współpracy", "Kryteria dopasowania", "Przekazanie kontaktu po kwalifikacji"],
    process: ["Analiza oferty", "Określenie oczekiwań", "Połączenie z wybranymi partnerami"],
    benefits: ["Konkretniejsze rozmowy", "Lepsza jakość leadów", "Szybsza ocena potencjału współpracy"]
  },
  {
    slug: "restrukturyzacje",
    title: "Restrukturyzacje",
    category: categories.legal.name,
    categorySlug: categories.legal.slug,
    categories: [categories.legal],
    description: "Kontakt do partnerów wspierających firmy w analizie sytuacji prawnej, zadłużeniowej i organizacyjnej.",
    status: "Dostępne",
    intro: "Oferta kieruje do rozmowy z wyspecjalizowanym partnerem, gdy firma potrzebuje uporządkować trudną sytuację.",
    audience: ["Firmy z presją kosztową", "Przedsiębiorcy szukający opcji naprawczych", "Zarządy MŚP"],
    scope: ["Wstępny opis sytuacji", "Dobór partnera prawnego", "Ustalenie kolejnych kroków rozmowy"],
    process: ["Bezpieczny briefing", "Ocena dopasowania", "Kontakt z partnerem"],
    benefits: ["Szybsze dotarcie do specjalisty", "Porządek w pierwszych krokach", "Mniej przypadkowych konsultacji"]
  },
  {
    slug: "uniewaznienia-kredytow",
    title: "Unieważnienia kredytów",
    category: categories.legal.name,
    categorySlug: categories.legal.slug,
    categories: [categories.legal, categories.individual],
    isIndividual: true,
    description: "Oferta dla osób fizycznych i spraw indywidualnych związanych z analizą możliwości unieważnienia kredytu.",
    status: "Dostępne",
    intro: "To oferta spoza standardowego B2B. Dotyczy spraw indywidualnych i wymaga osobnej kwalifikacji.",
    audience: ["Osoby fizyczne", "Klienci z kredytem wymagającym analizy", "Osoby szukające wyspecjalizowanego partnera prawnego"],
    scope: ["Wstępne zebranie informacji", "Przekazanie sprawy do partnera", "Ustalenie dalszej ścieżki kontaktu"],
    process: ["Krótki opis sprawy", "Weryfikacja podstawowych danych", "Rozmowa z partnerem prawnym"],
    benefits: ["Jasne oznaczenie sprawy indywidualnej", "Kontakt z odpowiednim partnerem", "Sprawniejszy pierwszy krok"]
  },
  {
    slug: "umowy-na-energie",
    title: "Umowy na energię",
    category: categories.energy.name,
    categorySlug: categories.energy.slug,
    categories: [categories.energy],
    description: "Analiza i porządkowanie rozmów dotyczących umów na energię dla firm oraz optymalizacji kosztów.",
    status: "Dostępne",
    intro: "Oferta pomaga firmom szybciej przejść od kosztów energii do rozmowy o możliwych rozwiązaniach.",
    audience: ["Firmy z rosnącymi kosztami energii", "Organizacje wielooddziałowe", "Przedsiębiorcy szukający porównania opcji"],
    scope: ["Mapowanie obecnej sytuacji", "Wstępne wskazanie obszarów rozmowy", "Kontakt do partnera energetycznego"],
    process: ["Zebranie danych wejściowych", "Analiza kategorii kosztów", "Omówienie możliwych działań"],
    benefits: ["Lepsza widoczność kosztów", "Priorytetyzacja działań", "Dostęp do właściwych specjalistów"]
  }
];

export function getOfferBySlug(slug: string) {
  return offers.find((offer) => offer.slug === slug);
}
