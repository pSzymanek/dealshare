# Wdrozenie platformy Dealshare

## Wymagania

- Node.js 22 lub nowszy
- MySQL 8 albo zgodna MariaDB
- dostep SMTP
- prywatny katalog na dokumenty poza `public/`

## Zmienne srodowiskowe

Ustaw wartosci zgodnie z `.env.example`:

- `APP_URL` - publiczny adres aplikacji, bez ukosnika na koncu,
- `AUTH_SECRET` - losowy sekret minimum 32 znaki,
- `AUTH_TRUSTED_ORIGINS` - dodatkowe dozwolone adresy preview, rozdzielone przecinkami,
- `DATABASE_URL` - polaczenie MySQL/MariaDB,
- `UPLOAD_DIR` - bezwzgledna sciezka prywatnego katalogu plikow,
- `SMTP_*` - dane serwera pocztowego,
- `CONTACT_TO_EMAIL` - adres zespolu Dealshare,
- `WORDPRESS_API_URL` - endpoint bloga WordPress.

Nigdy nie dodawaj prawdziwego `.env` do repozytorium ani paczki ZIP.

## Baza danych na Webd

1. Utworz baze i uzytkownika MySQL/MariaDB w panelu Webd.
2. Nadaj uzytkownikowi uprawnienia do tej bazy.
3. Ustaw `DATABASE_URL` w konfiguracji aplikacji Node.
4. W katalogu aplikacji uruchom `npm run db:migrate`.
5. Zarejestruj konto administratora i uruchom `npm run admin:bootstrap -- adres@dealshare.pl`.

Migracje sa przechowywane w `db/migrations`. Nie edytuj tabel recznie po wdrozeniu migracji.

## Test flow klienta

1. Otworz `/potrzeba` bez logowania.
2. Wyslij poprawny brief.
3. Potwierdz otrzymanie Case ID i dwoch wiadomosci: potwierdzenia oraz magic linku.
4. Wejdz magic linkiem do `/panel`.
5. Sprawdz liste i szczegoly w `/panel/sprawy/[caseId]`.
6. Jako admin zmien status i potwierdz aktualizacje historii.

## Test flow oferenta

1. Zarejestruj konto albo wyslij formularz na `/dla-partnerow`.
2. W `/admin/oferenci` zaakceptuj zgloszenie.
3. Sprawdz pojawienie sie zakladki `Panel oferenta` w tym samym `/panel`.
4. Dodaj oferte i zaakceptuj ja w `/admin/oferty`.
5. Przypisz sprawe w `/admin/sprawy/[caseId]`.
6. Zaloguj sie jako partner i zaakceptuj przypisanie.

## Vercel

Preview i produkcja Vercel wymagaja `APP_URL`, `AUTH_SECRET`, `DATABASE_URL` i SMTP. Baza na Webd musi akceptowac bezpieczne polaczenia z Vercel. Jezeli Webd blokuje zdalny MySQL, pelnego flow nie da sie testowac na Vercel; wtedy test funkcjonalny wykonuje sie na aplikacji Node w Webd.

## Checklista przed publikacja

- migracje wykonane,
- sekret auth ustawiony osobno w kazdym srodowisku,
- SMTP przetestowane,
- konto administratora utworzone,
- katalog dokumentow jest prywatny i zapisywalny,
- formularz klienta tworzy Case ID,
- magic link i haslo dzialaja,
- klient nie widzi cudzych spraw,
- partner nie widzi nieprzypisanych spraw,
- admin moze zmienic status i przypisac partnera,
- sprawdzone mobile, desktop i webview,
- wykonane `npm run typecheck`, `npm run lint` i `npm run build`.
