export type OfferStatus = "Dostępne" | "Nowe" | "Premium";

export type Offer = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  status: OfferStatus;
  intro: string;
  audience: string[];
  scope: string[];
  process: string[];
  benefits: string[];
};

export const offers: Offer[] = [
  {
    slug: "finansowanie-rozwoju-firmy",
    title: "Finansowanie rozwoju firmy",
    category: "Finansowanie",
    categorySlug: "finansowanie",
    description: "Rozwiązania dla firm planujących inwestycje, skalowanie sprzedaży lub większe zamówienia.",
    status: "Premium",
    intro: "Oferta pomaga uporządkować potrzeby finansowe firmy i połączyć je z odpowiednimi partnerami.",
    audience: ["Firmy z historią sprzedaży", "Przedsiębiorstwa planujące inwestycje", "Zespoły przygotowujące większe kontrakty"],
    scope: ["Wstępna kwalifikacja potrzeb", "Dobór potencjalnych partnerów", "Przekazanie kontekstu i kolejnych kroków"],
    process: ["Krótka rozmowa o sytuacji firmy", "Weryfikacja dopasowania", "Przedstawienie możliwych ścieżek współpracy"],
    benefits: ["Mniej przypadkowych kontaktów", "Lepsze dopasowanie rozmów", "Oszczędność czasu po stronie przedsiębiorcy"]
  },
  {
    slug: "partnerstwa-handlowe-b2b",
    title: "Partnerstwa handlowe B2B",
    category: "Kontrakty B2B",
    categorySlug: "kontrakty-b2b",
    description: "Wybrane możliwości współpracy dla firm szukających nowych kanałów sprzedaży i partnerów.",
    status: "Nowe",
    intro: "Strukturyzujemy możliwości współpracy, aby firmy szybciej oceniały ich sens biznesowy.",
    audience: ["Dostawcy usług B2B", "Firmy z gotową ofertą", "Zespoły rozwijające sprzedaż partnerską"],
    scope: ["Opis profilu partnera", "Kryteria dopasowania", "Przekazanie kontaktu po kwalifikacji"],
    process: ["Analiza oferty", "Określenie oczekiwań", "Połączenie z wybranymi partnerami"],
    benefits: ["Konkretniejsze rozmowy", "Lepsza jakość leadów", "Szybsza ocena potencjału współpracy"]
  },
  {
    slug: "audyt-kosztow-operacyjnych",
    title: "Audyt kosztów operacyjnych",
    category: "Energia i optymalizacja kosztów",
    categorySlug: "energia",
    description: "Przegląd obszarów kosztowych i wskazanie potencjalnych partnerów do dalszej analizy.",
    status: "Dostępne",
    intro: "Oferta koncentruje się na uporządkowaniu informacji i wskazaniu miejsc wymagających dalszej rozmowy.",
    audience: ["Firmy z rosnącymi kosztami stałymi", "Organizacje wielooddziałowe", "Przedsiębiorcy szukający przejrzystości wydatków"],
    scope: ["Mapowanie kosztów", "Wstępne rekomendacje obszarów", "Kontakt do wyspecjalizowanych partnerów"],
    process: ["Zebranie danych wejściowych", "Analiza kategorii kosztów", "Omówienie możliwych działań"],
    benefits: ["Lepsza widoczność kosztów", "Priorytetyzacja działań", "Dostęp do właściwych specjalistów"]
  },
  {
    slug: "wdrozenia-saas-dla-firm",
    title: "Wdrożenia SaaS dla firm",
    category: "Rozwiązania technologiczne",
    categorySlug: "technologie",
    description: "Partnerzy technologiczni wspierający automatyzację sprzedaży, obsługi i procesów wewnętrznych.",
    status: "Dostępne",
    intro: "Pomagamy zawęzić wybór rozwiązań technologicznych do realnych potrzeb biznesu.",
    audience: ["Firmy porządkujące procesy", "Zespoły sprzedaży i obsługi", "Organizacje z rosnącą liczbą narzędzi"],
    scope: ["Rozpoznanie procesów", "Dobór kategorii narzędzi", "Połączenie z partnerami wdrożeniowymi"],
    process: ["Warsztat potrzeb", "Wybór priorytetów", "Rozmowa z dopasowanym partnerem"],
    benefits: ["Mniej nietrafionych wdrożeń", "Lepsze dopasowanie narzędzi", "Wsparcie w porządkowaniu procesu"]
  },
  {
    slug: "pakiet-obslugi-firmy",
    title: "Pakiet obsługi firmy",
    category: "Obsługa firm",
    categorySlug: "obsluga-firm",
    description: "Dostęp do partnerów wspierających administrację, formalności i bieżące potrzeby przedsiębiorstwa.",
    status: "Nowe",
    intro: "Oferta dla firm, które chcą szybciej znaleźć sprawdzonych usługodawców biznesowych.",
    audience: ["Młode spółki", "Firmy w fazie wzrostu", "Przedsiębiorcy reorganizujący zaplecze operacyjne"],
    scope: ["Rozpoznanie potrzeb", "Dobór kategorii usług", "Przekazanie kontaktów do partnerów"],
    process: ["Krótki briefing", "Weryfikacja dopasowania", "Rozmowa z partnerem"],
    benefits: ["Mniej rozproszonych poszukiwań", "Spójna ścieżka kontaktu", "Wsparcie w bieżącej organizacji"]
  },
  {
    slug: "konsultacje-rozwoju-b2b",
    title: "Konsultacje rozwoju B2B",
    category: "Doradztwo biznesowe",
    categorySlug: "doradztwo",
    description: "Rozmowy z partnerami pomagające uporządkować kierunki rozwoju, kanały i współprace.",
    status: "Premium",
    intro: "Wsparcie w spojrzeniu na rozwój firmy przez pryzmat możliwości partnerskich i operacyjnych.",
    audience: ["Właściciele firm", "Zarządy MŚP", "Liderzy sprzedaży i rozwoju"],
    scope: ["Diagnoza obecnej sytuacji", "Określenie priorytetów", "Wskazanie możliwych partnerstw"],
    process: ["Rozmowa strategiczna", "Porządkowanie opcji", "Ustalenie kolejnych działań"],
    benefits: ["Bardziej konkretna mapa opcji", "Lepsze decyzje o priorytetach", "Dostęp do właściwych rozmów"]
  }
];

export function getOfferBySlug(slug: string) {
  return offers.find((offer) => offer.slug === slug);
}
