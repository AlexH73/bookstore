import type { Language } from './languageSlice';

export interface BookCardTranslations {
  bestseller: string;
  sale: string;
  addToCart: string;
}

export const translationsBookCard: Record<
  Language,
  { bookCard: BookCardTranslations }
> = {
  ru: {
    bookCard: {
      bestseller: 'Бестселлер',
      sale: 'Распродажа',
      addToCart: 'Добавить в корзину',
    },
  },
  en: {
    bookCard: {
      bestseller: 'Bestseller',
      sale: 'Sale',
      addToCart: 'Add to Cart',
    },
  },
  de: {
    bookCard: {
      bestseller: 'Bestseller',
      sale: 'Im Angebot',
      addToCart: 'In den Warenkorb',
    },
  },
};
