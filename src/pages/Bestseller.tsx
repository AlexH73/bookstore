import React from 'react';
import { useGetBestsellersQuery } from '../api/bookApi';
import BookCard from '../components/ui/BookCard';
import { type Book } from '../types/book';
import { CircularProgress, Alert } from '@mui/material';

const Bestseller: React.FC = () => {
  const { data: bestsellers = [], isLoading, error } = useGetBestsellersQuery();

  if (isLoading) {
    return (
      <div className='container-custom py-12'>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container-custom py-12'>
        <Alert severity='error'>
          Failed to load bestsellers. Please try again later.
        </Alert>
      </div>
    );
  }

  return (
    <div className='container-custom py-8 px-10'>
      <h1 className='text-4xl font-bold mb-2'>Bestsellers</h1>
      <p className='text-gray-600 mb-8'>
        Our top-rated books based on customer reviews
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {bestsellers.map((book: Book) => (
          <BookCard
            key={book.id}
            book={book}
            onAddToCart={() => console.log('Add to cart:', book)}
            onToggleFavorite={() => console.log('Toggle favorite:', book)}
          />
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
