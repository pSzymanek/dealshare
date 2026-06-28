# PROJECT_CONTEXT.md

## Koncepcja projektu

DEALSHARE to "biznes bez kompleksow": otwarta przestrzen dla polskich firm, ktore chca szybciej znajdowac mozliwosci, partnerstwa, oferty i konkretne rozwiazania biznesowe.

Projekt powstaje jako odpowiedz na problem zamknietych kregow, przypadkowych kontaktow i rozproszonych informacji. Wiele wartosciowych ofert, technologii, uslug, inwestycji i partnerstw nie trafia do firm, ktore moglyby z nich skorzystac, bo pozostaja ukryte w prywatnych rozmowach albo ograniczonych srodowiskach.

DEALSHARE ma pomagac laczyc:

- firme z realna potrzeba z firma, ktora ma realne rozwiazanie,
- problem z oferta,
- lokalnego przedsiebiorce z szerszymi mozliwosciami biznesowymi,
- kontakt z decyzja,
- potencjal z konkretnym dzialaniem.

To nie ma byc zwykly katalog ofert. Katalog pokazuje liste. DEALSHARE ma tworzyc polaczenia.

## Misja i ton

DEALSHARE ma komunikowac:

- otwartosc,
- konkret,
- zaufanie,
- profesjonalizm,
- odwage biznesowa,
- nowoczesne podejscie do wspolpracy,
- brak sztucznych barier i kompleksow.

Projekt powinien wspierac przekonanie, ze biznes rozwija sie przez kontakt, przeplyw informacji, zaufanie i dobrze polaczone interesy, a nie przez niepotrzebna tajemnice, zamkniete kregi i chowanie potencjalu.

Komunikacja ma byc ambitna, ale nie nadeta. Ma byc biznesowa, konkretna i zrozumiala dla przedsiebiorcy, ktory szuka praktycznego kierunku dzialania.

## Dla kogo jest DEALSHARE

DEALSHARE jest dla firm i przedsiebiorcow, ktorzy:

- szukaja finansowania, poprawy plynnosci, inwestycji, technologii, uslug, partnerstw albo rozwiazania konkretnego problemu,
- nie zawsze wiedza, jak dokladnie nazwac swoja potrzebe, ale chca znalezc punkt startu,
- chca wyjsc poza ograniczenia wlasnej sieci kontaktow,
- potrzebuja dostepu do mozliwosci, ktore dotad mogly wydawac sie zarezerwowane dla wiekszych graczy.

Projekt jest tez dla oferentow, ktorzy maja sensowne uslugi, produkty, technologie lub mozliwosci wspolpracy i chca dotrzec do firm, ktore realnie moga ich potrzebowac.

## Aktualny model dzialania

Na obecnym etapie DEALSHARE dziala butikowo i selektywnie.

Nie chodzi o masowe wrzucanie wszystkiego. Licza sie oferty, ktore:

- maja sens biznesowy,
- da sie jasno przedstawic,
- odpowiadaja na realne potrzeby firm,
- moga prowadzic do wartosciowej rozmowy lub wspolpracy.

Obecnie kontakt miedzy zainteresowanymi przedsiebiorcami a oferentami jest obslugiwany przez zespol DEALSHARE. Projekt pomaga przekazac kontekst, uruchomic rozmowe i polaczyc wlasciwe strony tam, gdzie moze powstac wartosc.

## Cel strony

Strona ma:

- budowac zaufanie do DEALSHARE,
- jasno tlumaczyc idee projektu,
- pokazywac konkretne obszary ofert i mozliwosci,
- prowadzic uzytkownika do kontaktu,
- sprawiac wrazenie profesjonalnego, selektywnego i dobrze prowadzonego projektu biznesowego.

Strona nie powinna wygladac jak przypadkowa landing page, katalog linkow, portal ogloszeniowy ani techniczny eksperyment.

## Zasady jakosci produktu

- Projekt ma byc czysty, profesjonalny i nowoczesny.
- UI ma wspierac zaufanie, a nie rozpraszac.
- Animacje i efekty wizualne maja byc uzasadnione i kontrolowane.
- Szczegolnie wazne sa mobile, wysokosc viewportu, warstwy, przewijanie i podglady w aplikacjach typu webview.
- Tresci powinny pomagac przedsiebiorcy szybko zrozumiec, co moze zrobic dalej.
- Nie nalezy przesuwac projektu w strone masowego katalogu ofert bez osobnej decyzji strategicznej.

## Stack techniczny

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- MySQL/MariaDB i Drizzle ORM
- Better Auth: haslo, magic link i role
- WordPress REST API jako zrodlo bloga
- GitHub jako historia kodu i branchy
- Vercel jako etap preview/weryfikacji
- Paczka `export` dla hostingu Node/Next na faktyczny serwer produkcyjny

Najwazniejszym obiektem platformy jest sprawa z Case ID. Konto jest sposobem dostepu do spraw. Jedno konto moze zostac rozszerzone o role partnera po akceptacji Dealshare.

## Sposob pracy i publikacji

1. Zmiana powstaje na osobnym branchu `codex/...`.
2. Lokalny `npm run build` sluzy jako szybka kontrola techniczna przed pushem.
3. Branch jest pushowany do GitHuba i sprawdzany na Vercel preview.
4. Vercel preview jest glownym miejscem oceny przed decyzja wydawnicza.
5. Dopiero po akceptacji preview podejmowana jest osobna decyzja o merge/push do `main`, przygotowaniu exportu i publikacji produkcyjnej.

`main`, export i produkcja oznaczaja decyzje wypuszczenia zmiany w swiat. Nie sa wykonywane automatycznie bez osobnej zgody.

## Wazne ustalenia z historii projektu

- Ten watek jest glownym miejscem dalszej pracy nad DEALSHARE.
- Stare watki Codexa sa traktowane jako archiwum kontekstu, nie jako zrodlo automatycznych zmian.
- Mobile i podglady w aplikacjach typu webview sa waznymi przypadkami testowymi.
- Vercel sluzy jako miejsce sprawdzenia przed finalna publikacja.
- Export i publikacja na faktycznym serwerze sa oddzielna decyzja produkcyjna.

## Otwarte tematy

- Automatyzacja GitHub Actions dla builda.
- Uporzadkowanie procesu Vercel preview.
- Weryfikacja i pierwsze uzycie skryptu `npm run export:webd` po akceptacji wersji na Vercel.
- Ewentualna automatyzacja uploadu na serwer Webd, ale tylko po osobnej decyzji i nigdy jako samodzielne dzialanie.
- Potwierdzenie wersji Node 22 lub nowszej na Webd.
- Konfiguracja MySQL/MariaDB i wykonanie pierwszej migracji.
- Konfiguracja sekretow auth i polaczenia z baza na Vercel.
