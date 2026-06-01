export type OfferStatus = "Dostępne" | "Nowe" | "Premium" | "Analiza indywidualna" | "Dla osób fizycznych";

export type OfferCategoryTag = {
  name: string;
  slug: string;
};

export type OfferCardItem = {
  title: string;
  text: string;
  icon?: string;
};

export type OfferProcessStep = {
  step: string;
  title: string;
  text: string;
};

export type OfferFaqItem = {
  question: string;
  answer: string;
};

export type Offer = {
  slug: string;
  aliases?: string[];
  title: string;
  category: string;
  categorySlug: string;
  categories: OfferCategoryTag[];
  isIndividual?: boolean;
  status: OfferStatus;
  headline: string;
  description: string;
  lead: string;
  highlights: string[];
  heroBenefits: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  sidePanel: {
    title: string;
    items: string[];
    note: string;
    cta: string;
  };
  problemTitle: string;
  problemText: string[];
  problemCards: OfferCardItem[];
  solutionTitle: string;
  solutionText: string[];
  solutionCards: OfferCardItem[];
  forWhomTitle: string;
  forWhom: string[];
  scopeTitle: string;
  scope: OfferCardItem[];
  valueTitle?: string;
  valueText?: string[];
  valueCards?: OfferCardItem[];
  processTitle: string;
  process: OfferProcessStep[];
  documentsTitle: string;
  documents: string[];
  checkpointTitle: string;
  checkpointText?: string[];
  checkpoints: string[];
  risksTitle?: string;
  risks?: OfferCardItem[];
  faq: OfferFaqItem[];
  finalCta: {
    title: string;
    text: string;
    buttonLabel: string;
  };
  seo: {
    title: string;
    description: string;
  };
  intro: string;
  audience: string[];
  benefits: string[];
};

const categories = {
  financing: { name: "Finansowanie", slug: "finansowanie" },
  restructuring: { name: "Restrukturyzacja", slug: "restrukturyzacja" },
  investments: { name: "Inwestycje", slug: "inwestycje" },
  mobility: { name: "Inwestycje / Mobilność", slug: "mobilnosc" },
  energyInvestment: { name: "Inwestycje / Energia", slug: "inwestycje-energia" },
  energy: { name: "Energia", slug: "energia" },
  legalFinance: { name: "Prawo / Finanse", slug: "prawo-finanse" }
} satisfies Record<string, OfferCategoryTag>;

export const offers: Offer[] = [
  {
    slug: "kredyty-dla-firm",
    title: "Kredyty dla firm",
    category: categories.financing.name,
    categorySlug: categories.financing.slug,
    categories: [categories.financing],
    status: "Dostępne",
    headline: "Pozyskaj kapitał bez składania wniosków w ciemno.",
    description: "Pomagamy przedsiębiorcom dobrać finansowanie do realnej sytuacji firmy: na rozwój, płynność, inwestycje lub konsolidację zobowiązań.",
    lead: "Pomagamy przedsiębiorcom dobrać finansowanie do realnej sytuacji firmy: na rozwój, płynność, inwestycje lub konsolidację zobowiązań.",
    highlights: ["Analiza możliwości finansowania", "Dobór banku i produktu", "Wsparcie w dokumentach i procesie"],
    heroBenefits: ["Analiza sytuacji firmy", "Dobór banku i produktu", "Wsparcie w dokumentach i procesie"],
    ctaPrimary: "Porozmawiajmy o finansowaniu",
    ctaSecondary: "Zobacz proces",
    sidePanel: {
      title: "Szybka kwalifikacja",
      items: ["Wstępna analiza możliwości", "Dobór właściwego kierunku finansowania", "Wsparcie w dokumentach", "Bez składania wniosków w ciemno"],
      note: "Analiza nie oznacza gwarancji uzyskania finansowania. Decyzja zależy od dokumentów, zdolności i polityki instytucji finansującej.",
      cta: "Wyślij zapytanie"
    },
    problemTitle: "Problem, który rozwiązujemy",
    problemText: [
      "Wielu przedsiębiorców zaczyna od jednego banku. Składają wniosek, czekają, dostają odmowę albo przeciętną ofertę i uznają, że widocznie się nie da.",
      "Często problem nie leży w firmie. Problem leży w sposobie przygotowania sprawy, wyborze niewłaściwego produktu albo rozmowie z instytucją, która od początku nie była najlepszym kierunkiem."
    ],
    problemCards: [
      { title: "Strata czasu", text: "Wiele wniosków, spotkań i telefonów bez efektu.", icon: "⌚" },
      { title: "Brak jasnej decyzji", text: "Częste odmowy bez dobrego uzasadnienia.", icon: "×" },
      { title: "Biurokracja", text: "Złożone dokumenty i długie procedury.", icon: "▣" }
    ],
    solutionTitle: "Jak pomagamy",
    solutionText: [
      "Analizujemy sytuację firmy, cel finansowania, dokumenty, historię rachunku, zobowiązania i realną zdolność.",
      "Następnie dobieramy właściwy kierunek: kredyt obrotowy, inwestycyjny, konsolidację, leasing, faktoring albo finansowanie pod konkretny projekt."
    ],
    solutionCards: [
      { title: "Analizujemy", text: "Twoją sytuację finansową i potrzeby.", icon: "⌕" },
      { title: "Dobieramy", text: "Banki i produkty dopasowane do celu.", icon: "◎" },
      { title: "Prowadzimy", text: "Proces i wspieramy w dokumentach.", icon: "□" },
      { title: "Porównujemy", text: "Koszt, zabezpieczenia, okres i warunki.", icon: "✓" }
    ],
    forWhomTitle: "Dla kogo",
    forWhom: ["JDG i mikrofirmy", "Spółki z o.o. i akcyjne", "Firmy szukające kapitału na rozwój", "Firmy potrzebujące płynności", "Przedsiębiorcy z kilkoma zobowiązaniami", "Firmy planujące większą inwestycję"],
    scopeTitle: "Co obejmuje oferta",
    scope: [
      { title: "Analiza sytuacji", text: "Sprawdzamy cel finansowania, kondycję firmy i możliwe ograniczenia." },
      { title: "Dobór rozwiązania", text: "Wybieramy typ finansowania, który pasuje do celu i sytuacji firmy." },
      { title: "Przygotowanie dokumentów", text: "Pomagamy uporządkować wymagane dane i dokumenty." },
      { title: "Porównanie ofert", text: "Patrzymy na koszt, zabezpieczenia, okres i warunki." },
      { title: "Wsparcie do uruchomienia", text: "Prowadzimy proces do decyzji i finalizacji." }
    ],
    valueTitle: "Realne korzyści",
    valueCards: [
      { title: "Mniej przypadkowych wniosków", text: "Najpierw sprawdzamy kierunek, potem składamy sprawę." },
      { title: "Lepsze przygotowanie", text: "Dokumenty i cel finansowania są uporządkowane przed rozmową." },
      { title: "Porównanie warunków", text: "Decyzja nie opiera się wyłącznie na wysokości raty." }
    ],
    processTitle: "Jak wygląda proces",
    process: [
      { step: "1", title: "Rozmowa o celu", text: "Poznajemy potrzeby firmy i planowany sposób wykorzystania środków." },
      { step: "2", title: "Lista dokumentów", text: "Wskazujemy, co trzeba przygotować do analizy." },
      { step: "3", title: "Analiza możliwości", text: "Sprawdzamy, które kierunki mają realny sens." },
      { step: "4", title: "Dobór produktów", text: "Wybieramy właściwe instytucje i modele finansowania." },
      { step: "5", title: "Złożenie sprawy", text: "Pomagamy przejść przez formalności." },
      { step: "6", title: "Finalizacja", text: "Wspieramy przy decyzji i uruchomieniu środków." }
    ],
    documentsTitle: "Co przygotować",
    documents: ["Dane firmy", "Cel finansowania", "Dokumenty finansowe", "Wyciągi bankowe", "Informacje o obecnych zobowiązaniach", "Informacje o zabezpieczeniach, jeśli są"],
    checkpointTitle: "Warunki, które warto sprawdzić",
    checkpoints: ["Czy firma generuje przychody pozwalające obsłużyć nowe zobowiązanie.", "Czy cel finansowania jest jasno określony.", "Czy dokumenty finansowe pokazują firmę w sposób kompletny.", "Czy obecne zobowiązania nie blokują nowej zdolności.", "Czy kredyt ma wspierać firmę, a nie tylko przesunąć problem w czasie."],
    risksTitle: "Nota ostrożności",
    risks: [{ title: "Decyzja zależy od instytucji", text: "Dealshare pomaga przygotować i przeprowadzić proces, ale nie gwarantuje finansowania ani konkretnej kwoty." }],
    faq: [
      { question: "Czy analiza jest płatna?", answer: "Wstępna analiza może być wykonana przed decyzją o dalszym procesie. Zakres i warunki są ustalane indywidualnie." },
      { question: "Czy muszę mieć idealną historię kredytową?", answer: "Nie zawsze, ale historia zobowiązań ma znaczenie. Dlatego najpierw warto sprawdzić sytuację zamiast składać wnioski w ciemno." },
      { question: "Czy obsługujecie JDG?", answer: "Tak, oferta może dotyczyć zarówno jednoosobowych działalności, jak i spółek." },
      { question: "Czy mogę dostać finansowanie mimo obecnych kredytów?", answer: "To zależy od zdolności, historii spłaty, celu finansowania i struktury obecnych zobowiązań." }
    ],
    finalCta: { title: "Zacznij od analizy", text: "Opisz cel finansowania i podstawową sytuację firmy. Sprawdzimy, który kierunek ma największy sens.", buttonLabel: "Wyślij zapytanie" },
    seo: { title: "Kredyty dla firm - finansowanie działalności i inwestycji | Dealshare", description: "Pozyskaj finansowanie dla firmy na rozwój, płynność, inwestycje lub konsolidację. Sprawdź możliwości przed złożeniem wniosku." },
    intro: "Oferta pomaga firmom uporządkować potrzeby finansowe i przejść do rozmowy z odpowiednim partnerem.",
    audience: ["JDG i mikrofirmy", "Spółki z o.o.", "Firmy planujące inwestycje"],
    benefits: ["Mniej przypadkowych kontaktów", "Lepsze dopasowanie rozmów", "Oszczędność czasu po stronie przedsiębiorcy"]
  },
  {
    slug: "restrukturyzacje",
    title: "Restrukturyzacja firm",
    category: categories.restructuring.name,
    categorySlug: categories.restructuring.slug,
    categories: [categories.restructuring],
    status: "Analiza indywidualna",
    headline: "Odzyskaj kontrolę nad zadłużeniem, zanim chaos przejmie firmę.",
    description: "Wsparcie dla firm, które tracą płynność, mają presję wierzycieli albo potrzebują uporządkowanego planu naprawczego.",
    lead: "Jeżeli firma traci płynność, ma zaległości albo presję wierzycieli, restrukturyzacja może dać czas, ochronę i uporządkowany plan działania.",
    highlights: ["Diagnoza zadłużenia", "Propozycje układowe", "Wsparcie w rozmowach z wierzycielami"],
    heroBenefits: ["Diagnoza zadłużenia", "Propozycje układowe", "Wsparcie w rozmowach z wierzycielami"],
    ctaPrimary: "Sprawdź możliwą ścieżkę",
    ctaSecondary: "Zobacz proces",
    sidePanel: { title: "Szybka diagnoza", items: ["Analiza zadłużenia", "Ocena wierzycieli i egzekucji", "Sprawdzenie możliwości układu", "Plan pierwszych działań"], note: "Restrukturyzacja wymaga indywidualnej oceny. Nie każda firma kwalifikuje się do skutecznego procesu.", cta: "Opisz sytuację" },
    problemTitle: "Problem, który rozwiązujemy",
    problemText: ["Problemy finansowe w firmie rzadko pojawiają się z dnia na dzień. Najpierw jest jedna opóźniona płatność, potem bank, leasing, ZUS, urząd skarbowy i coraz mniej miejsca na normalne prowadzenie działalności.", "Największym błędem przedsiębiorcy w kryzysie jest czekanie. Każdy kolejny miesiąc bez działania może oznaczać większą presję wierzycieli i mniejsze pole manewru."],
    problemCards: [{ title: "Presja wierzycieli", text: "Rosnące telefony, wezwania i ryzyko egzekucji." }, { title: "Utrata płynności", text: "Firma pracuje, ale nie ma przestrzeni na bieżące regulowanie zobowiązań." }, { title: "Brak planu", text: "Gaszenie pożarów zastępuje decyzje strategiczne." }],
    solutionTitle: "Na czym polega rozwiązanie",
    solutionText: ["Pomagamy ocenić, czy restrukturyzacja jest właściwą ścieżką. Porządkujemy zobowiązania, priorytety działań i możliwe warianty rozmów z wierzycielami.", "Celem jest przygotowanie realnego planu: ochrony firmy, propozycji układowych i dalszych kroków formalnych."],
    solutionCards: [{ title: "Diagnozujemy", text: "Zadłużenie, wierzycieli, egzekucje i płynność." }, { title: "Projektujemy", text: "Możliwe propozycje układowe i plan działania." }, { title: "Prowadzimy", text: "Rozmowy i formalny proces z właściwymi partnerami." }],
    forWhomTitle: "Dla kogo",
    forWhom: ["Firmy z zaległościami", "Przedsiębiorcy pod presją wierzycieli", "Zarządy MŚP", "Firmy z problemem płynności", "Podmioty szukające planu naprawczego"],
    scopeTitle: "Co obejmuje wsparcie",
    scope: [{ title: "Analiza sytuacji", text: "Sprawdzenie zobowiązań, wierzycieli i możliwych ryzyk." }, { title: "Ocena ścieżki", text: "Weryfikacja, czy restrukturyzacja ma sens w konkretnej sytuacji." }, { title: "Plan działań", text: "Priorytety, dokumenty i pierwsze kroki." }, { title: "Wsparcie partnerów", text: "Kontakt ze specjalistami od procesu restrukturyzacyjnego." }],
    valueTitle: "Co zyskuje firma",
    valueCards: [{ title: "Porządek", text: "Zamiast chaotycznych decyzji pojawia się plan." }, { title: "Czas na decyzje", text: "Właściwa ścieżka może ograniczyć presję i uporządkować rozmowy." }, { title: "Realna ocena", text: "Nie każda sprawa nadaje się do restrukturyzacji. Najpierw sprawdzamy fakty." }],
    processTitle: "Jak wygląda proces",
    process: [{ step: "1", title: "Opis sytuacji", text: "Zbieramy podstawowe informacje o zadłużeniu i presji wierzycieli." }, { step: "2", title: "Dokumenty", text: "Wskazujemy, jakie dane są potrzebne do oceny." }, { step: "3", title: "Diagnoza", text: "Sprawdzamy skalę problemu i możliwe ścieżki." }, { step: "4", title: "Plan", text: "Proponujemy pierwsze działania i warianty rozmów." }, { step: "5", title: "Proces", text: "Wspieramy kontakt z partnerem i dalsze kroki formalne." }],
    documentsTitle: "Co przygotować",
    documents: ["Lista wierzycieli", "Kwoty i terminy zaległości", "Informacje o egzekucjach", "Dokumenty finansowe", "Umowy kredytowe i leasingowe", "Opis bieżącej działalności"],
    checkpointTitle: "Czy restrukturyzacja jest właściwą ścieżką?",
    checkpoints: ["Czy firma ma realny model dalszego działania.", "Czy istnieje możliwość przygotowania propozycji dla wierzycieli.", "Czy problem nie jest już na etapie wymagającym innych działań.", "Czy zarząd jest gotowy na uporządkowanie dokumentów i decyzji.", "Czy plan naprawczy ma podstawy w liczbach."],
    risksTitle: "Nota ostrożności",
    risks: [{ title: "Proces wymaga oceny", text: "Restrukturyzacja nie gwarantuje umorzenia długu ani zatrzymania wszystkich działań wierzycieli w każdej sytuacji." }],
    faq: [{ question: "Czy restrukturyzacja zatrzyma egzekucje?", answer: "To zależy od rodzaju procesu, etapu spraw i decyzji właściwych organów. Wymaga indywidualnej analizy." }, { question: "Czy każda firma może się restrukturyzować?", answer: "Nie. Najpierw trzeba sprawdzić sytuację finansową, wierzycieli i możliwość przygotowania realnego planu." }, { question: "Czy trzeba mieć komplet dokumentów?", answer: "Im więcej danych, tym lepsza ocena. Na początku wystarczy opis sytuacji i lista najważniejszych zobowiązań." }, { question: "Ile trwa przygotowanie pierwszej oceny?", answer: "To zależy od kompletności informacji i skali zadłużenia." }],
    finalCta: { title: "Zacznij od diagnozy", text: "Opisz zadłużenie, presję wierzycieli i bieżącą sytuację firmy. Sprawdzimy, jaka ścieżka jest realna.", buttonLabel: "Opisz sytuację" },
    seo: { title: "Restrukturyzacja firm - analiza zadłużenia i plan działania | Dealshare", description: "Sprawdź możliwe ścieżki restrukturyzacji firmy, analizę zadłużenia, wierzycieli i pierwsze działania naprawcze." },
    intro: "Oferta kieruje do rozmowy z wyspecjalizowanym partnerem, gdy firma potrzebuje uporządkować trudną sytuację.",
    audience: ["Firmy z presją kosztową", "Przedsiębiorcy szukający opcji naprawczych", "Zarządy MŚP"],
    benefits: ["Szybsze dotarcie do specjalisty", "Porządek w pierwszych krokach", "Mniej przypadkowych konsultacji"]
  },
  {
    slug: "infrastruktura-gpu",
    title: "Infrastruktura GPU",
    category: categories.investments.name,
    categorySlug: categories.investments.slug,
    categories: [categories.investments],
    status: "Nowe",
    headline: "Wejdź w zaplecze obliczeniowe potrzebne dla AI, renderingu i zaawansowanych usług cyfrowych.",
    description: "Możliwości inwestycyjne i partnerskie związane z zapleczem obliczeniowym oraz infrastrukturą GPU.",
    lead: "Popyt na moc obliczeniową rośnie wraz z rozwojem AI, automatyzacji i przetwarzania danych. Projekt wymaga jednak analizy operatora, kosztów energii, sprzętu i umów odbioru mocy.",
    highlights: ["Rynek mocy obliczeniowej", "Analiza operatora i kosztów", "Model inwestycyjny do weryfikacji"],
    heroBenefits: ["Ekspozycja na infrastrukturę AI", "Weryfikacja modelu operacyjnego", "Rozmowa z właściwym partnerem"],
    ctaPrimary: "Poznaj projekt GPU",
    ctaSecondary: "Zobacz proces",
    sidePanel: { title: "Co sprawdzamy", items: ["Operator i doświadczenie", "Koszty energii i chłodzenia", "Sprzęt i cykl życia", "Umowy i potencjalni odbiorcy"], note: "Parametry projektu mają charakter informacyjny i wymagają weryfikacji dokumentów.", cta: "Zapytaj o projekt" },
    problemTitle: "Okazja rynkowa",
    problemText: ["Firmy potrzebują coraz większej mocy obliczeniowej, ale sam zakup sprzętu nie tworzy jeszcze biznesu.", "Znaczenie mają dostęp do energii, chłodzenie, serwis, oprogramowanie, sprzedaż mocy oraz jakość operatora."],
    problemCards: [{ title: "CAPEX sprzętu", text: "GPU szybko się starzeją i wymagają dobrego planu amortyzacji." }, { title: "Energia i chłodzenie", text: "Koszty operacyjne mogą zdecydować o opłacalności." }, { title: "Komercjalizacja", text: "Bez odbiorców mocy infrastruktura pozostaje kosztem." }],
    solutionTitle: "Jak porządkujemy temat",
    solutionText: ["Pomagamy przejść od ogólnej prezentacji projektu do konkretnej listy pytań i danych do analizy.", "Weryfikujemy, co trzeba sprawdzić przed rozmową o kapitale: operatora, sprzęt, koszty, umowy i ryzyka."],
    solutionCards: [{ title: "Analiza operatora", text: "Doświadczenie, partnerzy i model zarządzania." }, { title: "Model kosztów", text: "Energia, chłodzenie, serwis, hosting i obsługa." }, { title: "Model przychodów", text: "Najem mocy, kontrakty, usługi obliczeniowe." }],
    forWhomTitle: "Dla kogo",
    forWhom: ["Inwestorzy biznesowi", "Firmy technologiczne", "Partnerzy infrastrukturalni", "Podmioty szukające ekspozycji na AI", "Osoby akceptujące ryzyka technologiczne"],
    scopeTitle: "Co obejmuje projekt",
    scope: [{ title: "Opis infrastruktury", text: "Zakres sprzętu, zaplecza i operatora." }, { title: "Analiza kosztów", text: "Najważniejsze koszty operacyjne i techniczne." }, { title: "Weryfikacja modelu", text: "Pytania o odbiorców, umowy i utrzymanie." }, { title: "Wsparcie decyzji", text: "Uporządkowanie materiałów przed rozmową inwestycyjną." }],
    valueTitle: "Źródła wartości",
    valueCards: [{ title: "Najem mocy", text: "Potencjalny przychód z udostępniania zasobów obliczeniowych." }, { title: "Usługi AI i renderingu", text: "Możliwość obsługi klientów wymagających wysokiej mocy." }, { title: "Wartość infrastruktury", text: "Sprzęt i umowy mogą mieć znaczenie przy scenariuszu wyjścia." }],
    processTitle: "Jak wygląda proces",
    process: [{ step: "1", title: "Rozmowa o projekcie", text: "Ustalamy, jakiego wariantu dotyczy zainteresowanie." }, { step: "2", title: "Materiały", text: "Zbieramy informacje o sprzęcie, kosztach i operatorze." }, { step: "3", title: "Weryfikacja pytań", text: "Ustalamy, co wymaga wyjaśnienia przed decyzją." }, { step: "4", title: "Rozmowa z partnerem", text: "Przechodzimy do szczegółów projektu." }, { step: "5", title: "Decyzja", text: "Inwestor podejmuje decyzję po analizie dokumentów." }],
    documentsTitle: "Co przygotować",
    documents: ["Preferowana kwota inwestycji", "Horyzont inwestycyjny", "Pytania techniczne", "Informacje o źródle finansowania", "Oczekiwany poziom zaangażowania"],
    checkpointTitle: "Punkty kontrolne przed decyzją",
    checkpoints: ["Kto jest operatorem i jakie ma doświadczenie.", "Jak zabezpieczone są koszty energii i chłodzenia.", "Czy istnieją umowy lub realna ścieżka sprzedaży mocy.", "Jak wygląda serwis, awaryjność i cykl życia sprzętu.", "Czy model finansowy uwzględnia wymianę sprzętu."],
    risksTitle: "Ryzyka",
    risks: [{ title: "Ryzyko technologiczne", text: "Sprzęt, popyt i koszty energii mogą zmieniać się szybko. Projekt nie stanowi rekomendacji inwestycyjnej." }],
    faq: [{ question: "Czy to inwestycja w AI?", answer: "To ekspozycja na infrastrukturę obliczeniową, która może obsługiwać różne zastosowania, w tym AI." }, { question: "Co jest najważniejsze w analizie?", answer: "Operator, koszty energii, model sprzedaży mocy, serwis i cykl życia sprzętu." }, { question: "Czy wyniki są gwarantowane?", answer: "Nie. Parametry wymagają weryfikacji dokumentów i założeń." }, { question: "Czy trzeba znać technologię?", answer: "Nie, ale decyzja powinna być poprzedzona analizą techniczną i finansową." }],
    finalCta: { title: "Sprawdź projekt GPU", text: "Zacznij od analizy operatora, kosztów, sprzętu i modelu sprzedaży mocy obliczeniowej.", buttonLabel: "Zapytaj o szczegóły" },
    seo: { title: "Infrastruktura GPU - projekt inwestycyjny i zaplecze obliczeniowe | Dealshare", description: "Sprawdź projekt infrastruktury GPU, model kosztów, operatora, ryzyka i potencjalne źródła wartości." },
    intro: "Oferta dla firm i partnerów, którzy chcą poznać kontekst inwestycji w infrastrukturę obliczeniową.",
    audience: ["Inwestorzy biznesowi", "Firmy technologiczne", "Partnerzy infrastrukturalni"],
    benefits: ["Dostęp do kontekstu", "Lepsza kwalifikacja rozmów", "Weryfikacja niszowego obszaru inwestycji"]
  },
  {
    slug: "farma-pv-bess",
    aliases: ["farmy-energii"],
    title: "Farma PV + BESS",
    category: categories.energyInvestment.name,
    categorySlug: categories.energyInvestment.slug,
    categories: [categories.energyInvestment],
    status: "Nowe",
    headline: "Projekt energetyczny łączący fotowoltaikę, magazyn energii i aktywne zarządzanie.",
    description: "Projekt inwestycyjny łączący farmę fotowoltaiczną, magazyn energii BESS, trading energią i usługi systemowe.",
    lead: "Model PV + BESS nie opiera się wyłącznie na sprzedaży energii z produkcji dziennej. Kluczowe są magazyn energii, agregator, trading i weryfikacja założeń finansowych.",
    highlights: ["PV + magazyn energii", "Model tradingowy do analizy", "Ryzyka i scenariusz wyjścia"],
    heroBenefits: ["Farma PV i BESS", "Arbitraż i usługi systemowe", "Model wymaga weryfikacji"],
    ctaPrimary: "Porozmawiaj o projekcie",
    ctaSecondary: "Zobacz proces",
    sidePanel: { title: "Parametry do analizy", items: ["CAPEX i przyłączenie", "Magazyn energii BESS", "Agregator i trading", "Prognozowana EBITDA"], note: "Dane finansowe są założeniami modelowymi, a inwestycja wiąże się z ryzykiem.", cta: "Wyślij zapytanie" },
    problemTitle: "Dlaczego to ma znaczenie",
    problemText: ["Klasyczna farma PV jest mocno zależna od produkcji i ceny sprzedaży energii w godzinach dziennych.", "Magazyn energii może zmienić charakter projektu, ale tylko wtedy, gdy model pracy BESS, agregator i koszty są realnie policzone."],
    problemCards: [{ title: "Ceny energii", text: "Przychody zależą od rynku i spreadów cenowych." }, { title: "Regulacje", text: "Usługi systemowe i zasady rynku mogą się zmieniać." }, { title: "Operacje", text: "SCADA, serwis, sprawność i dostępność mają wpływ na wynik." }],
    solutionTitle: "Model projektu",
    solutionText: ["Projekt zakłada połączenie produkcji energii z PV, magazynowania i aktywnego zarządzania energią.", "Wartość powinna być oceniana przez CAPEX, przyłączenie, model tradingowy, umowę z agregatorem, prognozy i ryzyka operacyjne."],
    solutionCards: [{ title: "PV", text: "Produkcja energii i sprzedaż do rynku lub odbiorców." }, { title: "BESS", text: "Magazynowanie, arbitraż i elastyczność pracy." }, { title: "Agregator", text: "Dostęp do usług systemowych i zarządzania energią." }],
    forWhomTitle: "Dla kogo",
    forWhom: ["Inwestorzy zainteresowani energetyką", "Podmioty akceptujące ryzyka rynkowe", "Firmy szukające projektów OZE", "Inwestorzy analizujący aktywa infrastrukturalne"],
    scopeTitle: "Co obejmuje projekt",
    scope: [{ title: "Opis aktywa", text: "Farma PV, magazyn energii i komponenty techniczne." }, { title: "Model finansowy", text: "Założenia przychodów, kosztów i EBITDA do weryfikacji." }, { title: "Analiza ryzyk", text: "Ceny, regulacje, operacje, agregator i przyłączenie." }, { title: "Scenariusz wyjścia", text: "Modelowa wartość działającego aktywa przy odpowiednich parametrach." }],
    valueTitle: "Strumienie wartości",
    valueText: ["Projekt może tworzyć wartość przez kilka strumieni, ale każdy z nich wymaga potwierdzenia w dokumentach i umowach."],
    valueCards: [{ title: "Sprzedaż energii z PV", text: "Potencjalny przychód z produkcji energii." }, { title: "Arbitraż cenowy", text: "Wykorzystanie różnic cen dzięki magazynowi energii." }, { title: "Usługi systemowe", text: "Możliwy udział w usługach we współpracy z agregatorem." }, { title: "Wartość aktywa", text: "Działający asset może mieć wartość przy stabilnej EBITDA i dokumentacji." }],
    processTitle: "Jak wygląda proces",
    process: [{ step: "1", title: "Rozmowa o projekcie", text: "Ustalamy zakres i poziom zainteresowania." }, { step: "2", title: "Materiały", text: "Analizujemy CAPEX, przyłączenie, technologię i model." }, { step: "3", title: "Pytania kontrolne", text: "Weryfikujemy najważniejsze założenia." }, { step: "4", title: "Rozmowa z partnerem", text: "Przechodzimy do dokumentów i szczegółów." }, { step: "5", title: "Decyzja", text: "Kapitał dopiero po analizie ryzyk i założeń." }],
    documentsTitle: "Co przygotować",
    documents: ["Preferowana kwota inwestycji", "Horyzont inwestycyjny", "Pytania o CAPEX i przyłączenie", "Oczekiwany poziom ryzyka", "Informacje o źródle finansowania"],
    checkpointTitle: "Punkty kontrolne przed decyzją",
    checkpoints: ["Czy projekt ma umowę z agregatorem albo realny plan jej uzyskania.", "Czy magazyn energii jest operacyjnym centrum projektu, a nie dodatkiem marketingowym.", "Czy dokumentacja techniczna i finansowa pozwala zweryfikować założenia.", "Czy założenia EBITDA uwzględniają koszty operacyjne, serwis, trading i ryzyka.", "Czy inwestor rozumie, że prognozy nie są gwarancją wyniku."],
    risksTitle: "Ryzyka i ich ograniczenie",
    risks: [{ title: "Ryzyko cen energii", text: "Spadek cen lub spreadów może obniżyć wynik. Model wymaga aktualnej analizy rynku." }, { title: "Ryzyko regulacyjne", text: "Zasady rynku i usług systemowych mogą się zmieniać." }, { title: "Ryzyko modelowe", text: "Prognozy finansowe wymagają weryfikacji kosztów, cen, dostępności usług i parametrów technicznych." }],
    faq: [{ question: "Czy to jest zwykła farma fotowoltaiczna?", answer: "Nie. Projekt łączy farmę PV z magazynem energii BESS i aktywnym zarządzaniem." }, { question: "Skąd pochodzą przychody?", answer: "Model zakłada sprzedaż energii z PV, arbitraż cenowy oraz udział w usługach systemowych we współpracy z agregatorem." }, { question: "Czy prognozowana EBITDA jest gwarantowana?", answer: "Nie. EBITDA ma charakter prognozy opartej na założeniach modelowych." }, { question: "Dlaczego magazyn energii jest ważny?", answer: "Pozwala elastycznie zarządzać energią, uczestniczyć w arbitrażu i potencjalnie w usługach systemowych." }],
    finalCta: { title: "Zacznij od analizy projektu", text: "Najpierw sprawdź CAPEX, przyłączenie, model tradingowy, agregatora, ryzyka i scenariusz wyjścia. Potem decyzja.", buttonLabel: "Porozmawiaj o projekcie" },
    seo: { title: "Farma PV + BESS - inwestycja w fotowoltaikę i magazyn energii | Dealshare", description: "Projekt inwestycyjny łączący farmę fotowoltaiczną, magazyn energii, trading energią i usługi systemowe." },
    intro: "Oferta porządkuje pierwszy kontakt dla podmiotów zainteresowanych projektami energetycznymi.",
    audience: ["Inwestorzy", "Firmy zainteresowane OZE", "Partnerzy rozwijający projekty energetyczne"],
    benefits: ["Jasniejszy kontekst projektu", "Mniej rozproszonych rozmów", "Dostęp do wybranych możliwości"]
  },
  {
    slug: "kontrakty-flotowe",
    title: "Kontrakty flotowe",
    category: categories.mobility.name,
    categorySlug: categories.mobility.slug,
    categories: [categories.mobility],
    status: "Dostępne",
    headline: "Zainwestuj w działający sektor mobilności, wynajmu i zarządzania flotą.",
    description: "Projekt związany z flotą, wynajmem pojazdów, logistyką i obsługą kierowców.",
    lead: "Rynek mobilności, logistyki ostatniej mili i elastycznych modeli wynajmu potrzebuje profesjonalnych operatorów flotowych.",
    highlights: ["Realny biznes operacyjny", "Powtarzalne przychody flotowe", "Ekspozycja na mobilność i logistykę"],
    heroBenefits: ["Realny biznes operacyjny", "Powtarzalne przychody flotowe", "Ekspozycja na mobilność i logistykę"],
    ctaPrimary: "Poznaj model flotowy",
    ctaSecondary: "Zobacz proces",
    sidePanel: { title: "Charakter projektu", items: ["Wynajem i podnajem floty", "Obsługa kierowców", "Logistyka kontraktowa", "Transport dedykowany"], note: "Parametry inwestycji zależą od operatora, umów, obłożenia floty, kosztów serwisu i struktury finansowania.", cta: "Zapytaj o szczegóły" },
    problemTitle: "Rynek potrzebuje floty, ale nie samego pojazdu",
    problemText: ["Firmy, kierowcy i platformy potrzebują pojazdów, obsługi serwisowej, rozliczeń i zaplecza operacyjnego.", "Sam zakup samochodu to za mało. Wartość powstaje dopiero wtedy, gdy flota jest zarządzana profesjonalnie."],
    problemCards: [{ title: "Obłożenie", text: "Pojazd musi pracować, a nie tylko stać w aktywach." }, { title: "Serwis", text: "Koszty szkód i napraw wpływają na rentowność." }, { title: "Operator", text: "Jakość zarządzania decyduje o wyniku." }],
    solutionTitle: "Model oparty na operatorze flotowym",
    solutionText: ["Model inwestycyjny opiera się na finansowaniu rozwoju floty i infrastruktury operacyjnej.", "Pojazdy mogą być wykorzystywane w wynajmie, podnajmie, obsłudze kierowców, logistyce kontraktowej albo transporcie dedykowanym."],
    solutionCards: [{ title: "Operator", text: "Zarządzanie flotą, kierowcami i serwisem." }, { title: "Kontrakty", text: "Umowy z klientami, platformami lub partnerami." }, { title: "Aktywa", text: "Pojazdy jako element realnego biznesu operacyjnego." }],
    forWhomTitle: "Dla kogo",
    forWhom: ["Inwestorzy szukający realnego biznesu operacyjnego", "Osoby zainteresowane powtarzalnymi przychodami", "Inwestorzy chcący ekspozycji na mobilność", "Osoby, które nie chcą samodzielnie zarządzać flotą"],
    scopeTitle: "Co obejmuje projekt",
    scope: [{ title: "Prezentacja modelu", text: "Opis operatora i sposobu pracy floty." }, { title: "Analiza skali", text: "Flota, obłożenie, koszty i zaplecze." }, { title: "Strumienie przychodów", text: "Wynajem, obsługa, logistyka lub transport." }, { title: "Dokumentacja", text: "Materiały potrzebne do decyzji inwestora." }],
    valueTitle: "Źródła wartości",
    valueCards: [{ title: "Wynajem", text: "Przychody z udostępniania pojazdów." }, { title: "Obsługa kierowców", text: "Model operacyjny oparty na zapleczu i rozliczeniach." }, { title: "Transport dedykowany", text: "Kontrakty dla klientów biznesowych." }],
    processTitle: "Jak wygląda proces",
    process: [{ step: "1", title: "Rozmowa o modelu", text: "Przedstawienie charakteru inwestycji." }, { step: "2", title: "Prezentacja operatora", text: "Omówienie skali, floty i zaplecza." }, { step: "3", title: "Wariant inwestycyjny", text: "Kwota, horyzont i struktura." }, { step: "4", title: "Analiza dokumentów", text: "Weryfikacja danych i założeń." }, { step: "5", title: "Finalizacja", text: "Operacyjne uruchomienie lub objęcie udziału." }],
    documentsTitle: "Co przygotować",
    documents: ["Preferowana kwota inwestycji", "Oczekiwany horyzont", "Informacja o źródle finansowania", "Pytania o operatora i umowy"],
    checkpointTitle: "Punkty kontrolne przed decyzją",
    checkpoints: ["Kto jest operatorem floty i jakie ma doświadczenie.", "Jak wygląda obłożenie pojazdów.", "Jakie są koszty serwisu, szkód i przestojów.", "Jakie są umowy z kierowcami, platformami albo klientami.", "Jak wygląda scenariusz wyjścia lub odsprzedaży aktywów."],
    risksTitle: "Ryzyka",
    risks: [{ title: "Biznes operacyjny", text: "Wynik zależy od operatora, obłożenia, kosztów, szkód i jakości umów." }],
    faq: [{ question: "Czy sam zarządzam pojazdami?", answer: "Nie taki jest cel modelu. Operacyjne zarządzanie flotą powinno być po stronie operatora." }, { question: "Skąd pochodzą przychody?", answer: "Z wynajmu, podnajmu, obsługi kierowców, logistyki kontraktowej lub transportu dedykowanego." }, { question: "Jakie są główne ryzyka?", answer: "Obłożenie floty, szkody, serwis, koszty finansowania, jakość operatora i zmiany rynkowe." }, { question: "Czy inwestycja jest zabezpieczona pojazdami?", answer: "To zależy od konkretnej struktury umownej i wymaga weryfikacji dokumentów." }],
    finalCta: { title: "Sprawdź model flotowy", text: "Zanim wejdziesz w projekt, sprawdź operatora, flotę, koszty, umowy i ryzyka.", buttonLabel: "Zapytaj o szczegóły" },
    seo: { title: "Kontrakty flotowe - inwestycja w mobilność i zarządzanie flotą | Dealshare", description: "Projekt inwestycyjny związany z flotą, wynajmem pojazdów, logistyką i obsługą kierowców." },
    intro: "Pomagamy uporządkować rozmowy wokół kontraktów flotowych i dopasować strony do konkretnego zapotrzebowania.",
    audience: ["Inwestorzy", "Firmy flotowe", "Partnerzy operacyjni"],
    benefits: ["Konkretniejsze rozmowy", "Lepsza jakość leadów", "Szybsza ocena potencjału"]
  },
  {
    slug: "sankcja-kredytu-darmowego",
    aliases: ["uniewaznienia-kredytow"],
    title: "Sankcja kredytu darmowego",
    category: categories.legalFinance.name,
    categorySlug: categories.legalFinance.slug,
    categories: [categories.legalFinance],
    isIndividual: true,
    status: "Dla osób fizycznych",
    headline: "Sprawdź, czy bank naliczył koszty, których nie powinien.",
    description: "Analiza umowy kredytu konsumenckiego, potencjalnych naruszeń i możliwych roszczeń.",
    lead: "Jeżeli masz kredyt gotówkowy albo spłaciłeś go niedawno, Twoja umowa może zawierać naruszenia. W takim przypadku możesz mieć możliwość odzyskania części kosztów albo spłaty wyłącznie kapitału.",
    highlights: ["Analiza umowy kredytowej", "Ocena potencjalnych naruszeń", "Symulacja możliwych korzyści"],
    heroBenefits: ["Analiza umowy kredytowej", "Ocena potencjalnych naruszeń", "Symulacja możliwych korzyści"],
    ctaPrimary: "Wyślij umowę do analizy",
    ctaSecondary: "Zobacz proces",
    sidePanel: { title: "Co sprawdzamy", items: ["Umowa kredytowa", "Koszty i prowizje", "Obowiązki informacyjne banku", "Możliwe roszczenia"], note: "Wynik zależy od treści umowy, dat, dokumentów i aktualnej oceny prawnej.", cta: "Wyślij umowę" },
    problemTitle: "Problem, którego wielu klientów nie zna",
    problemText: ["Wiele umów kredytów konsumenckich może zawierać błędy albo naruszenia obowiązków informacyjnych.", "Klient często nie wie, że bank mógł nieprawidłowo przedstawić koszty, prowizje, RRSO albo inne elementy umowy."],
    problemCards: [{ title: "Ukryte naruszenia", text: "Błędy mogą znajdować się w szczegółach umowy." }, { title: "Koszty i prowizje", text: "Wymagają dokładnej analizy prawnej." }, { title: "Terminy", text: "Możliwość działania zależy od dat i dokumentów." }],
    solutionTitle: "Analiza umowy i możliwe działania",
    solutionText: ["Analizujemy umowę kredytową, sprawdzamy potencjalne naruszenia i przedstawiamy możliwe roszczenia, koszty, ryzyka oraz ścieżkę działania."],
    solutionCards: [{ title: "Analiza", text: "Sprawdzenie umowy, harmonogramu i kosztów." }, { title: "Ocena", text: "Wskazanie potencjalnych naruszeń." }, { title: "Działania", text: "Reklamacja, oświadczenia lub dalsza ścieżka." }],
    forWhomTitle: "Dla kogo",
    forWhom: ["Osoby z aktywnym kredytem gotówkowym", "Osoby, które spłaciły kredyt niedawno", "Osoby, które chcą sprawdzić umowę", "Osoby, które płaciły wysokie prowizje lub koszty"],
    scopeTitle: "Co obejmuje oferta",
    scope: [{ title: "Analiza umowy", text: "Sprawdzenie zapisów i obowiązków informacyjnych." }, { title: "Ocena naruszeń", text: "Weryfikacja potencjalnych podstaw działania." }, { title: "Symulacja korzyści", text: "Informacja, co może być do odzyskania." }, { title: "Pisma", text: "Przygotowanie oświadczeń, reklamacji lub wezwań." }],
    valueTitle: "Możliwe efekty",
    valueCards: [{ title: "Zwrot części kosztów", text: "Możliwy tylko po analizie konkretnej umowy." }, { title: "Spłata kapitału", text: "Potencjalny scenariusz zależny od oceny prawnej." }, { title: "Świadoma decyzja", text: "Klient zna ryzyka, koszty i dalsze kroki." }],
    processTitle: "Jak wygląda proces",
    process: [{ step: "1", title: "Przesłanie umowy", text: "Możesz zakryć dane, jeśli etap analizy tego nie wymaga." }, { step: "2", title: "Analiza prawna", text: "Sprawdzane są zapisy i potencjalne naruszenia." }, { step: "3", title: "Symulacja", text: "Otrzymujesz informację, co może być do odzyskania." }, { step: "4", title: "Decyzja", text: "Decydujesz, czy chcesz działać dalej." }, { step: "5", title: "Reklamacja lub sąd", text: "Dalsza ścieżka zależy od sprawy i decyzji klienta." }],
    documentsTitle: "Co przygotować",
    documents: ["Umowa kredytowa", "Harmonogram spłaty", "Historia spłat", "Aneksy, jeśli były", "Korespondencja z bankiem"],
    checkpointTitle: "Czy Twoja umowa może się kwalifikować?",
    checkpoints: ["Czy kredyt jest nadal aktywny albo został spłacony niedawno.", "Czy umowa dotyczy kredytu konsumenckiego.", "Czy dostępna jest pełna treść umowy i harmonogram.", "Czy w umowie występują koszty, prowizje lub zapisy wymagające analizy.", "Czy nie upłynęły terminy ograniczające możliwość działania."],
    risksTitle: "Nota prawna",
    risks: [{ title: "Brak gwarancji wyniku", text: "Każda umowa wymaga indywidualnej analizy. Nie każda sprawa kwalifikuje się do skutecznego działania." }],
    faq: [{ question: "Czy mogę zakryć dane osobowe?", answer: "W wielu przypadkach do wstępnej analizy wystarczy treść umowy. Zakres danych zależy od etapu sprawy." }, { question: "Czy każdy kredyt się kwalifikuje?", answer: "Nie. Każda umowa wymaga indywidualnej analizy." }, { question: "Czy sprawa musi trafić do sądu?", answer: "Nie zawsze, ale w części przypadków droga sądowa może być konieczna." }, { question: "Co mogę odzyskać?", answer: "To zależy od treści umowy, kosztów, historii spłaty i oceny prawnej." }],
    finalCta: { title: "Zacznij od umowy", text: "Prześlij umowę kredytową do analizy. Sprawdzimy, czy występują podstawy do dalszego działania.", buttonLabel: "Wyślij umowę" },
    seo: { title: "Sankcja kredytu darmowego - analiza umowy kredytu gotówkowego | Dealshare", description: "Sprawdź, czy Twoja umowa kredytu gotówkowego może zawierać naruszenia i czy możesz odzyskać część kosztów." },
    intro: "To oferta spoza standardowego B2B. Dotyczy spraw indywidualnych i wymaga osobnej kwalifikacji.",
    audience: ["Osoby fizyczne", "Klienci z kredytem do analizy", "Osoby szukające partnera prawnego"],
    benefits: ["Analiza umowy", "Ocena możliwych roszczeń", "Jasna ścieżka dalszych działań"]
  },
  {
    slug: "optymalizacja-kosztow-energii",
    aliases: ["umowy-na-energie"],
    title: "Optymalizacja kosztów energii",
    category: categories.energy.name,
    categorySlug: categories.energy.slug,
    categories: [categories.energy],
    status: "Dostępne",
    headline: "Sprawdź, czy Twoja firma przepłaca za energię.",
    description: "Analiza faktur, umów, opłat handlowych, mocy umownej i energii biernej dla firm.",
    lead: "Analizujemy umowy, faktury, taryfy i opłaty dodatkowe, żeby sprawdzić, czy firma może płacić mniej i lepiej zabezpieczyć koszty energii na przyszłość.",
    highlights: ["Analiza faktur i umowy", "Weryfikacja opłat dodatkowych", "Rekomendacja nowych warunków"],
    heroBenefits: ["Analiza faktur i umowy", "Weryfikacja opłat dodatkowych", "Rekomendacja nowych warunków"],
    ctaPrimary: "Sprawdź rachunki",
    ctaSecondary: "Zobacz proces",
    sidePanel: { title: "Co analizujemy", items: ["Cena energii", "Opłaty handlowe", "Moc umowna", "Energia bierna", "PPE i warunki umowy"], note: "Potencjał oszczędności zależy od zużycia, obecnej umowy i profilu działalności.", cta: "Wyślij fakturę" },
    problemTitle: "Firmy często nie wiedzą, za co dokładnie płacą",
    problemText: ["Wielu przedsiębiorców nie zna realnej ceny za kWh, nie monitoruje opłat handlowych, przekroczeń mocy umownej ani energii biernej.", "Często firma przepłaca nie dlatego, że zużywa za dużo, ale dlatego, że nikt nie zarządza tematem energii."],
    problemCards: [{ title: "Opłaty handlowe", text: "Naliczenia potrafią ukrywać się w strukturze faktury." }, { title: "Moc umowna", text: "Przekroczenia mogą generować dodatkowe koszty." }, { title: "Energia bierna", text: "Często niezauważona, a kosztowna." }],
    solutionTitle: "Analiza kosztów i rekomendacja zmian",
    solutionText: ["Sprawdzamy faktury, umowę, PPE, taryfy i koszty dodatkowe.", "Następnie pokazujemy, czy można zmienić warunki, ograniczyć opłaty, przejść na korzystniejszy model albo zabezpieczyć cenę energii na dłużej."],
    solutionCards: [{ title: "Faktury", text: "Analiza struktury kosztów i zużycia." }, { title: "Umowa", text: "Weryfikacja warunków i opłat." }, { title: "Rekomendacje", text: "Wskazanie możliwych zmian i oszczędności." }],
    forWhomTitle: "Dla kogo",
    forWhom: ["Firmy z wysokimi rachunkami", "Firmy z wieloma PPE", "Przedsiębiorstwa produkcyjne", "Sklepy, magazyny i lokale usługowe", "Firmy, które dawno nie analizowały umowy"],
    scopeTitle: "Co obejmuje oferta",
    scope: [{ title: "Analiza faktur", text: "Sprawdzenie opłat, zużycia i ceny energii." }, { title: "Analiza umowy", text: "Weryfikacja warunków handlowych." }, { title: "Moc i energia bierna", text: "Identyfikacja kosztów technicznych." }, { title: "Propozycja optymalizacji", text: "Wskazanie możliwych zmian." }],
    valueTitle: "Realne korzyści",
    valueCards: [{ title: "Niższe koszty", text: "Możliwość ograniczenia niepotrzebnych opłat." }, { title: "Lepsza kontrola", text: "Firma wie, z czego składa się rachunek." }, { title: "Przewidywalność", text: "Możliwość zabezpieczenia warunków na przyszłość." }],
    processTitle: "Jak wygląda proces",
    process: [{ step: "1", title: "Faktury i umowa", text: "Klient dostarcza podstawowe dokumenty." }, { step: "2", title: "Analiza kosztów", text: "Sprawdzamy strukturę opłat i zużycia." }, { step: "3", title: "Wskazanie problemów", text: "Identyfikujemy ukryte koszty i ryzyka." }, { step: "4", title: "Rekomendacje", text: "Pokazujemy możliwe zmiany." }, { step: "5", title: "Wdrożenie", text: "Wsparcie przy formalnościach i monitoringu efektów." }],
    documentsTitle: "Co przygotować",
    documents: ["Ostatnie faktury za energię", "Aktualna umowa", "Lista PPE", "Informacje o zużyciu", "Korespondencja z dostawcą, jeśli istnieje"],
    checkpointTitle: "Gdzie mogą ukrywać się koszty?",
    checkpoints: ["Opłaty handlowe naliczane za każdy PPE.", "Przekroczenia mocy umownej.", "Energia bierna.", "Nieaktualna albo niekorzystna cena energii.", "Brak stałej ceny przy wysokim zużyciu.", "Brak osoby odpowiedzialnej za bieżące zarządzanie energią."],
    risksTitle: "Nota ostrożności",
    risks: [{ title: "Efekt zależy od danych", text: "Potencjał oszczędności zależy od zużycia, umowy, taryfy, profilu działalności i warunków rynkowych." }],
    faq: [{ question: "Czy zmiana dostawcy oznacza przerwę w dostawie?", answer: "Nie powinna oznaczać przerwy w dostawie energii. Zmienią się warunki handlowe, nie fizyczny dostęp do prądu." }, { question: "Co to jest PPE?", answer: "Punkt Poboru Energii, czyli miejsce, w którym energia jest rozliczana na fakturze." }, { question: "Czy stała cena zawsze się opłaca?", answer: "Nie zawsze. Zależy od profilu zużycia, cen rynkowych i warunków umowy." }, { question: "Czy można usunąć opłaty handlowe?", answer: "W wielu przypadkach można je ograniczyć lub wynegocjować inne warunki, ale zależy to od konkretnej umowy." }],
    finalCta: { title: "Zacznij od faktury", text: "Wyślij aktualną fakturę i umowę. Sprawdzimy, gdzie mogą znajdować się niepotrzebne koszty.", buttonLabel: "Sprawdź rachunki" },
    seo: { title: "Optymalizacja kosztów energii dla firm | Dealshare", description: "Analiza faktur, umów, opłat handlowych, mocy umownej i energii biernej. Sprawdź, czy Twoja firma przepłaca za energię." },
    intro: "Oferta pomaga firmom szybciej przejść od kosztów energii do rozmowy o możliwych rozwiązaniach.",
    audience: ["Firmy z rosnącymi kosztami energii", "Organizacje wielooddziałowe", "Przedsiębiorcy szukający porównania opcji"],
    benefits: ["Lepsza widoczność kosztów", "Priorytetyzacja działań", "Dostęp do właściwych specjalistów"]
  }
];

export const offerStaticSlugs = offers.flatMap((offer) => [offer.slug, ...(offer.aliases ?? [])]);

export function getOfferBySlug(slug: string) {
  return offers.find((offer) => offer.slug === slug || offer.aliases?.includes(slug));
}
