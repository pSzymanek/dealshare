import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin korzystania z serwisu dealshare.",
  alternates: {
    canonical: "/regulamin"
  }
};

const operator = "Michał Szwankowski, 41-503 Chorzów, ul. Narutowicza 15, NIP: 6272468482";

const sections = [
  {
    title: "1. Postanowienia ogólne",
    content: [
      "Regulamin określa zasady korzystania z serwisu internetowego dealshare dostępnego pod adresem dealshare.pl.",
      "Serwis prezentuje oferty i umożliwia wysyłanie zgłoszeń, korzystanie z konta, opisywanie potrzeb firmy oraz przedstawianie propozycji współpracy."
    ]
  },
  {
    title: "2. Operator serwisu",
    content: [
      `Operatorem serwisu jest ${operator}.`,
      "Kontakt z operatorem jest możliwy pod adresem: biuro@dealshare.pl."
    ]
  },
  {
    title: "3. Korzystanie z serwisu",
    content: [
      "Użytkownik może przeglądać treści, utworzyć konto, wysłać formularz bez wcześniejszego logowania, sprawdzać własne zgłoszenia oraz przedstawić ofertę swojej firmy.",
      "Użytkownik odpowiada za poprawność przekazywanych danych i bezpieczeństwo danych dostępowych do swojego konta.",
      "Użytkownik zobowiązuje się korzystać z serwisu zgodnie z prawem, dobrymi obyczajami oraz bez naruszania praw osób trzecich."
    ]
  },
  {
    title: "4. Sprawy, formularze i konto",
    content: [
      "Wysłanie formularza może spowodować utworzenie podstawowego konta użytkownika, zgłoszenia oraz jego indywidualnego numeru. Dostęp do konta odbywa się przez zweryfikowany e-mail, hasło albo jednorazowy link.",
      "Status sprawy odzwierciedla etap obsługi i nie stanowi gwarancji przedstawienia oferty, zawarcia umowy ani osiągnięcia określonego rezultatu.",
      "W formularzu nie należy przesyłać treści bezprawnych, obraźliwych, naruszających prawa osób trzecich ani informacji poufnych, jeżeli nie zostało to wcześniej uzgodnione z operatorem.",
      "Przesłanie formularza nie oznacza zawarcia umowy ani gwarancji nawiązania współpracy."
    ]
  },
  {
    title: "5. Oferenci i partnerzy",
    content: [
      "Rozszerzenie konta o funkcje oferenta wymaga akceptacji Dealshare. Samo wysłanie zgłoszenia nie daje prawa do publikowania ofert ani dostępu do spraw klientów.",
      "Każda oferta partnera może wymagać osobnej akceptacji. Dealshare może odmówić publikacji, ograniczyć widoczność albo wstrzymać ofertę w celu ochrony jakości i użytkowników.",
      "Partner widzi wyłącznie sprawy przypisane do jego organizacji i dane udostępnione w zakresie niezbędnym do obsługi danego przypisania."
    ]
  },
  {
    title: "6. Charakter informacji w serwisie",
    content: [
      "Informacje publikowane w serwisie mają charakter ogólny, informacyjny i biznesowy.",
      "Treści dostępne w serwisie nie stanowią oferty w rozumieniu Kodeksu cywilnego, chyba że wyraźnie wskazano inaczej."
    ]
  },
  {
    title: "7. Prawa autorskie",
    content: [
      "Treści, grafiki, układ strony, nazwa i elementy identyfikacji wizualnej serwisu mogą podlegać ochronie prawnej.",
      "Kopiowanie, rozpowszechnianie lub wykorzystywanie materiałów z serwisu bez zgody operatora jest zabronione, chyba że przepisy prawa stanowią inaczej."
    ]
  },
  {
    title: "8. Odpowiedzialność",
    content: [
      "Operator dokłada starań, aby informacje w serwisie były aktualne i rzetelne, ale nie gwarantuje, że każda informacja będzie kompletna albo wolna od błędów.",
      "Operator nie ponosi odpowiedzialności za działanie zewnętrznych serwisów, do których prowadzą linki umieszczone na stronie, w tym serwisów społecznościowych."
    ]
  },
  {
    title: "9. Reklamacje i kontakt",
    content: [
      "Uwagi dotyczące działania serwisu można zgłaszać na adres: biuro@dealshare.pl.",
      "Zgłoszenie powinno zawierać opis sprawy oraz dane kontaktowe umożliwiające udzielenie odpowiedzi."
    ]
  },
  {
    title: "10. Zmiany regulaminu",
    content: [
      "Regulamin może zostać zmieniony w przypadku rozwoju serwisu, wdrożenia nowych funkcji, uruchomienia newslettera, kont użytkowników, panelu ofert albo innych usług."
    ]
  }
];

export default function TermsPage() {
  return (
    <main className="bg-white">
      <section className="bg-navy-gradient py-20 text-white">
        <Container>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">Dokumenty</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">Regulamin serwisu</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">Ostatnia aktualizacja: 28 czerwca 2026 r.</p>
        </Container>
      </section>
      <section className="py-16">
        <Container className="max-w-4xl">
          <div className="article-content">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
