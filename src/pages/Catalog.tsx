import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FilterList,
  Search,
  GridView,
  ViewList,
} from '@mui/icons-material';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useGetBooksQuery, useGetLocalBooksQuery } from '../api/bookApi';
import BookCard from '../components/ui/BookCard';
import { type Book } from '../types/book';
import { useAppSelector } from '../app/hooks';

const Catalog: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<'title' | 'price' | 'rating'>('title');

  // Fetch data with RTK Query
  const {
    data: apiBooks = [],
    isLoading: isLoadingApi,
    error: apiError,
  } = useGetBooksQuery();
  const { data: localBooks = [], isLoading: isLoadingLocal } =
    useGetLocalBooksQuery();

  const user = useAppSelector((state) => state.auth.user);

  // Combine all books
  const allBooks: Book[] = [...apiBooks, ...localBooks];

  // Filter books
  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || book.category === selectedCategory;
    const matchesPrice =
      book.price >= priceRange[0] && book.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'price') return a.price - b.price;
    return b.rating - a.rating;
  });

  // Get unique categories
  const categories = ['all', ...new Set(allBooks.map((book) => book.category))];

  const handleAddToCart = (book: Book) => {
    console.log('Add to cart:', book);
  };

  const handleToggleFavorite = (book: Book) => {
    console.log('Toggle favorite:', book);
  };

  if (isLoadingApi || isLoadingLocal) {
    return (
      <div className='container-custom py-12'>
        <CircularProgress />
      </div>
    );
  }

  if (apiError) {
    return (
      <div className='container-custom py-12'>
        <Alert severity='error' className='mb-4'>
          Error loading books from API
        </Alert>
      </div>
    );
  }

  return (
    <div className='container-custom py-8 px-10'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-2'>Book Catalog</h1>
        <p className='text-gray-600'>Total books: {allBooks.length}</p>
      </div>

      {/* Search and Controls */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8'>
        <div className='lg:col-span-3'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search books or authors...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200'
            />
          </div>
        </div>

        <div className='flex gap-4'>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              label='Sort By'
              className='bg-white dark:bg-gray-800'
            >
              <MenuItem value='title'>Title</MenuItem>
              <MenuItem value='price'>Price</MenuItem>
              <MenuItem value='rating'>Rating</MenuItem>
            </Select>
          </FormControl>

          <div className='flex border border-gray-300 rounded-lg overflow-hidden dark:border-gray-700'>
            <button
              className={`p-2 ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <GridView />
            </button>
            <button
              className={`p-2 ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => setViewMode('list')}
            >
              <ViewList />
            </button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* Filters Sidebar */}
        <div className='space-y-6'>
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm'>
            <div className='flex items-center gap-2 mb-6'>
              <FilterList />
              <h3 className='font-semibold text-lg'>Filters</h3>
            </div>

            {/* Categories */}
            <div className='mb-6'>
              <h4 className='font-medium mb-3'>Categories</h4>
              <div className='flex flex-wrap gap-2'>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className='mb-6'>
              <h4 className='font-medium mb-3'>Price Range</h4>
              <div className='px-2'>
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) =>
                    setPriceRange(newValue as [number, number])
                  }
                  valueLabelDisplay='auto'
                  min={0}
                  max={100}
                  className='text-primary'
                />
                <div className='flex justify-between text-sm text-gray-500 mt-2'>
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add Book Button */}
          {user && (
            <Link
              to='/books/add'
              className='block w-full bg-primary text-white text-center py-3 rounded-lg hover:bg-primary-dark transition-colors'
            >
              Add New Book
            </Link>
          )}
        </div>

        {/* Books Grid */}
        <div className='lg:col-span-3'>
          <div className='mb-6'>
            <Chip
              label={`Found: ${sortedBooks.length} books`}
              className='bg-primary text-white'
            />
          </div>

          {sortedBooks.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-gray-500 text-lg'>No books found</p>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {sortedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onAddToCart={() => handleAddToCart(book)}
                  onToggleFavorite={() => handleToggleFavorite(book)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
