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
    status: "Dostępne",
    headline: "Pozyskaj kapitał bez składania wniosków w ciemno.",
    description: "Finansowanie na rozwój, inwestycje, płynność albo konsolidację. Zaczynamy od analizy i wybieramy kierunek, który realnie zwiększa szanse na dobrą decyzję.",
    lead: "Pozyskaj kapitał na rozwój, inwestycje, płynność albo konsolidację. Zamiast składać wnioski w ciemno, zaczynamy od analizy i wyboru banków, które mają największy sens dla Twojej firmy.",
    highlights: ["Większa szansa na dobrą decyzję", "Dobór banku i produktu do celu finansowania", "Wsparcie w dokumentach i procesie"],
    heroBenefits: ["Analiza sytuacji firmy", "Dobór banku i produktu", "Wsparcie w dokumentach i procesie"],
    ctaPrimary: "Porozmawiajmy o finansowaniu",
    ctaSecondary: "Zobacz proces",
    sidePanel: {
      title: "Szybka kwalifikacja",
      items: ["Wstępna analiza możliwości", "Dobór właściwego kierunku finansowania", "Wsparcie w dokumentach", "Bez składania wniosków w ciemno"],
      note: "Dobrze przygotowany wniosek, jasny cel i właściwy bank zwiększają szansę na sensowną decyzję finansową.",
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
    checkpointTitle: "Co zwiększa szansę na finansowanie",
    checkpointText: ["W finansowaniu firm wygrywa przygotowanie. Dobrze opisany cel, komplet dokumentów, właściwy bank i realny model spłaty potrafią zrobić większą różnicę niż samo oprocentowanie z reklamy."],
    checkpoints: ["Jasny cel finansowania.", "Uporządkowane dokumenty.", "Dobra historia rachunku.", "Właściwie dobrany produkt.", "Realistyczna kwota i okres.", "Wybór banku dopasowanego do profilu firmy."],
    risksTitle: "Co zabezpiecza proces",
    risks: [{ title: "Najpierw kwalifikacja", text: "Analiza celu, dokumentów i profilu firmy pozwala dobrać bank oraz produkt przed złożeniem wniosku." }],
    faq: [
      { question: "Czy analiza jest płatna?", answer: "Nie. Wstępna analiza jest w pełni darmowa dla każdego produktu Dealshare. Najpierw sprawdzamy sytuację, dokumenty albo projekt, a dopiero później pokazujemy możliwe kolejne kroki." },
      { question: "Czy muszę mieć idealną historię kredytową?", answer: "Nie zawsze. Ważniejszy jest pełny obraz sytuacji: przychody, historia rachunku, obecne zobowiązania, cel finansowania i sposób obsługi rat. Dlatego najpierw analizujemy dokumenty i dopiero potem dobieramy kierunek." },
      { question: "Czy obsługujecie JDG?", answer: "Tak, oferta może dotyczyć zarówno jednoosobowych działalności, jak i spółek." },
      { question: "Czy obecne kredyty przekreślają szanse?", answer: "Nie. Obecne zobowiązania mogą być argumentem do konsolidacji albo uporządkowania struktury finansowania. Sprawdzamy ich wysokość, terminowość i wpływ na płynność firmy." }
    ],
    finalCta: { title: "Zacznij od analizy", text: "Opisz cel finansowania i podstawową sytuację firmy. Sprawdzimy, który kierunek ma największy sens.", buttonLabel: "Wyślij zapytanie" },
    seo: { title: "Kredyty dla firm - finansowanie działalności i inwestycji | Dealshare", description: "Pozyskaj finansowanie dla firmy na rozwój, płynność, inwestycje lub konsolidację. Sprawdź możliwości przed złożeniem wniosku." },
    intro: "Oferta pomaga firmom uporządkować potrzeby finansowe i przejść do rozmowy z odpowiednim partnerem.",
    audience: ["JDG i mikrofirmy", "Spółki z o.o.", "Firmy planujące inwestycje"],
    benefits: ["Mniej przypadkowych kontaktów", "Lepsze dopasowanie rozmów", "Oszczędność czasu po stronie przedsiębiorcy"]
  },
  {
    slug: "restrukturyzacje",
    title: "Restrukturyzacje",
    category: categories.legal.name,
    categorySlug: categories.legal.slug,
    categories: [categories.legal],
    status: "Dostępne",
    headline: "Odzyskaj kontrolę nad zadłużeniem, zanim chaos przejmie firmę.",
    description: "Pomagamy firmom odzyskać kontrolę nad zadłużeniem, uporządkować zobowiązania i przygotować realny plan rozmów z wierzycielami.",
    lead: "Restrukturyzacje firm pomagają zatrzymać chaos wierzycieli, uporządkować zobowiązania i przygotować realny plan dalszego działania. Im szybciej firma zacznie działać, tym więcej ma możliwości.",
    highlights: ["Ochrona przed eskalacją zadłużenia","Plan rozmów z wierzycielami","Możliwość odbudowy płynności"],
    heroBenefits: ["Diagnoza zadłużenia", "Propozycje układowe", "Wsparcie w rozmowach z wierzycielami"],
    ctaPrimary: "Sprawdź możliwą ścieżkę",
    ctaSecondary: "Zobacz proces",
    sidePanel: { title: "Szybka diagnoza", items: ["Analiza zadłużenia", "Ocena wierzycieli i egzekucji", "Sprawdzenie możliwości układu", "Plan pierwszych działań"], note: "Szybka diagnoza pomaga wybrać właściwą ścieżkę, zanim presja wierzycieli ograniczy pole manewru.", cta: "Opisz sytuację" },
    problemTitle: "Problem, który rozwiązujemy",
    problemText: ["Problemy finansowe w firmie rzadko pojawiają się z dnia na dzień. Najpierw jest jedna opóźniona płatność, potem bank, leasing, ZUS, urząd skarbowy i coraz mniej miejsca na normalne prowadzenie działalności.", "Największym błędem przedsiębiorcy w kryzysie jest czekanie. Każdy kolejny miesiąc bez działania może oznaczać większą presję wierzycieli i mniejsze pole manewru."],
    problemCards: [{ title: "Presja wierzycieli", text: "Rosnące telefony i wezwania można uporządkować w jeden plan rozmów." }, { title: "Utrata płynności", text: "Firma pracuje, ale nie ma przestrzeni na bieżące regulowanie zobowiązań." }, { title: "Brak planu", text: "Gaszenie pożarów zastępuje decyzje strategiczne." }],
    solutionTitle: "Na czym polega rozwiązanie",
    solutionText: ["Pomagamy ocenić, czy restrukturyzacja jest właściwą ścieżką. Porządkujemy zobowiązania, priorytety działań i możliwe warianty rozmów z wierzycielami.", "Celem jest przygotowanie realnego planu: ochrony firmy, propozycji układowych i dalszych kroków formalnych."],
    solutionCards: [{ title: "Diagnozujemy", text: "Zadłużenie, wierzycieli, egzekucje i płynność." }, { title: "Projektujemy", text: "Możliwe propozycje układowe i plan działania." }, { title: "Prowadzimy", text: "Rozmowy i formalny proces z właściwymi partnerami." }],
    forWhomTitle: "Dla kogo",
    forWhom: ["Firmy z zaległościami", "Przedsiębiorcy pod presją wierzycieli", "Zarządy MŚP", "Firmy z problemem płynności", "Podmioty szukające planu naprawczego"],
    scopeTitle: "Co obejmuje wsparcie",
    scope: [{ title: "Analiza sytuacji", text: "Sprawdzenie zobowiązań, wierzycieli i obszarów wymagających szybkiej decyzji." }, { title: "Ocena ścieżki", text: "Weryfikacja, czy restrukturyzacja ma sens w konkretnej sytuacji." }, { title: "Plan działań", text: "Priorytety, dokumenty i pierwsze kroki." }, { title: "Wsparcie partnerów", text: "Kontakt ze specjalistami od procesu restrukturyzacyjnego." }],
    valueTitle: "Co zyskuje firma",
    valueCards: [{ title: "Porządek", text: "Zamiast chaotycznych decyzji pojawia się plan." }, { title: "Czas na decyzje", text: "Właściwa ścieżka pomaga ograniczyć presję i uporządkować rozmowy." }, { title: "Lepsze pole manewru", text: "Największy potencjał mają firmy, które działają zanim presja wierzycieli zamknie opcje." }],
    processTitle: "Jak wygląda proces",
    process: [{ step: "1", title: "Opis sytuacji", text: "Zbieramy podstawowe informacje o zadłużeniu i presji wierzycieli." }, { step: "2", title: "Dokumenty", text: "Wskazujemy, jakie dane są potrzebne do oceny." }, { step: "3", title: "Diagnoza", text: "Sprawdzamy skalę problemu i możliwe ścieżki." }, { step: "4", title: "Plan", text: "Proponujemy pierwsze działania i warianty rozmów." }, { step: "5", title: "Proces", text: "Wspieramy kontakt z partnerem i dalsze kroki formalne." }],
    documentsTitle: "Co przygotować",
    documents: ["Lista wierzycieli", "Kwoty i terminy zaległości", "Informacje o egzekucjach", "Dokumenty finansowe", "Umowy kredytowe i leasingowe", "Opis bieżącej działalności"],
    checkpointTitle: "Co daje szybkie działanie",
    checkpointText: ["Restrukturyzacja ma największy sens wtedy, gdy firma jeszcze działa, ma przychody i może przedstawić wierzycielom realny plan spłaty. Szybka reakcja zwiększa pole manewru, daje czas na uporządkowanie zobowiązań i pozwala uniknąć chaotycznych decyzji pod presją."],
    checkpoints: ["Więcej czasu na rozmowy z wierzycielami.","Większa szansa na układ.","Ochrona wartości firmy.","Uporządkowanie zobowiązań.","Ograniczenie presji egzekucyjnej.","Możliwość dalszego prowadzenia działalności."],
    risksTitle: "Jak odzyskać kontrolę nad zadłużeniem",
    risks: [{"title":"Plan zamiast chaosu","text":"Najpierw porządkujemy liczby, wierzycieli i priorytety, a potem dobieramy ścieżkę rozmów oraz działań formalnych."}],
    faq: [{"question":"Czy restrukturyzacja oznacza upadłość?","answer":"Nie. Restrukturyzacja jest właśnie po to, żeby uniknąć upadłości i dać firmie szansę na porozumienie z wierzycielami. To plan naprawczy, nie koniec działalności."},{"question":"Czy firma może dalej działać?","answer":"Tak, taki jest cel. Restrukturyzacja ma pomóc firmie kontynuować działalność, uporządkować zobowiązania i odzyskać kontrolę nad płynnością."},{"question":"Czy trzeba mieć komplet dokumentów?","answer":"Na start wystarczy opis sytuacji i lista najważniejszych zobowiązań. Komplet dokumentów pozwala później przygotować dokładniejszy plan."},{"question":"Ile trwa przygotowanie pierwszej oceny?","answer":"Pierwszą ocenę można przygotować sprawnie po zebraniu podstawowych informacji o zadłużeniu, wierzycielach i bieżących przychodach."}],
    finalCta: { title: "Zacznij od diagnozy", text: "Opisz zadłużenie, presję wierzycieli i bieżącą sytuację firmy. Sprawdzimy, jaka ścieżka jest realna.", buttonLabel: "Opisz sytuację" },
    seo: { title: "Restrukturyzacje firm - plan naprawczy i rozmowy z wierzycielami | Dealshare", description: "Odzyskaj kontrolę nad zadłużeniem firmy. Sprawdź plan rozmów z wierzycielami, płynność i możliwe działania naprawcze." },
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
    description: "Inwestycja w zaplecze obliczeniowe dla rynku AI. Model oparty na realnej infrastrukturze, obsłudze technicznej po stronie partnera i warunkach kontraktowych.",
    lead: "Model inwestycyjny opiera się na infrastrukturze GPU pracującej na potrzeby rynku AI i usług obliczeniowych. Inwestor finansuje aktywo, a obsługa techniczna i komercyjna znajduje się po stronie partnerów projektu.",
    highlights: ["Ekspozycja na rynek AI i mocy obliczeniowej","Model oparty na realnej infrastrukturze","Obsługa techniczna po stronie partnera"],
    heroBenefits: ["Ekspozycja na infrastrukturę AI", "Weryfikacja modelu operacyjnego", "Rozmowa z właściwym partnerem"],
    ctaPrimary: "Poznaj projekt GPU",
    ctaSecondary: "Zobacz proces",
    sidePanel: { title: "Co sprawdzamy", items: ["Operator i doświadczenie", "Koszty energii i chłodzenia", "Sprzęt i cykl życia", "Umowy i potencjalni odbiorcy"], note: "Parametry projektu mają charakter informacyjny i wymagają weryfikacji dokumentów.", cta: "Zapytaj o projekt" },
    problemTitle: "Okazja rynkowa",
    problemText: ["Firmy potrzebują coraz większej mocy obliczeniowej, ale sam zakup sprzętu nie tworzy jeszcze biznesu.", "Znaczenie mają dostęp do energii, chłodzenie, serwis, oprogramowanie, sprzedaż mocy oraz jakość operatora."],
    problemCards: [{ title: "CAPEX sprzętu", text: "GPU szybko się starzeją i wymagają dobrego planu amortyzacji." }, { title: "Energia i chłodzenie", text: "Koszty operacyjne mogą zdecydować o opłacalności." }, { title: "Komercjalizacja", text: "Bez odbiorców mocy infrastruktura pozostaje kosztem." }],
    solutionTitle: "Jak porządkujemy temat",
    solutionText: ["Pomagamy przejść od ogólnej prezentacji projektu do konkretnej listy pytań i danych do analizy.", "Weryfikujemy operatora, sprzęt, koszty, umowy i model przychodów, żeby inwestor widział konstrukcję projektu przed rozmową o kapitale."],
    solutionCards: [{ title: "Analiza operatora", text: "Doświadczenie, partnerzy i model zarządzania." }, { title: "Model kosztów", text: "Energia, chłodzenie, serwis, hosting i obsługa." }, { title: "Model przychodów", text: "Najem mocy, kontrakty, usługi obliczeniowe." }],
    forWhomTitle: "Dla kogo",
    forWhom: ["Inwestorzy biznesowi", "Firmy technologiczne", "Partnerzy infrastrukturalni", "Podmioty szukające ekspozycji na AI", "Osoby szukające infrastruktury obsługiwanej przez partnera"],
    scopeTitle: "Co obejmuje projekt",
    scope: [{ title: "Opis infrastruktury", text: "Zakres sprzętu, zaplecza i operatora." }, { title: "Analiza kosztów", text: "Najważniejsze koszty operacyjne i techniczne." }, { title: "Weryfikacja modelu", text: "Pytania o odbiorców, umowy i utrzymanie." }, { title: "Wsparcie decyzji", text: "Uporządkowanie materiałów przed rozmową inwestycyjną." }],
    valueTitle: "Modelowe pakiety inwestycyjne",
    valueCards: [{ title: "Pakiet 125 000 zł", text: "Modelowy pakiet z miesięcznym przychodem 4 150 zł przez 60 miesięcy. Parametry zależą od wariantu i warunków umowy." }, { title: "Pakiet 250 000 zł", text: "Modelowy pakiet z miesięcznym przychodem 8 300 zł przez 60 miesięcy. Parametry zależą od wariantu i warunków umowy." }, { title: "Obsługa partnera", text: "Techniczne utrzymanie, środowisko IT i komercjalizacja są po stronie partnerów projektu." }],
    processTitle: "Jak wygląda proces",
    process: [{ step: "1", title: "Rozmowa o projekcie", text: "Ustalamy, jakiego wariantu dotyczy zainteresowanie." }, { step: "2", title: "Materiały", text: "Zbieramy informacje o sprzęcie, kosztach i operatorze." }, { step: "3", title: "Weryfikacja pytań", text: "Ustalamy, co wymaga wyjaśnienia przed decyzją." }, { step: "4", title: "Rozmowa z partnerem", text: "Przechodzimy do szczegółów projektu." }, { step: "5", title: "Decyzja", text: "Inwestor podejmuje decyzję po analizie dokumentów." }],
    documentsTitle: "Co przygotować",
    documents: ["Preferowana kwota inwestycji", "Horyzont inwestycyjny", "Pytania techniczne", "Informacje o źródle finansowania", "Oczekiwany poziom zaangażowania"],
    checkpointTitle: "Punkty kontrolne przed decyzją",
    checkpoints: ["Kto jest operatorem i jakie ma doświadczenie.", "Jak zabezpieczone są koszty energii i chłodzenia.", "Czy istnieją umowy lub realna ścieżka sprzedaży mocy.", "Jak wygląda serwis, awaryjność i cykl życia sprzętu.", "Czy model finansowy uwzględnia wymianę sprzętu."],
    risksTitle: "Co zabezpiecza model inwestycyjny",
    risks: [{"title":"Realna infrastruktura i kontrakt","text":"Model opiera się na realnej infrastrukturze GPU, warunkach kontraktowych i obsłudze technicznej po stronie partnerów projektu."}],
    faq: [{"question":"Czy to inwestycja w AI?","answer":"To ekspozycja na infrastrukturę obliczeniową pracującą dla rynku AI, renderingu i usług wymagających wysokiej mocy GPU."},{"question":"Co zabezpiecza model inwestycyjny?","answer":"Model opiera się na realnej infrastrukturze GPU, warunkach kontraktowych i obsłudze technicznej po stronie partnerów projektu. Inwestor nie musi samodzielnie zarządzać serwerami, szukać klientów ani utrzymywać środowiska IT."},{"question":"Jakie są przykładowe warianty?","answer":"Modelowe pakiety to 125 000 zł z miesięcznym przychodem 4 150 zł przez 60 miesięcy oraz 250 000 zł z miesięcznym przychodem 8 300 zł przez 60 miesięcy. Szczegóły zależą od wariantu i umowy."},{"question":"Czy trzeba znać technologię?","answer":"Nie. Techniczna obsługa jest po stronie partnera, a inwestor weryfikuje model, dokumenty i zakres odpowiedzialności stron."}],
    finalCta: { title: "Sprawdź projekt GPU", text: "Zacznij od analizy operatora, kosztów, sprzętu i modelu sprzedaży mocy obliczeniowej.", buttonLabel: "Zapytaj o szczegóły" },
    seo: { title: "Infrastruktura GPU - projekt inwestycyjny i zaplecze obliczeniowe | Dealshare", description: "Sprawdź projekt infrastruktury GPU, model kosztów, operatora, kontrakty i potencjalne źródła wartości." },
    intro: "Oferta dla firm i partnerów, którzy chcą poznać kontekst inwestycji w infrastrukturę obliczeniową.",
    audience: ["Inwestorzy biznesowi", "Firmy technologiczne", "Partnerzy infrastrukturalni"],
    benefits: ["Dostęp do kontekstu", "Lepsza kwalifikacja rozmów", "Weryfikacja niszowego obszaru inwestycji"]
  },
  {
    slug: "farma-pv-bess",
    aliases: ["farmy-energii"],
    title: "Farmy i magazyny energii",
    category: categories.investments.name,
    categorySlug: categories.investments.slug,
    categories: [categories.investments],
    status: "Nowe",
    headline: "Farma PV + BESS: fotowoltaika, magazyn energii i aktywne zarządzanie energią w jednym projekcie.",
    description: "Projekt PV + BESS łączący fotowoltaikę, magazyn energii, arbitraż cenowy i usługi systemowe. Energia, elastyczność i trading w jednym modelu.",
    lead: "Farma PV + BESS łączy produkcję energii z fotowoltaiki, magazynowanie, arbitraż cenowy i usługi systemowe. Dzięki temu projekt nie opiera się wyłącznie na sprzedaży energii z PV, ale na kilku strumieniach wartości.",
    highlights: ["1 MWp PV + 4 MW / 4 MWh BESS","EBITDA 1,0-1,2 mln zł rocznie według modelu","Payback 4-5 lat"],
    heroBenefits: ["1 MWp fotowoltaiki i 4 MW / 4 MWh magazynu energii","Trzy źródła przychodów: PV, arbitraż BESS, usługi systemowe","Aktywne zarządzanie przez EMS / SCADA i współpracę z agregatorem"],
    ctaPrimary: "Porozmawiaj o projekcie",
    ctaSecondary: "Zobacz proces",
    sidePanel: { title: "Parametry do analizy", items: ["CAPEX: 4,6 mln zł", "Prognozowana EBITDA: 1,0-1,2 mln zł rocznie", "Payback: 4-5 lat", "IRR: 18-25%+", "Asset: PV + BESS + trading"], note: "Parametry finansowe są modelowe i pokazują potencjał projektu po weryfikacji dokumentów, przyłącza oraz współpracy z agregatorem.", cta: "Wyślij zapytanie" },
    problemTitle: "Dlaczego to ma znaczenie",
    problemText: ["Klasyczna farma PV jest mocno zależna od produkcji i ceny sprzedaży energii w godzinach dziennych.", "Magazyn energii może zmienić charakter projektu, ale tylko wtedy, gdy model pracy BESS, agregator i koszty są realnie policzone."],
    problemCards: [{ title: "Ceny energii", text: "Przychody zależą od rynku i spreadów cenowych." }, { title: "Regulacje", text: "Usługi systemowe i zasady rynku mogą się zmieniać." }, { title: "Operacje", text: "SCADA, serwis, sprawność i dostępność mają wpływ na wynik." }],
    solutionTitle: "Model projektu",
    solutionText: ["Projekt zakłada połączenie produkcji energii z PV, magazynowania i aktywnego zarządzania energią.", "Wartość powinna być oceniana przez CAPEX, przyłączenie, model tradingowy, umowę z agregatorem, prognozy, zabezpieczenia operacyjne i model agregatora."],
    solutionCards: [{ title: "PV", text: "Produkcja energii i sprzedaż do rynku lub odbiorców." }, { title: "BESS", text: "Magazynowanie, arbitraż i elastyczność pracy." }, { title: "Agregator", text: "Dostęp do usług systemowych i zarządzania energią." }],
    forWhomTitle: "Dla kogo",
    forWhom: ["Inwestorzy zainteresowani energetyką", "Podmioty szukające dywersyfikacji przychodów energetycznych", "Firmy szukające projektów OZE", "Inwestorzy analizujący aktywa infrastrukturalne"],
    scopeTitle: "Co obejmuje projekt",
    scope: [{ title: "Opis aktywa", text: "Farma PV, magazyn energii i komponenty techniczne." }, { title: "Model finansowy", text: "Założenia przychodów, kosztów i EBITDA do weryfikacji." }, { title: "Analiza ryzyk", text: "Ceny, regulacje, operacje, agregator i przyłączenie." }, { title: "Scenariusz wyjścia", text: "Modelowa wartość działającego aktywa przy odpowiednich parametrach." }],
    valueTitle: "Trzy strumienie wartości",
    valueText: ["Projekt może tworzyć wartość przez kilka strumieni, ale każdy z nich wymaga potwierdzenia w dokumentach i umowach."],
    valueCards: [{ title: "Sprzedaż energii z PV", text: "Potencjalny przychód z produkcji energii." }, { title: "Arbitraż cenowy", text: "Wykorzystanie różnic cen dzięki magazynowi energii." }, { title: "Usługi systemowe", text: "Możliwy udział w usługach we współpracy z agregatorem." }, { title: "Wartość aktywa", text: "Działający asset może mieć wartość przy stabilnej EBITDA i dokumentacji." }],
    processTitle: "Jak wygląda proces",
    process: [{ step: "1", title: "Rozmowa o projekcie", text: "Ustalamy zakres i poziom zainteresowania." }, { step: "2", title: "Materiały", text: "Analizujemy CAPEX, przyłączenie, technologię i model." }, { step: "3", title: "Pytania kontrolne", text: "Weryfikujemy najważniejsze założenia." }, { step: "4", title: "Rozmowa z partnerem", text: "Przechodzimy do dokumentów i szczegółów." }, { step: "5", title: "Decyzja", text: "Kapitał dopiero po analizie ryzyk i założeń." }],
    documentsTitle: "Co przygotować",
    documents: ["Preferowana kwota inwestycji", "Horyzont inwestycyjny", "Pytania o CAPEX i przyłączenie", "Oczekiwany horyzont i model zaangażowania", "Informacje o źródle finansowania"],
    checkpointTitle: "Punkty kontrolne przed decyzją",
    checkpoints: ["Czy projekt ma umowę z agregatorem albo realny plan jej uzyskania.","Czy magazyn energii jest operacyjnym centrum projektu.","Czy dokumentacja techniczna i finansowa pozwala zweryfikować założenia.","Czy założenia EBITDA uwzględniają koszty operacyjne, serwis i trading.","Czy scenariusz wyjścia pokazuje wartość działającego assetu."],
    risksTitle: "Co wzmacnia projekt PV + BESS",
    risks: [{"title":"Trzy strumienie przychodów","text":"PV, arbitraż BESS i usługi systemowe dają więcej elastyczności niż klasyczna farma fotowoltaiczna."},{"title":"Magazyn energii jako centrum elastyczności","text":"BESS pozwala reagować na ceny i wykorzystywać różnice między godzinami niskich i wysokich cen."},{"title":"EMS, SCADA i agregator","text":"Aktywne zarządzanie, monitoring 24/7 i współpraca z agregatorem wzmacniają operacyjny model projektu."},{"title":"Potencjał wyjścia","text":"Szacowana wartość projektu jako działającego assetu to 6-10 mln zł+ przy potwierdzonych parametrach operacyjnych."}],
    faq: [{"question":"Czy to zwykła farma fotowoltaiczna?","answer":"Nie. To projekt PV + BESS, czyli farma fotowoltaiczna połączona z magazynem energii i aktywnym zarządzaniem. Klasyczna farma produkuje energię, a PV + BESS pozwala również magazynować, optymalizować i sprzedawać energię w bardziej korzystnych momentach."},{"question":"Skąd pochodzi przychód?","answer":"Model zakłada trzy źródła przychodów: sprzedaż energii z PV, arbitraż cenowy realizowany przez magazyn energii oraz udział w usługach systemowych we współpracy z agregatorem."},{"question":"Czy EBITDA jest gwarantowana?","answer":"EBITDA 1,0-1,2 mln zł rocznie to prognoza modelowa projektu. Jej siła polega na dywersyfikacji źródeł przychodu: PV, BESS i usług systemowych. Przed decyzją weryfikujemy dokumentację, parametry techniczne, przyłącze i model współpracy z agregatorem."},{"question":"Jak projekt ogranicza zależność od samej fotowoltaiki?","answer":"Dzięki magazynowi energii projekt nie musi opierać się wyłącznie na sprzedaży prądu z PV w godzinach produkcji. BESS pozwala wykorzystywać arbitraż cenowy, a współpraca z agregatorem otwiera drogę do usług systemowych."}],
    finalCta: { title: "Zacznij od analizy projektu", text: "Najpierw sprawdź CAPEX, przyłączenie, model tradingowy, agregatora, model PV + BESS i scenariusz wyjścia. Potem decyzja.", buttonLabel: "Porozmawiaj o projekcie" },
    seo: { title: "Farma PV + BESS - inwestycja w fotowoltaikę i magazyn energii | Dealshare", description: "Projekt inwestycyjny łączący farmę fotowoltaiczną, magazyn energii, trading energią i usługi systemowe." },
    intro: "Oferta porządkuje pierwszy kontakt dla podmiotów zainteresowanych projektami energetycznymi.",
    audience: ["Inwestorzy", "Firmy zainteresowane OZE", "Partnerzy rozwijający projekty energetyczne"],
    benefits: ["Jasniejszy kontekst projektu", "Mniej rozproszonych rozmów", "Dostęp do wybranych możliwości"]
  },
  {
    slug: "kontrakty-flotowe",
    title: "Kontrakty flotowe",
    category: categories.contracts.name,
    categorySlug: categories.contracts.slug,
    categories: [categories.contracts],
    status: "Dostępne",
    headline: "Zainwestuj w działający sektor mobilności, wynajmu i zarządzania flotą.",
    description: "Model oparty na pojazdach pracujących w zarządzanej flocie. Operator odpowiada za obsługę, serwis i wykorzystanie pojazdów, a inwestor korzysta z warunków kontraktu.",
    lead: "Zainwestuj w pojazdy pracujące w profesjonalnie zarządzanej flocie. Operator bierze na siebie obsługę, serwis, kierowców, rozliczenia i bieżące wykorzystanie pojazdów, a inwestor działa w oparciu o warunki zapisane w kontrakcie.",
    highlights: ["Zarządzanie flotą po stronie operatora","Zabezpieczenie pojazdami","Przychód określony warunkami kontraktu"],
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
    valueTitle: "Co zabezpiecza inwestora",
    valueText: ["Model flotowy opiera się na prostym założeniu: inwestor nie buduje samodzielnie firmy transportowej, tylko wchodzi w projekt obsługiwany przez operatora. To operator odpowiada za wykorzystanie pojazdów, kontakt z kierowcami, serwis, rotację, rozliczenia i bieżące zarządzanie flotą."],
    valueCards: [{ title: "Pojazdy jako realne aktywo", text: "Za projektem stoi fizyczny składnik majątku, a nie wyłącznie obietnica przyszłych przychodów." }, { title: "Kontrakt", text: "Warunki współpracy, odpowiedzialność stron i model rozliczeń są określone w umowie." }, { title: "Operator", text: "Obsługa, kierowcy, serwis i bieżące problemy pozostają po stronie operatora." }],
    processTitle: "Jak wygląda proces",
    process: [{ step: "1", title: "Rozmowa o modelu", text: "Przedstawienie charakteru inwestycji." }, { step: "2", title: "Prezentacja operatora", text: "Omówienie skali, floty i zaplecza." }, { step: "3", title: "Wariant inwestycyjny", text: "Kwota, horyzont i struktura." }, { step: "4", title: "Analiza dokumentów", text: "Weryfikacja danych i założeń." }, { step: "5", title: "Finalizacja", text: "Operacyjne uruchomienie lub objęcie udziału." }],
    documentsTitle: "Co przygotować",
    documents: ["Preferowana kwota inwestycji", "Oczekiwany horyzont", "Informacja o źródle finansowania", "Pytania o operatora i umowy"],
    checkpointTitle: "Punkty kontrolne przed decyzją",
    checkpoints: ["Kto jest operatorem floty i jakie ma doświadczenie.", "Jak wygląda obłożenie pojazdów.", "Jakie są koszty serwisu, szkód i przestojów.", "Jakie są umowy z kierowcami, platformami albo klientami.", "Jak wygląda scenariusz wyjścia lub odsprzedaży aktywów."],
    risksTitle: "Ryzyka operacyjne po stronie operatora",
    risks: [{"title":"Bezobsługowy model dla inwestora","text":"Zarządzanie flotą, serwis, kierowcy, rozliczenia i wykorzystanie pojazdów są po stronie operatora. Inwestor korzysta z modelu określonego kontraktem."}],
    faq: [{"question":"Czy sam zarządzam pojazdami?","answer":"Nie. Właśnie na tym polega przewaga tego modelu. Operacyjne zarządzanie flotą jest po stronie operatora: pojazdy, kierowcy, serwis, rozliczenia, wykorzystanie floty i bieżące problemy. Inwestor nie musi samodzielnie zajmować się flotą."},{"question":"Skąd pochodzą przychody?","answer":"Z modelu pracy pojazdów w zarządzanej flocie oraz warunków określonych w kontrakcie. Operator odpowiada za operacyjne wykorzystanie aktywów."},{"question":"Jak ograniczone są ryzyka operacyjne?","answer":"Ryzyka operacyjne są przeniesione na operatora i ograniczane przez profesjonalne zarządzanie flotą, umowy, serwis, kontrolę wykorzystania pojazdów oraz bieżącą obsługę kierowców."},{"question":"Czy inwestycja jest zabezpieczona pojazdami?","answer":"Tak. Model zakłada zabezpieczenie aktywem w postaci pojazdów. To ważna przewaga nad inwestycjami opartymi wyłącznie na obietnicy przyszłych przychodów."}],
    finalCta: { title: "Sprawdź model flotowy", text: "Zanim wejdziesz w projekt, sprawdź operatora, flotę, koszty, umowy i zabezpieczenia.", buttonLabel: "Zapytaj o szczegóły" },
    seo: { title: "Kontrakty flotowe - inwestycja w mobilność i zarządzanie flotą | Dealshare", description: "Projekt inwestycyjny związany z flotą, wynajmem pojazdów, logistyką i obsługą kierowców." },
    intro: "Pomagamy uporządkować rozmowy wokół kontraktów flotowych i dopasować strony do konkretnego zapotrzebowania.",
    audience: ["Inwestorzy", "Firmy flotowe", "Partnerzy operacyjni"],
    benefits: ["Konkretniejsze rozmowy", "Lepsza jakość leadów", "Szybsza ocena potencjału"]
  },
  {
    slug: "sankcja-kredytu-darmowego",
    aliases: ["uniewaznienia-kredytow"],
    title: "Unieważnienia kredytów",
    category: categories.legal.name,
    categorySlug: categories.legal.slug,
    categories: [categories.legal, categories.individual],
    isIndividual: true,
    status: "Dostępne",
    headline: "Sprawdź, czy bank naruszył przepisy i czy możesz odzyskać nawet 100% kosztów kredytu.",
    description: "Sprawdź, czy bank naruszył przepisy i czy możesz odzyskać nawet 100% odsetek, prowizji oraz kosztów poza pożyczonym kapitałem.",
    lead: "Jeśli bank naruszył przepisy przy udzielaniu kredytu konsumenckiego, możesz odzyskać nawet 100% odsetek, prowizji i kosztów poza pożyczonym kapitałem. Sprawdzimy Twoją umowę i pokażemy, ile realnie możesz zyskać.",
    highlights: ["Nawet 100% kosztów kredytu do odzyskania","Analiza umowy bez zobowiązań","Możliwość spłaty samego kapitału przy aktywnym kredycie"],
    heroBenefits: ["Zwrot odsetek, prowizji i kosztów poza kapitałem","Możliwość dalszej spłaty samego kapitału","Bezpłatna wstępna analiza umowy"],
    ctaPrimary: "Wyślij umowę do analizy",
    ctaSecondary: "Zobacz proces",
    sidePanel: { title: "Co sprawdzamy", items: ["Umowa kredytowa", "Koszty i prowizje", "Obowiązki informacyjne banku", "Możliwe roszczenia"], note: "Na start sprawdzamy dokumenty i pokazujemy potencjalną kwotę do odzyskania oraz dalszą ścieżkę działania.", cta: "Wyślij umowę" },
    problemTitle: "Problem, którego wielu klientów nie zna",
    problemText: ["Wiele umów kredytów konsumenckich może zawierać błędy albo naruszenia obowiązków informacyjnych.", "Klient często nie wie, że bank mógł nieprawidłowo przedstawić koszty, prowizje, RRSO albo inne elementy umowy."],
    problemCards: [{ title: "Ukryte naruszenia", text: "Błędy mogą znajdować się w szczegółach umowy." }, { title: "Koszty i prowizje", text: "Wymagają dokładnej analizy prawnej." }, { title: "Terminy", text: "Daty i dokumenty pomagają szybko ustalić najlepszą ścieżkę działania." }],
    solutionTitle: "Analiza umowy i możliwe działania",
    solutionText: ["Analizujemy umowę kredytową, sprawdzamy potencjalne naruszenia i przedstawiamy możliwe roszczenia, koszty, możliwe efekty i ścieżkę działania."],
    solutionCards: [{ title: "Analiza", text: "Sprawdzenie umowy, harmonogramu i kosztów." }, { title: "Ocena", text: "Wskazanie potencjalnych naruszeń." }, { title: "Działania", text: "Reklamacja, oświadczenia lub dalsza ścieżka." }],
    forWhomTitle: "Dla kogo",
    forWhom: ["Osoby z aktywnym kredytem gotówkowym", "Osoby, które spłaciły kredyt niedawno", "Osoby, które chcą sprawdzić umowę", "Osoby, które płaciły wysokie prowizje lub koszty"],
    scopeTitle: "Co obejmuje oferta",
    scope: [{ title: "Analiza umowy", text: "Sprawdzenie zapisów i obowiązków informacyjnych." }, { title: "Ocena naruszeń", text: "Weryfikacja potencjalnych podstaw działania." }, { title: "Symulacja korzyści", text: "Informacja, co może być do odzyskania." }, { title: "Pisma", text: "Przygotowanie oświadczeń, reklamacji lub wezwań." }],
    valueTitle: "Co możesz odzyskać",
    valueText: ["Możesz odzyskać nawet 100% odsetek, prowizji i innych kosztów kredytu poza pożyczonym kapitałem. W przypadku aktywnego kredytu możliwa jest również dalsza spłata samego kapitału bez kosztów banku. Dokładną kwotę pokazuje analiza umowy, historii spłat i dokumentów."],
    valueCards: [{ title: "Zwrot kosztów", text: "Nawet 100% odsetek, prowizji i opłat poza kapitałem." }, { title: "Aktywny kredyt", text: "Możliwa dalsza spłata samego kapitału, jeśli analiza potwierdzi podstawy." }, { title: "Szybka analiza", text: "Najpierw sprawdzamy umowę i pokazujemy potencjał roszczenia." }],
    processTitle: "Jak wygląda proces",
    process: [{ step: "1", title: "Przesłanie umowy", text: "Możesz zakryć dane, jeśli etap analizy tego nie wymaga." }, { step: "2", title: "Analiza prawna", text: "Sprawdzane są zapisy i potencjalne naruszenia." }, { step: "3", title: "Symulacja", text: "Otrzymujesz informację, co może być do odzyskania." }, { step: "4", title: "Decyzja", text: "Decydujesz, czy chcesz działać dalej." }, { step: "5", title: "Reklamacja lub sąd", text: "Dalszą ścieżkę dobieramy do dokumentów, stanowiska banku i decyzji klienta." }],
    documentsTitle: "Co przygotować",
    documents: ["Umowa kredytowa", "Harmonogram spłaty", "Historia spłat", "Aneksy, jeśli były", "Korespondencja z bankiem"],
    checkpointTitle: "Czy Twoja umowa może się kwalifikować?",
    checkpoints: ["Czy kredyt jest nadal aktywny albo został spłacony niedawno.", "Czy umowa dotyczy kredytu konsumenckiego.", "Czy dostępna jest pełna treść umowy i harmonogram.", "Czy w umowie występują koszty, prowizje lub zapisy wymagające analizy.", "Czy nie upłynęły terminy ograniczające możliwość działania."],
    risksTitle: "Czy Twoja umowa może się kwalifikować?",
    risks: [{"title":"Wystarczy umowa","text":"Na start sprawdzamy treść umowy, koszty, harmonogram i sposób przedstawienia warunków kredytu. Dane osobowe możesz zakryć na etapie wstępnej analizy."}],
    faq: [{"question":"Co mogę odzyskać?","answer":"Nawet 100% odsetek, prowizji i kosztów poza pożyczonym kapitałem. Przy aktywnym kredycie możliwa może być także dalsza spłata samego kapitału. Dokładną kwotę pokazujemy po analizie umowy i historii spłat."},{"question":"Czy każdy kredyt się kwalifikuje?","answer":"Nie każdy, ale wiele umów kredytów konsumenckich zawiera błędy, które mogą otwierać drogę do sankcji kredytu darmowego. Wystarczy przesłać umowę, a sprawdzimy podstawy do działania."},{"question":"Czy muszę podawać dane osobowe?","answer":"Na etapie wstępnej analizy możesz zakryć dane osobowe. Interesuje nas przede wszystkim treść umowy, koszty, harmonogram i sposób przedstawienia warunków kredytu."},{"question":"Czy sprawa musi trafić do sądu?","answer":"Nie zawsze. Zaczynamy od analizy, oświadczenia i wezwania do banku. Jeśli bank nie uzna roszczeń dobrowolnie, omawiamy dalszą ścieżkę i potencjalne postępowanie sądowe."},{"question":"Ile trwa analiza?","answer":"Wstępną ocenę można przygotować szybko po otrzymaniu umowy i podstawowych dokumentów. Im pełniejszy komplet dokumentów, tym dokładniejsza symulacja kwoty do odzyskania."}],
    finalCta: { title: "Zacznij od umowy", text: "Prześlij umowę kredytową do analizy. Sprawdzimy, czy występują podstawy do dalszego działania.", buttonLabel: "Wyślij umowę" },
    seo: { title: "Unieważnienia kredytów - analiza umowy i odzyskanie kosztów | Dealshare", description: "Sprawdź, czy możesz odzyskać nawet 100% odsetek, prowizji i kosztów poza pożyczonym kapitałem." },
    intro: "To oferta spoza standardowego B2B. Dotyczy spraw indywidualnych i wymaga osobnej kwalifikacji.",
    audience: ["Osoby fizyczne", "Klienci z kredytem do analizy", "Osoby szukające partnera prawnego"],
    benefits: ["Analiza umowy", "Ocena możliwych roszczeń", "Jasna ścieżka dalszych działań"]
  },
  {
    slug: "optymalizacja-kosztow-energii",
    aliases: ["umowy-na-energie"],
    title: "Umowy na energię",
    category: categories.energy.name,
    categorySlug: categories.energy.slug,
    categories: [categories.energy],
    status: "Dostępne",
    headline: "Sprawdź, czy Twoja firma przepłaca za energię.",
    description: "Analiza faktur, umów i opłat dodatkowych, żeby znaleźć oszczędności i zabezpieczyć firmę przed niekontrolowanymi kosztami energii.",
    lead: "Sprawdzamy faktury, umowy, taryfy i opłaty dodatkowe, żeby znaleźć realne oszczędności i lepiej zabezpieczyć koszty energii na przyszłość.",
    highlights: ["Stała cena energii nawet na 5 lat","Eliminacja zbędnych opłat handlowych","Analiza mocy umownej i energii biernej"],
    heroBenefits: ["Analiza faktur i umowy", "Weryfikacja opłat dodatkowych", "Rekomendacja nowych warunków"],
    ctaPrimary: "Sprawdź rachunki",
    ctaSecondary: "Zobacz proces",
    sidePanel: { title: "Co analizujemy", items: ["Cena energii", "Opłaty handlowe", "Moc umowna", "Energia bierna", "PPE i warunki umowy"], note: "Analiza pokazuje, gdzie firma może odzyskać kontrolę nad opłatami, ceną energii i kosztami dodatkowymi.", cta: "Wyślij fakturę" },
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
    process: [{ step: "1", title: "Faktury i umowa", text: "Klient dostarcza podstawowe dokumenty." }, { step: "2", title: "Analiza kosztów", text: "Sprawdzamy strukturę opłat i zużycia." }, { step: "3", title: "Wskazanie problemów", text: "Identyfikujemy ukryte koszty, zbędne opłaty i obszary do negocjacji." }, { step: "4", title: "Rekomendacje", text: "Pokazujemy możliwe zmiany." }, { step: "5", title: "Wdrożenie", text: "Wsparcie przy formalnościach i monitoringu efektów." }],
    documentsTitle: "Co przygotować",
    documents: ["Ostatnie faktury za energię", "Aktualna umowa", "Lista PPE", "Informacje o zużyciu", "Korespondencja z dostawcą, jeśli istnieje"],
    checkpointTitle: "Gdzie uciekają pieniądze na energii",
    checkpointText: ["Firmy często przepłacają nie dlatego, że zużywają za dużo energii, ale dlatego, że nikt nie kontroluje umowy, opłat handlowych, mocy umownej, energii biernej i zmian cen. Jedna analiza faktur potrafi pokazać koszty, które przez lata były traktowane jak normalne."],
    checkpoints: ["Opłaty handlowe naliczane za każdy PPE.","Przekroczenia mocy umownej.","Energia bierna.","Nieaktualna albo niekorzystna cena energii.","Brak stałej ceny przy wysokim zużyciu.","Brak osoby odpowiedzialnej za bieżące zarządzanie energią."],
    risksTitle: "Co zabezpiecza firmę przed kosztami",
    risks: [{"title":"Kontrola warunków","text":"Analiza faktur, taryf, PPE, mocy umownej i opłat handlowych pomaga wyłapać koszty, które można ograniczyć albo renegocjować."}],
    faq: [{"question":"Czy zmiana warunków oznacza przerwę w dostawie energii?","answer":"Nie. Zmiana warunków handlowych albo dostawcy nie oznacza przerwy w dostawie energii. Proces odbywa się formalnie, a energia nadal płynie tymi samymi liniami."},{"question":"Co to jest PPE?","answer":"Punkt Poboru Energii, czyli miejsce, w którym energia jest rozliczana na fakturze. Przy wielu PPE opłaty handlowe i warunki umowy potrafią istotnie wpływać na koszt."},{"question":"Czy stała cena energii zawsze się opłaca?","answer":"Stała cena daje firmie przewidywalność i ochronę budżetu. Najpierw sprawdzamy zużycie, profil działalności i obecne warunki, żeby ocenić, czy taki model będzie korzystny w danej sytuacji."},{"question":"Czy można usunąć opłaty handlowe?","answer":"W wielu przypadkach można je ograniczyć albo zastąpić lepszymi warunkami. Najpierw sprawdzamy faktury i umowę, a potem wskazujemy realne pole do negocjacji."}],
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
