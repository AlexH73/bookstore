import React from 'react';
import {
  ArrowForward,
  Star,
  FavoriteBorder,
  LocalFireDepartment,
  AddShoppingCart,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const featuredBooks = [
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      price: 24.99,
      rating: 4.5,
      image:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
      category: 'Fiction',
      bestseller: true,
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 19.99,
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w-400&h=600&fit=crop',
      category: 'Self-Help',
      bestseller: true,
    },
    {
      id: 3,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      price: 27.99,
      rating: 4.7,
      image:
        'https://images.unsplash.com/photo-1531346688376-ab6275c4725e?w=400&h=600&fit=crop',
      category: 'Sci-Fi',
      newRelease: true,
    },
    {
      id: 4,
      title: 'The Thursday Murder Club',
      author: 'Richard Osman',
      price: 22.99,
      rating: 4.4,
      image:
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
      category: 'Mystery',
      sale: true,
      salePrice: 18.99,
    },
  ];

  const categories = [
    { name: 'Fiction', count: 1254, color: 'bg-blue-100 text-blue-800' },
    { name: 'Non-Fiction', count: 876, color: 'bg-green-100 text-green-800' },
    { name: 'Science', count: 432, color: 'bg-purple-100 text-purple-800' },
    { name: 'Business', count: 321, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Children', count: 654, color: 'bg-pink-100 text-pink-800' },
    { name: 'Romance', count: 543, color: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className='space-y-12 md:space-y-16'>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-linear-to-r from-primary to-blue-900 text-gray-700 dark:from-gray-800 dark:to-gray-900 dark:text-white pl-10'>
        <div className='container-custom py-16 md:py-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif'>
                Discover Your Next Favorite Book
              </h1>
              <p className='text-xl mb-8 opacity-90'>
                Over 1 million titles at your fingertips. Free shipping on
                orders over €25.
              </p>
              <div className='flex flex-wrap gap-4'>
                <button className='btn-secondary flex items-center gap-2'>
                  Shop Now
                  <ArrowForward />
                </button>
                <button className='border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors'>
                  View Bestsellers
                </button>
              </div>
            </div>
            <div className='hidden md:block px-18'>
              <div className='relative'>
                <img
                  src='https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&h=600&fit=crop'
                  alt='Books Collection'
                  className='rounded-2xl shadow-2xl'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className='container-custom px-10'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold mb-2 dark:text-gray-100'>
            Browse Categories
          </h2>
          <p className='text-gray-600 dark:text-gray-400'>
            Find your next read in our curated collections
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4'>
          {categories.map((category) => (
            <div
              key={category.name}
              className='card-hover bg-white dark:bg-gray-800 dark:text-gray-200 rounded-xl p-4 text-center shadow-sm hover:shadow-lg'
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${category.color} mb-3`}
              >
                <span className='text-lg font-semibold'>
                  {category.name.charAt(0)}
                </span>
              </div>
              <h3 className='font-semibold mb-1'>{category.name}</h3>
              <p className='text-sm text-gray-500'>{category.count} books</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className='container-custom px-10'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <LocalFireDepartment className='text-secondary dark:text-gray-100' />
              <h2 className='text-3xl font-bold dark:text-gray-100'>
                Bestsellers
              </h2>
            </div>
            <p className='text-gray-600 dark:text-gray-400'>
              Most popular books this week
            </p>
          </div>
          <Link
            to='/bestseller'
            className='flex items-center gap-1 text-primary hover:underline mt-2 sm:mt-0'
          >
            View All
            <ArrowForward className='w-5 h-5' />
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {featuredBooks.map((book) => (
            <div
              key={book.id}
              className='card-hoverbg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden group dark:text-gray-100'
            >
              <div className='relative overflow-hidden'>
                <img
                  src={book.image}
                  alt={book.title}
                  className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <button className='absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm'>
                  <FavoriteBorder className='w-5 h-5' />
                </button>
                {book.bestseller && (
                  <span className='absolute top-3 left-3 bg-secondary text-white px-2 py-1 rounded text-xs font-semibold'>
                    Bestseller
                  </span>
                )}
                {book.sale && (
                  <span className='absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold dark:bg-red-600'>
                    Sale
                  </span>
                )}
              </div>

              <div className='p-4'>
                <h3 className='font-semibold text-lg mb-1 line-clamp-1'>
                  {book.title}
                </h3>
                <p className='text-gray-600 text-sm mb-3'>{book.author}</p>

                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 text-yellow-500' />
                    <span className='text-sm'>{book.rating}</span>
                  </div>
                  <div className='text-right'>
                    {book.sale ? (
                      <>
                        <span className='text-gray-400 line-through text-sm'>
                          €{book.price}
                        </span>
                        <p className='text-secondary font-bold text-lg'>
                          €{book.salePrice}
                        </p>
                      </>
                    ) : (
                      <p className='font-bold text-lg text-gray-600 dark:text-gray-400'>
                        €{book.price}
                      </p>
                    )}
                  </div>
                </div>

                <button className='btn-primary w-full flex items-center justify-center gap-2'>
                  <AddShoppingCart className='w-5 h-5' />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className='container-custom'>
        <div className='bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            <div>
              <h2 className='text-3xl font-bold mb-4'>Stay Updated</h2>
              <p className='text-gray-600 mb-6'>
                Subscribe to our newsletter and get 15% off your first order.
                Receive updates on new releases, exclusive deals, and reading
                recommendations.
              </p>
              <div className='flex flex-col sm:flex-row gap-2'>
                <input
                  type='email'
                  placeholder='Your email address'
                  className='grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200'
                />
                <button className='btn-secondary px-6 py-3 whitespace-nowrap'>
                  Subscribe
                </button>
              </div>
              <p className='mt-4 text-sm text-gray-500'>
                By subscribing you agree to our Privacy Policy
              </p>
            </div>
            <div className='hidden md:block'>
              <img
                src='https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&h=400&fit=crop'
                alt='Reading'
                className='rounded-xl shadow-lg'
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
