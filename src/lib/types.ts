/**
 * Obsługiwane wersje językowe serwisu.
 */
export type Locale = "pl" | "en";

/**
 * Klucze stron, które mają lokalizowane odpowiedniki.
 */
export type PageKey =
  | "home"
  | "profile"
  | "teacherTraining"
  | "corporateEvents"
  | "childrenWorkshops"
  | "disc"
  | "projects"
  | "insights"
  | "contact"
  | "materials";

/**
 * Dostępne sygnały kolorystyczne systemu designu.
 */
export type Signal = "cobalt" | "ochre" | "coral" | "green";

/**
 * Tonalna powierzchnia sekcji strony.
 */
export type PageTone =
  | "paper"
  | "white"
  | "ink"
  | "cobalt"
  | "ochre"
  | "coral"
  | "green";

/**
 * Wariant kompozycyjny podstrony editorialowej.
 */
export type PageVisualVariant =
  | "profile"
  | "teacher"
  | "corporate"
  | "children"
  | "disc"
  | "projects"
  | "insights"
  | "contact";

/**
 * Status publikacji treści lub zasobu.
 */
export type ContentStatus =
  | "confirmed"
  | "available"
  | "preparing"
  | "unavailable"
  | "pending";

/**
 * Link z lokalnym albo zewnętrznym celem.
 */
export interface LinkItem {
  /** Widoczna, jednoznaczna etykieta linku. */
  label: string;
  /** Cel linku. */
  href: string;
  /** Informuje o celu zewnętrznym. */
  external?: boolean;
  /** Tekst dla technologii asystujących. */
  ariaLabel?: string;
}

/**
 * Dane obrazu znaczącego dla treści.
 */
export interface ImageData {
  /** Źródło obrazu w katalogu publicznym. */
  src: string;
  /** Tekst alternatywny w bieżącej lokalizacji. */
  alt: string;
  /** Szerokość źródłowa. */
  width: number;
  /** Wysokość źródłowa. */
  height: number;
}

/**
 * Dane SEO jednej lokalizacji.
 */
export interface SeoData {
  /** Tytuł dokumentu. */
  title: string;
  /** Opis dokumentu. */
  description: string;
  /** Opcjonalne słowa pomocnicze dla wyszukiwarki. */
  keywords?: string[];
}

/**
 * Jedna para pytania i odpowiedzi FAQ.
 */
export interface FaqItem {
  /** Stabilny identyfikator pytania. */
  id: string;
  /** Treść pytania. */
  question: string;
  /** Treść odpowiedzi. */
  answer: string;
}

/**
 * Dowód doświadczenia z kontekstem i opcjonalnym źródłem.
 */
export interface EvidenceItem {
  /** Stabilny identyfikator dowodu. */
  id: string;
  /** Krótki numer lub etykieta. */
  label: string;
  /** Główny fakt. */
  title: string;
  /** Kontekst faktu. */
  body: string;
  /** Status źródła. */
  status: ContentStatus;
  /** Link do źródła, jeśli może być publiczny. */
  source?: LinkItem;
}

/**
 * Jedna pozycja kolekcji treści.
 */
export interface ContentItem {
  /** Stabilny identyfikator elementu. */
  id: string;
  /** Etykieta typu lub odbiorcy. */
  label?: string;
  /** Tytuł elementu. */
  title: string;
  /** Opis elementu. */
  body: string;
  /** Link do dalszej treści. */
  href?: string;
  /** Tekst akcji. */
  actionLabel?: string;
  /** Opcjonalny status publikacji. */
  status?: ContentStatus;
  /** Opcjonalne metadane. */
  meta?: string;
  /** Typ materiału, np. przewodnik albo case study. */
  type?: string;
  /** Szacowany czas czytania materiału. */
  readTime?: string;
  /** Opcjonalne źródło. */
  source?: LinkItem;
  /** Opcjonalny obraz. */
  image?: ImageData;
}

/**
 * Sekcja generycznej strony editorialowej.
 */
export interface PageSection {
  /** Stabilny identyfikator kotwicy. */
  id: string;
  /** Mała etykieta sekcji. */
  eyebrow?: string;
  /** Nagłówek sekcji. */
  heading: string;
  /** Wprowadzenie sekcji. */
  intro?: string;
  /** Elementy kolekcji. */
  items?: ContentItem[];
  /** Ton tła sekcji. */
  tone?: PageTone;
  /** Link do kolejnej treści. */
  action?: LinkItem;
}

/**
 * Wspólna zawartość zlokalizowanej strony.
 */
export interface PageData {
  /** Klucz wiążący wersje językowe. */
  contentKey: PageKey;
  /** Lokalizacja treści. */
  locale: Locale;
  /** Publiczny slug bez prefiksu języka. */
  slug: string;
  /** Dane SEO. */
  seo: SeoData;
  /** Nadpisanie indeksowania strony. */
  noindex?: boolean;
  /** Główny nagłówek H1. */
  title: string;
  /** Krótka etykieta roli strony. */
  eyebrow?: string;
  /** Wprowadzenie hero. */
  intro: string;
  /** Opcjonalne znaczące zdjęcie w hero podstrony. */
  heroImage?: ImageData;
  /** Główny dowód hero. */
  proof?: string;
  /** Główna akcja hero. */
  cta?: LinkItem;
  /** Materiał wideo właściwy dla tej strony, gdy istnieje. */
  video?: VideoData;
  /** Sekcje strony. */
  sections: PageSection[];
  /** Widoczne pytania i odpowiedzi. */
  faq: FaqItem[];
}

/**
 * Zlokalizowany wariant wizualny podstrony.
 */
export interface PageVisual {
  /** Wariant geometrii i rytmu podstrony. */
  variant: PageVisualVariant;
  /** Główny sygnał kolorystyczny widoku. */
  signal: Signal;
  /** Obraz hero z tekstem alternatywnym. */
  heroImage?: ImageData;
  /** Podpis obrazu hero. */
  heroCaption?: string;
  /** Obraz facady wideo właściwy dla kontekstu strony. */
  mediaImage?: ImageData;
  /** Ton przypisany do identyfikatora sekcji. */
  toneBySection: Record<string, PageTone>;
}

/**
 * Źródłowa forma wariantu wizualnego z lokalizowanymi assetami i tonami.
 */
export interface PageVisualSource {
  /** Wariant geometrii i rytmu podstrony. */
  variant: PageVisualVariant;
  /** Główny sygnał kolorystyczny widoku. */
  signal: Signal;
  /** Obrazy hero dla obu języków. */
  heroImage?: Record<Locale, ImageData>;
  /** Podpisy obrazów hero dla obu języków. */
  heroCaption?: Record<Locale, string>;
  /** Obrazy facady wideo dla obu języków. */
  mediaImage?: Record<Locale, ImageData>;
  /** Tony sekcji dla obu języków. */
  toneBySection: Record<Locale, Record<string, PageTone>>;
}

/**
 * Karta jednego kontekstu zaproszenia.
 */
export interface InvitationContext {
  /** Stabilny klucz kontekstu. */
  id: string;
  /** Etykieta odbiorcy. */
  label: string;
  /** Nazwa kontekstu. */
  title: string;
  /** Krótki opis. */
  body: string;
  /** Cel strony kontekstu. */
  href: string;
  /** Etykieta przejścia. */
  actionLabel: string;
}

/**
 * Dane facady wideo.
 */
export interface VideoData {
  /** Identyfikator filmu YouTube. */
  videoId: string;
  /** Tytuł materiału. */
  title: string;
  /** Tekst alternatywny kadru. */
  alt: string;
  /** Statyczny, zatwierdzony kadr zastępczy przed aktywacją. */
  placeholderImage: ImageData;
  /** Zwykły link do filmu jako fallback. */
  fallback: LinkItem;
  /** Status źródła i praw. */
  status: ContentStatus;
}

/**
 * Dane jednego artykułu homepage albo huba Wiedzy.
 */
export interface ArticleItem extends ContentItem {
  /** Typ materiału. */
  type: string;
  /** Szacowany czas czytania. */
  readTime: string;
}

/**
 * Sekcja treści artykułu z nagłówkiem, odporna na mapowanie na komponent CMS.
 */
export interface ArticleSection {
  /** Kotwica sekcji używana w spisie treści. */
  id: string;
  /** Nagłówek sekcji renderowany jako H2. */
  heading: string;
  /** Akapity sekcji, mogą zawierać linki w zapisie [tekst](ścieżka). */
  paragraphs: string[];
  /** Opcjonalna lista punktów doklejona pod akapitami. */
  bullets?: string[];
}

/**
 * Obraz otwierający artykuł, wyłącznie z autentycznych materiałów projektu.
 */
export interface ArticleHero {
  /** Ścieżka obrazu w katalogu public. */
  src: string;
  /** Tekst alternatywny opisujący zdjęcie. */
  alt: string;
  /** Podpis pod zdjęciem. */
  caption: string;
  /** Szerokość źródłowego pliku w pikselach. */
  width: number;
  /** Wysokość źródłowego pliku w pikselach. */
  height: number;
}

/**
 * Kategoria łączy artykuł z jednym kontekstem współpracy i jego sygnałem.
 */
export interface ArticleCategory {
  /** Stabilny identyfikator kategorii wspólny dla obu języków. */
  id: "teacherTraining" | "childrenWorkshops" | "corporateEvents" | "disc";
  /** Zlokalizowana nazwa kategorii. */
  label: string;
  /** Kolor sygnałowy kategorii. */
  signal: Signal;
  /** Link do odpowiadającej kategorii strony współpracy. */
  href: string;
}

/**
 * Pełny kontrakt artykułu przechowywanego w lokalnym JSON lub później w CMS.
 */
export interface ArticleDetail extends ArticleItem {
  /** Kategoria merytoryczna powiązana z kontekstem współpracy. */
  category: ArticleCategory;
  /** Data pierwszej publikacji treści w formacie ISO. */
  publishedAt: string;
  /** Data ostatniej aktualizacji treści w formacie ISO. */
  updatedAt: string;
  /** Obraz otwierający artykuł. */
  hero: ArticleHero;
  /** Sekcje treści z nagłówkami H2. */
  sections: ArticleSection[];
  /** Identyfikatory artykułów powiązanych merytorycznie. */
  related?: string[];
  /** Nazwa źródła artykułu. */
  sourceLabel: string;
  /** Krótki tytuł SEO z nazwą marki. */
  seoTitle: string;
  /** Opis SEO artykułu. */
  seoDescription: string;
  /** Pytania kontekstowe widoczne pod artykułem. */
  faq: FaqItem[];
}

/**
 * Kompletna zawartość strony głównej.
 */
export interface HomepageData extends PageData {
  /** Znaczący obraz hero. */
  heroImage: ImageData;
  /** Widoczny podpis zdjęcia hero. */
  heroCaption: string;
  /** Główny dowód liczbowy. */
  heroStatistic: { value: string; label: string };
  /** Dowody w Proof Passage. */
  evidence: EvidenceItem[];
  /** Materiał wideo. */
  video: VideoData;
  /** Cztery konteksty współpracy. */
  contexts: InvitationContext[];
  /** Podgląd artykułów. */
  articles: ArticleItem[];
  /** Publicznie potwierdzone środowiska pracy. */
  environments: ContentItem[];
}

/**
 * Centralna konfiguracja kontaktu i adresów zewnętrznych.
 */
export interface SiteConfig {
  /** Publiczny adres serwisu, pusty do czasu ustalenia domeny. */
  siteUrl: string;
  /** Numer do wyświetlenia. */
  phoneDisplay: string;
  /** Cel linku telefonicznego. */
  phoneHref: string;
  /** Cel linku WhatsApp. */
  whatsappHref: string;
  /** Adres e-mail do wyświetlenia. */
  email: string;
  /** Lokalizowane godziny odbierania telefonu. */
  phoneHoursByLocale: Record<Locale, string>;
  /** Oficjalne profile. */
  externalLinks: {
    linkedin: LinkItem;
    instagram: LinkItem;
    facebook: LinkItem;
    patronite: LinkItem;
  };
  /** Linki creditu wykonawcy projektu. */
  creatorLinks: {
    portfolio: LinkItem;
    musicStore: LinkItem;
  };
}
