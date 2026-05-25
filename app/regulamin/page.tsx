import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin korzystania z serwisu dealshare."
};

const sections = [
  {
    title: "1. Postanowienia ogólne",
    content: [
      "Regulamin określa zasady korzystania z serwisu internetowego dealshare dostępnego pod adresem dealshare.pl.",
      "Serwis ma obecnie charakter informacyjny i prezentacyjny. Służy do przedstawienia informacji o dealshare, ofertach B2B oraz umożliwienia kontaktu przez formularz."
    ]
  },
  {
    title: "2. Operator serwisu",
    content: [
      "Operatorem serwisu jest Dealshare. Kontakt z operatorem jest możliwy pod adresem: biuro@dealshare.pl.",
      "Jeżeli serwis będzie prowadzony przez konkretną spółkę albo działalność gospodarczą, pełne dane operatora powinny zostać uzupełnione w tym regulaminie."
    ]
  },
  {
    title: "3. Korzystanie z serwisu",
    content: [
      "Użytkownik może przeglądać treści dostępne w serwisie oraz korzystać z formularza kontaktowego.",
      "Użytkownik zobowiązuje się korzystać z serwisu zgodnie z prawem, dobrymi obyczajami oraz bez naruszania praw osób trzecich."
    ]
  },
  {
    title: "4. Formularz kontaktowy",
    content: [
      "Formularz kontaktowy służy do przesyłania zapytań dotyczących ofert, współpracy biznesowej i kontaktu z dealshare.",
      "W formularzu nie należy przesyłać treści bezprawnych, obraźliwych, naruszających prawa osób trzecich ani informacji poufnych, jeżeli nie zostało to wcześniej uzgodnione z operatorem.",
      "Przesłanie formularza nie oznacza zawarcia umowy ani gwarancji nawiązania współpracy."
    ]
  },
  {
    title: "5. Charakter informacji w serwisie",
    content: [
      "Informacje publikowane w serwisie mają charakter ogólny, informacyjny i biznesowy.",
      "Treści dostępne w serwisie nie stanowią oferty w rozumieniu Kodeksu cywilnego, chyba że wyraźnie wskazano inaczej."
    ]
  },
  {
    title: "6. Prawa autorskie",
    content: [
      "Treści, grafiki, układ strony, nazwa i elementy identyfikacji wizualnej serwisu mogą podlegać ochronie prawnej.",
      "Kopiowanie, rozpowszechnianie lub wykorzystywanie materiałów z serwisu bez zgody operatora jest zabronione, chyba że przepisy prawa stanowią inaczej."
    ]
  },
  {
    title: "7. Odpowiedzialność",
    content: [
      "Operator dokłada starań, aby informacje w serwisie były aktualne i rzetelne, ale nie gwarantuje, że każda informacja będzie kompletna albo wolna od błędów.",
      "Operator nie ponosi odpowiedzialności za działanie zewnętrznych serwisów, do których prowadzą linki umieszczone na stronie, w tym serwisów społecznościowych."
    ]
  },
  {
    title: "8. Reklamacje i kontakt",
    content: [
      "Uwagi dotyczące działania serwisu można zgłaszać na adres: biuro@dealshare.pl.",
      "Zgłoszenie powinno zawierać opis sprawy oraz dane kontaktowe umożliwiające udzielenie odpowiedzi."
    ]
  },
  {
    title: "9. Zmiany regulaminu",
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
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">Ostatnia aktualizacja: 16 maja 2026 r.</p>
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
