import type { Language } from './languageSlice';

export interface HomeTranslations {
  heroTitle: string;
  heroSubtitle: string;
  shopNow: string;
  viewBestsellers: string;
  browseCategories: string;
  browseCategoriesSubtitle: string;
  books: string;
  bestsellers: string;
  bestsellersSubtitle: string;
  viewAll: string;
  bestseller: string;
  sale: string;
  addToCart: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
  emailPlaceholder: string;
  subscribe: string;
  privacyPolicy: string;
  categories: {
    fiction: string;
    nonFiction: string;
    science: string;
    business: string;
    children: string;
    romance: string;
  };
}

export const translationsHome: Record<Language, { home: HomeTranslations }> = {
  ru: {
    home: {
      heroTitle: 'Откройте для себя следующую любимую книгу',
      heroSubtitle:
        'Более 1 миллиона наименований в ваших руках. Бесплатная доставка при заказе на сумму более 25 евро.',
      shopNow: 'Купить сейчас',
      viewBestsellers: 'Смотреть бестселлеры',
      browseCategories: 'Просмотр категорий',
      browseCategoriesSubtitle:
        'Найдите свое следующее чтение в наших тщательно подобранных коллекциях',
      books: 'книги',
      bestsellers: 'Бестселлеры',
      bestsellersSubtitle: 'Самые популярные книги на этой неделе',
      viewAll: 'Смотреть все',
      bestseller: 'Бестселлер',
      sale: 'Распродажа',
      addToCart: 'Добавить в корзину',
      newsletterTitle: 'Будьте в курсе',
      newsletterSubtitle:
        'Подпишитесь на нашу рассылку и получите скидку 15% на свой первый заказ. Получайте обновления о новых выпусках, эксклюзивных предложениях и рекомендациях по чтению.',
      emailPlaceholder: 'Ваш адрес электронной почты',
      subscribe: 'Подписаться',
      privacyPolicy:
        'Подписываясь, вы соглашаетесь с нашей Политикой конфиденциальности',
      categories: {
        fiction: 'Художественная литература',
        nonFiction: 'Научная литература',
        science: 'Наука',
        business: 'Бизнес',
        children: 'Детские',
        romance: 'Романтика',
      },
    },
  },
  en: {
    home: {
      heroTitle: 'Discover Your Next Favorite Book',
      heroSubtitle:
        'Over 1 million titles at your fingertips. Free shipping on orders over €25.',
      shopNow: 'Shop Now',
      viewBestsellers: 'View Bestsellers',
      browseCategories: 'Browse Categories',
      browseCategoriesSubtitle:
        'Find your next read in our curated collections',
      books: 'books',
      bestsellers: 'Bestsellers',
      bestsellersSubtitle: 'Most popular books this week',
      viewAll: 'View All',
      bestseller: 'Bestseller',
      sale: 'Sale',
      addToCart: 'Add to Cart',
      newsletterTitle: 'Stay Updated',
      newsletterSubtitle:
        'Subscribe to our newsletter and get 15% off your first order. Receive updates on new releases, exclusive deals, and reading recommendations.',
      emailPlaceholder: 'Your email address',
      subscribe: 'Subscribe',
      privacyPolicy: 'By subscribing you agree to our Privacy Policy',
      categories: {
        fiction: 'Fiction',
        nonFiction: 'Non-Fiction',
        science: 'Science',
        business: 'Business',
        children: 'Children',
        romance: 'Romance',
      },
    },
  },
  de: {
    home: {
      heroTitle: 'Entdecken Sie Ihr nächstes Lieblingsbuch',
      heroSubtitle:
        'Über 1 Million Titel griffbereit. Kostenloser Versand bei Bestellungen über 25 €.',
      shopNow: 'Jetzt einkaufen',
      viewBestsellers: 'Bestseller ansehen',
      browseCategories: 'Kategorien durchsuchen',
      browseCategoriesSubtitle:
        'Finden Sie Ihre nächste Lektüre in unseren kuratierten Sammlungen',
      books: 'Bücher',
      bestsellers: 'Bestseller',
      bestsellersSubtitle: 'Die beliebtesten Bücher dieser Woche',
      viewAll: 'Alle ansehen',
      bestseller: 'Bestseller',
      sale: 'Im Angebot',
      addToCart: 'In den Warenkorb',
      newsletterTitle: 'Bleiben Sie auf dem Laufenden',
      newsletterSubtitle:
        'Abonnieren Sie unseren Newsletter und erhalten Sie 15 % Rabatt auf Ihre erste Bestellung. Erhalten Sie Updates zu Neuerscheinungen, exklusiven Angeboten und Leseempfehlungen.',
      emailPlaceholder: 'Deine E-Mail-Adresse',
      subscribe: 'Abonnieren',
      privacyPolicy:
        'Mit dem Abonnieren stimmen Sie unserer Datenschutzrichtlinie zu',
      categories: {
        fiction: 'Belletristik',
        nonFiction: 'Sachbuch',
        science: 'Wissenschaft',
        business: 'Geschäft',
        children: 'Kinder',
        romance: 'Romantik',
      },
    },
  },
};
