import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowBack,
  ShoppingCart,
  FavoriteBorder,
  Favorite,
  Star,
  Share,
  Inventory,
  Edit,
} from '@mui/icons-material';
import {
  Button,
  Chip,
  Alert,
  CircularProgress,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import { useGetBookByIdQuery } from '../api/bookApi';
import { useAppSelector } from '../app/hooks';
import { type Book } from '../types/book';

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const { data: book, isLoading, error } = useGetBookByIdQuery(id || '');

  const handleAddToCart = () => {
    console.log('Added to cart:', book);
    // Cart logic will be implemented later
  };

  const handleAddToWishlist = () => {
    setIsFavorite(!isFavorite);
    // Wishlist logic will be implemented later
  };

  if (isLoading) {
    return (
      <div className='container-custom py-12'>
        <CircularProgress />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className='container-custom py-12 px-10'>
        <Alert severity='error' className='mb-4'>
          Book not found
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          className='mt-4'
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className='container-custom py-8 px-10'>
      {/* Navigation */}
      <div className='mb-6'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-gray-600 hover:text-primary transition-colors'
        >
          <ArrowBack />
          <span>Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
        {/* Left Column: Image */}
        <div className='lg:col-span-1'>
          <div className='sticky top-8'>
            <img
              src={book.image}
              alt={book.title}
              className='w-full rounded-xl shadow-lg mb-6'
            />
            {book.isLocal && (
              <Chip label='Local Book' color='secondary' className='mb-4' />
            )}
          </div>
        </div>

        {/* Right Column: Info */}
        <div className='lg:col-span-2'>
          <div className='mb-8'>
            <Chip
              label={book.category}
              className='mb-4 bg-gray-100 dark:bg-gray-800'
            />
            <h1 className='text-4xl font-bold mb-3'>{book.title}</h1>
            <p className='text-xl text-gray-600 mb-6'>by {book.author}</p>

            {/* Rating */}
            <div className='flex items-center gap-2 mb-6'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(book.rating)
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className='text-gray-600'>({book.rating})</span>
            </div>

            {/* Price and Stock */}
            <div className='flex items-center gap-6 mb-8'>
              {book.sale && book.salePrice ? (
                <div className='flex items-center gap-3'>
                  <span className='text-4xl font-bold text-red-600'>
                    €{book.salePrice}
                  </span>
                  <span className='text-gray-400 line-through text-xl'>
                    €{book.price}
                  </span>
                  <Chip label='SALE' color='error' />
                </div>
              ) : (
                <span className='text-4xl font-bold'>€{book.price}</span>
              )}

              {book.stock && book.stock > 0 ? (
                <Chip
                  icon={<Inventory />}
                  label={`In stock: ${book.stock}`}
                  className='bg-green-100 text-green-800'
                />
              ) : (
                <Chip
                  label='Out of stock'
                  className='bg-red-100 text-red-800'
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-wrap gap-4 mb-10'>
              <button
                onClick={handleAddToCart}
                disabled={!book.stock || book.stock <= 0}
                className='bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
              >
                <ShoppingCart />
                Add to Cart
              </button>

              <button
                onClick={handleAddToWishlist}
                className={`p-3 rounded-lg border ${
                  isFavorite
                    ? 'border-red-500 text-red-500'
                    : 'border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400'
                } hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </button>

              <button className='p-3 rounded-lg border border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
                <Share />
              </button>

              {/* Edit Button for Admin */}
              {user?.role === 'admin' && book.isLocal && (
                <button
                  onClick={() => navigate(`/books/edit/${book.id}`)}
                  className='px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center gap-2'
                >
                  <Edit />
                  Edit Book
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className='border-b border-gray-200 dark:border-gray-700 mb-6'>
            <div className='flex space-x-8'>
              {['Description', 'Details', 'Reviews'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`pb-4 px-1 font-medium ${
                    activeTab === index
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className='mt-6'>
            {activeTab === 0 && (
              <div>
                <h3 className='text-2xl font-semibold mb-4'>Description</h3>
                <p className='text-gray-600 dark:text-gray-400 whitespace-pre-line'>
                  {book.description || 'No description available.'}
                </p>
              </div>
            )}

            {activeTab === 1 && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div>
                    <p className='text-gray-500 text-sm'>ISBN</p>
                    <p className='font-medium'>
                      {book.isbn || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className='text-gray-500 text-sm'>Publication Year</p>
                    <p className='font-medium'>
                      {book.publicationDate?.split('-')[0] || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className='text-gray-500 text-sm'>Language</p>
                    <p className='font-medium'>
                      {book.language || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className='text-gray-500 text-sm'>Category</p>
                    <p className='font-medium'>{book.category}</p>
                  </div>
                </div>
                <div className='space-y-4'>
                  <div>
                    <p className='text-gray-500 text-sm'>Rating</p>
                    <div className='flex items-center'>
                      <div className='flex mr-2'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(book.rating)
                                ? 'text-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className='font-medium'>
                        {book.rating.toFixed(1)}/5
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className='text-gray-500 text-sm'>Stock Available</p>
                    <p className='font-medium'>{book.stock || 0} units</p>
                  </div>
                  {book.tags && book.tags.length > 0 && (
                    <div>
                      <p className='text-gray-500 text-sm mb-2'>Genres</p>
                      <div className='flex flex-wrap gap-2'>
                        {book.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div>
                <h3 className='text-2xl font-semibold mb-4'>
                  Customer Reviews
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  No reviews yet. Be the first to review this book!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
