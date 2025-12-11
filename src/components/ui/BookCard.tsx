import React from 'react';
import { Star, FavoriteBorder, AddShoppingCart } from '@mui/icons-material';
import { useAppSelector } from '../../app/hooks';
import { translationsBookCard } from '../../features/language/translationsBookCard';

interface BookCardProps {
  book: {
    id: string | number;
    title: string;
    author: string;
    price: number;
    rating: number;
    image: string;
    category: string;
    bestseller?: boolean;
    sale?: boolean;
    salePrice?: number;
  };
  onAddToCart?: (book: any) => void;
  onToggleFavorite?: (book: any) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onAddToCart,
  onToggleFavorite,
}) => {
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  );
  const t = translationsBookCard[currentLanguage].bookCard;

  return (
    <div className='group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300'>
      {/* Image Container */}
      <div className='relative overflow-hidden'>
        <img
          src={book.image}
          alt={book.title}
          className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
        />

        {/* Badges */}
        <div className='absolute top-3 left-3 flex flex-col gap-1'>
          {book.bestseller && (
            <span className='bg-secondary text-white px-2 py-1 rounded text-xs font-semibold'>
              {t.bestseller}
            </span>
          )}
          {book.sale && (
            <span className='bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold'>
              {t.sale}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className='absolute top-3 right-3 flex flex-col gap-1'>
          <button
            onClick={() => onToggleFavorite?.(book)}
            className='bg-white/90 hover:bg-white p-2 rounded-full shadow-sm transition-colors'
          >
            <FavoriteBorder className='w-4 h-4' />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='p-4'>
        <div className='mb-2'>
          <span className='text-xs text-gray-500 uppercase tracking-wide'>
            {book.category}
          </span>
        </div>

        <h3 className='font-semibold text-lg mb-1 line-clamp-1 hover:text-primary transition-colors'>
          {book.title}
        </h3>

        <p className='text-gray-600 text-sm mb-3'>{book.author}</p>

        {/* Rating and Price */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-1'>
            <Star className='w-4 h-4 text-yellow-500' />
            <span className='text-sm'>{book.rating}</span>
          </div>

          <div className='text-right'>
            {book.sale && book.salePrice ? (
              <>
                <span className='text-gray-400 line-through text-sm'>
                  €{book.price}
                </span>
                <p className='text-secondary font-bold text-lg'>
                  €{book.salePrice}
                </p>
              </>
            ) : (
              <p className='font-bold text-lg'>€{book.price}</p>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart?.(book)}
          className='btn-primary w-full flex items-center justify-center gap-2'
        >
          <AddShoppingCart className='w-5 h-5' />
          {t.addToCart}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
