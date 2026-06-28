# Dealshare

Platforma B2B prowadzaca firme od potrzeby lub jawnej oferty do sprawy z Case ID, dopasowania partnera i konkretnego wyniku.

## Stack

- Next.js 16 App Router i React 19
- TypeScript i Tailwind CSS 3
- MySQL/MariaDB, Drizzle ORM i migracje SQL
- Better Auth: haslo, weryfikacja e-mail, reset hasla i magic link
- Nodemailer
- WordPress REST API jako zrodlo bloga

Wymagany Node.js: 22 lub nowszy.

## Uruchomienie

```bash
npm install
npm run db:migrate
npm run dev
```

Skopiuj `.env.example` do `.env.local` i ustaw prawdziwe wartosci. Wygeneruj sekret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

## Kontrola jakosci

```bash
npm run typecheck
npm run lint
npm run build
```

## Pierwszy administrator

Najpierw zarejestruj i potwierdz konto, a nastepnie uruchom:

```bash
npm run admin:bootstrap -- adres@dealshare.pl
```

## Wdrozenie

Pelna instrukcja konfiguracji MySQL, Vercel i Webd znajduje sie w `docs/PLATFORM_DEPLOYMENT.md`.
