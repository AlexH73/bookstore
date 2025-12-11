export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publication_year: number;
  language: string;
  genre: string[];
  price: number;
  currency: string;
  stock: number;
  rating: number;
  reviews_count: number;
  cover_url: string;
  annotation: string;
}
