import type { Language } from './languageSlice';

export interface NavTranslations {
  bestseller: string;
  fiction: string;
  nonFiction: string;
  children: string;
  ebooks: string;
  audioBooks: string;
  gifts: string;
  sale: string;
}

export interface HeaderTranslations {
  promo: string;
  storeLocator: string;
  helpContact: string;
  searchPlaceholder: string;
  newReleases: string;
  subscribe: string;
  menu: string;
  more: string;
  nav: NavTranslations;
}

export const translationsHeader: Record<
  Language,
  { header: HeaderTranslations }
> = {
  ru: {
    header: {
      promo: 'Бесплатная доставка для заказов от €25',
      storeLocator: 'Найти магазин',
      helpContact: 'Помощь и контакты',
      searchPlaceholder: 'Искать книги, авторов, ISBN...',
      newReleases: 'Новинки',
      subscribe: 'Подписаться',
      menu: 'Меню',
      more: 'Еще',
      nav: {
        bestseller: 'Бестселлеры',
        fiction: 'Художественная',
        nonFiction: 'Нон-фикшн',
        children: 'Детям',
        ebooks: 'Эл. книги',
        audioBooks: 'Аудиокниги',
        gifts: 'Подарки',
        sale: 'Распродажа',
      },
    },
  },
  en: {
    header: {
      promo: 'Free shipping on orders over €25',
      storeLocator: 'Store Locator',
      helpContact: 'Help & Contact',
      searchPlaceholder: 'Search books, authors, ISBN...',
      newReleases: 'New Releases',
      subscribe: 'Subscribe',
      menu: 'Menu',
      more: 'More',
      nav: {
        bestseller: 'Bestseller',
        fiction: 'Fiction',
        nonFiction: 'Non-Fiction',
        children: 'Children',
        ebooks: 'eBooks',
        audioBooks: 'Audio Books',
        gifts: 'Gifts',
        sale: 'Sale',
      },
    },
  },
  de: {
    header: {
      promo: 'Kostenloser Versand bei Bestellungen über 25 €',
      storeLocator: 'Filialfinder',
      helpContact: 'Hilfe & Kontakt',
      searchPlaceholder: 'Suche nach Büchern, Autoren, ISBN...',
      newReleases: 'Neuerscheinungen',
      subscribe: 'Abonnieren',
      menu: 'Menü',
      more: 'Mehr',
      nav: {
        bestseller: 'Bestseller',
        fiction: 'Belletristik',
        nonFiction: 'Sachbücher',
        children: 'Kinder',
        ebooks: 'eBooks',
        audioBooks: 'Hörbücher',
        gifts: 'Geschenke',
        sale: 'im Angebot',
      },
    },
  },
};
