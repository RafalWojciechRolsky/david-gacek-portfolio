# Portfolio Dawida Gacka

Serwis marki osobistej Dawida Gacka - trenera, muzyka i pioniera edukacyjnego wykorzystania bum bum rurek w Polsce (od 2010 roku).

Nadrzędną zasadą serwisu jest:

> Zanim poznasz ofertę, poznajmy się.

Strona najpierw pokazuje człowieka, jego historię i dowody, a dopiero potem pomaga wybrać właściwy kontekst współpracy.

## Cztery konteksty zaproszenia

- **Szkolenia dla nauczycieli** - szkolenia dla szkół, rad pedagogicznych i instytucji edukacyjnych.
- **Warsztaty dla dzieci** - warsztaty muzyczne dla grup w różnym wieku, od przedszkola po młodzież.
- **Firmy i eventy** - muzyczny team building i integracja zespołów.
- **DISC i komunikacja** - szkolenia i sesje DISC wsparte doświadczeniem pracy z muzyką i grupą.

## Co oferuje serwis

- Profil Dawida z biografią i osią czasu.
- Zweryfikowane dowody doświadczenia: liczby, rekord Guinnessa z 2016 roku, realizacje i referencje.
- Realizacje jako kolekcja case studies.
- Wiedza i inspiracje: artykuły oraz praktyczne materiały do pobrania.
- Kontekstowe FAQ na każdej stronie.
- Osobna ścieżka materiałów po szkoleniu.
- Pełna wersja angielska serwisu.

## Kontakt

- Telefon jest głównym kanałem kontaktu.
- WhatsApp jest równorzędną alternatywą dla telefonu.
- E-mail jest kanałem drugorzędnym.
- Przy numerze podane są godziny odbierania telefonu.
- Serwis nie zawiera formularzy, rezerwacji online, płatności ani czatu.

## Dostępność i jakość

- Zgodność z WCAG 2.2 AA.
- Mobile-first, jedna czytelna kolumna od 375 px.
- Treść i kluczowe akcje działają bez JavaScriptu.
- Analityka ruchu bez danych osobowych.

## Technologie

Next.js 16, React 19, TypeScript, Tailwind CSS, Strapi 5 oraz PostgreSQL 16.

## Development

Frontend jest obecnie renderowany z lokalnych, typowanych plików JSON.

Treści stron znajdują się w `src/content/site-content.json`.

Treści artykułów znajdują się w `src/content/articles.json`.

Konfiguracja kontaktu i linków znajduje się w `src/content/site-config.json`.

Copy interfejsu PL/EN znajduje się w `src/messages/ui.json`.

Uruchomienie lokalne:

```bash
npm install
npm run dev
```

Kontrole jakości:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Integracja ze Strapi 5 pozostaje kolejnym etapem developmentu.

## Struktura projektu

## Prawa

Marka i materiały należą do Dawida Gacka.
Projekt i realizacja: Rafał Majewski.
