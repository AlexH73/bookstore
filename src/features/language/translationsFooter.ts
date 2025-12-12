import type { Language } from './languageSlice';

export interface FooterTranslations {
  description: string;
  rights: string;
  links: {
    shop: {
      title: string;
      allBooks: string;
      newReleases: string;
      bestsellers: string;
    };
    help: {
      title: string;
      contactUs: string;
      shipping: string;
      returns: string;
    };
    company: {
      title: string;
      aboutUs: string;
      careers: string;
      privacyPolicy: string;
    };
  };
}

export const translationsFooter: Record<Language, { footer: FooterTranslations }> = {
  ru: {
    footer: {
      description:
        'Ваш любимый книжный интернет-магазин. Откройте для себя миллионы книг с бесплатной доставкой по всему миру.',
      rights: 'Все права защищены.',
      links: {
        shop: {
          title: 'Магазин',
          allBooks: 'Все книги',
          newReleases: 'Новинки',
          bestsellers: 'Бестселлеры',
        },
        help: {
          title: 'Помощь',
          contactUs: 'Связаться с нами',
          shipping: 'Доставка',
          returns: 'Возвраты',
        },
        company: {
          title: 'Компания',
          aboutUs: 'О нас',
          careers: 'Карьера',
          privacyPolicy: 'Политика конфиденциальности',
        },
      },
    },
  },
  en: {
    footer: {
      description:
        'Your favorite online bookstore. Discover millions of books with free shipping worldwide.',
      rights: 'All rights reserved.',
      links: {
        shop: {
          title: 'Shop',
          allBooks: 'All Books',
          newReleases: 'New Releases',
          bestsellers: 'Bestsellers',
        },
        help: {
          title: 'Help',
          contactUs: 'Contact Us',
          shipping: 'Shipping',
          returns: 'Returns',
        },
        company: {
          title: 'Company',
          aboutUs: 'About Us',
          careers: 'Careers',
          privacyPolicy: 'Privacy Policy',
        },
      },
    },
  },
  de: {
    footer: {
      description:
        'Ihr liebster Online-Buchladen. Entdecken Sie Millionen von Büchern mit kostenlosem Versand weltweit.',
      rights: 'Alle Rechte vorbehalten.',
      links: {
        shop: {
          title: 'Shop',
          allBooks: 'Alle Bücher',
          newReleases: 'Neuerscheinungen',
          bestsellers: 'Bestseller',
        },
        help: {
          title: 'Hilfe',
          contactUs: 'Kontakt',
          shipping: 'Versand',
          returns: 'Rücksendungen',
        },
        company: {
          title: 'Unternehmen',
          aboutUs: 'Über uns',
          careers: 'Karriere',
          privacyPolicy: 'Datenschutzrichtlinie',
        },
      },
    },
  },
};
