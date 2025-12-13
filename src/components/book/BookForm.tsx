import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  useAddLocalBookMutation,
  useUpdateLocalBookMutation,
} from '../../api/bookApi';
import { type BookFormData } from '../../types/book';
import { useCurrentUser, useIsAdmin } from '../../app/hooks';
import placeholder from "../../assets/placeholder_book.svg"

interface BookFormProps {
  initialValues?: BookFormData;
  isEdit?: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  price: Yup.number()
    .min(0, 'Price cannot be negative')
    .required('Price is required'),
  rating: Yup.number()
    .min(0, 'Rating must be between 0 and 5')
    .max(5, 'Rating must be between 0 and 5'),
  image: Yup.string().url('Invalid URL').required('Image URL is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string(),
  isbn: Yup.string(),
  pages: Yup.number().min(1, 'Minimum 1 page'),
  publisher: Yup.string(),
  publicationDate: Yup.string(),
  language: Yup.string(),
  bestseller: Yup.boolean(),
  sale: Yup.boolean(),
  salePrice: Yup.number()
    .min(0, 'Sale price cannot be negative')
    .when('sale', {
      is: true,
      then: (schema) => schema.required('Sale price is required'),
    }),
  stock: Yup.number().min(0, 'Stock cannot be negative'),
});

const BookForm: React.FC<BookFormProps> = ({
  initialValues,
  isEdit = false,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const isAdminUser = useIsAdmin();

  const [addBook, { isLoading: isAdding }] = useAddLocalBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateLocalBookMutation();

  const formik = useFormik({
    initialValues: initialValues || {
      title: '',
      author: '',
      price: 0,
      rating: 0,
      image: '',
      category: '',
      description: '',
      isbn: '',
      pages: 0,
      publisher: '',
      publicationDate: new Date().toISOString().split('T')[0],
      language: 'English',
      bestseller: false,
      sale: false,
      salePrice: 0,
      stock: 10,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEdit && id) {
          // Проверяем права на редактирование
          const localBooks = JSON.parse(
            localStorage.getItem('localBooks') || '[]'
          );
          const book = localBooks.find((b: any) => b.id === id);

          if (book && book.addedBy !== currentUser?.email && !isAdminUser) {
            alert('You can only edit your own books');
            return;
          }

          await updateBook({ id, updates: values }).unwrap();
          alert('Book updated successfully!');
        } else {
          await addBook(values).unwrap();
          alert('Book added successfully!');
        }
        navigate('/catalog');
      } catch (error) {
        console.error('Error saving book:', error);
        alert('Error saving book. Please try again.');
      }
    },
  });

  const categories = [
    'Fiction',
    'Non-Fiction',
    'Science',
    'Business',
    'Children',
    'Romance',
    'Fantasy',
    'Mystery',
    'Biography',
    'History',
  ];

  const languages = [
    'English',
    'German',
    'French',
    'Spanish',
    'Russian',
    'Chinese',
  ];

  if (!currentUser?.isAuthenticated) {
    return (
      <div className='container-custom mt-8 px-10'>
        <Alert severity='warning'>You need to be logged in to add books</Alert>
      </div>
    );
  }

  if (isEdit && !isAdminUser) {
    // Для обычных пользователей проверяем, их ли это книга
    const localBooks = JSON.parse(localStorage.getItem('localBooks') || '[]');
    const book = id ? localBooks.find((b: any) => b.id === id) : null;

    if (book && book.addedBy !== currentUser?.email) {
      return (
        <div className='container-custom mt-8 px-10'>
          <Alert severity='error'>You can only edit your own books</Alert>
        </div>
      );
    }
  }

  return (
    <div className='container-custom py-8 px-10 max-w-4xl mx-auto'>
      <h1 className='text-4xl font-bold mb-2'>
        {isEdit ? 'Edit Book' : 'Add New Book'}
      </h1>
      <p className='text-gray-600 mb-8'>
        {isEdit
          ? 'Update book information'
          : 'Fill in the details to add a new book'}
      </p>

      <form onSubmit={formik.handleSubmit} className='space-y-8'>
        {/* Basic Information */}
        <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm'>
          <h2 className='text-xl font-semibold mb-6'>Basic Information</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <TextField
              fullWidth
              label='Title *'
              name='title'
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              className='bg-white dark:bg-gray-800'
            />

            <TextField
              fullWidth
              label='Author *'
              name='author'
              value={formik.values.author}
              onChange={formik.handleChange}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
            />

            <TextField
              fullWidth
              label='Price (€) *'
              name='price'
              type='number'
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            />

            <TextField
              fullWidth
              label='Rating (0-5)'
              name='rating'
              type='number'
              value={formik.values.rating}
              onChange={formik.handleChange}
              error={formik.touched.rating && Boolean(formik.errors.rating)}
              helperText={formik.touched.rating && formik.errors.rating}
              InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
            />

            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              <InputLabel>Category *</InputLabel>
              <Select
                name='category'
                value={formik.values.category}
                onChange={formik.handleChange}
                label='Category *'
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <div className='text-red-500 text-xs mt-1'>
                  {formik.errors.category}
                </div>
              )}
            </FormControl>

            <TextField
              fullWidth
              label='Image URL *'
              name='image'
              value={formik.values.image}
              onChange={formik.handleChange}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
              placeholder= {`${placeholder}`}
            />
          </div>
        </div>

        {/* Description */}
        <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm'>
          <h2 className='text-xl font-semibold mb-6'>Description</h2>
          <TextField
            fullWidth
            label='Description'
            name='description'
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder='Enter book description...'
          />
        </div>

        {/* Additional Information */}
        <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm'>
          <h2 className='text-xl font-semibold mb-6'>Additional Information</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            <TextField
              fullWidth
              label='ISBN'
              name='isbn'
              value={formik.values.isbn}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              label='Number of Pages'
              name='pages'
              type='number'
              value={formik.values.pages}
              onChange={formik.handleChange}
              InputProps={{ inputProps: { min: 1 } }}
            />

            <TextField
              fullWidth
              label='Stock Quantity'
              name='stock'
              type='number'
              value={formik.values.stock}
              onChange={formik.handleChange}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <TextField
              fullWidth
              label='Publisher'
              name='publisher'
              value={formik.values.publisher}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              label='Publication Date'
              name='publicationDate'
              type='date'
              value={formik.values.publicationDate}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                name='language'
                value={formik.values.language}
                onChange={formik.handleChange}
                label='Language'
              >
                {languages.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Flags */}
        <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm'>
          <h2 className='text-xl font-semibold mb-6'>Flags</h2>

          <div className='flex flex-wrap gap-8'>
            <FormControlLabel
              control={
                <Checkbox
                  name='bestseller'
                  checked={formik.values.bestseller}
                  onChange={formik.handleChange}
                  color='primary'
                />
              }
              label='Bestseller'
            />

            <FormControlLabel
              control={
                <Checkbox
                  name='sale'
                  checked={formik.values.sale}
                  onChange={formik.handleChange}
                  color='secondary'
                />
              }
              label='On Sale'
            />
          </div>

          {formik.values.sale && (
            <div className='mt-6'>
              <TextField
                fullWidth
                label='Sale Price (€) *'
                name='salePrice'
                type='number'
                value={formik.values.salePrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.salePrice && Boolean(formik.errors.salePrice)
                }
                helperText={formik.touched.salePrice && formik.errors.salePrice}
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                className='max-w-xs'
              />
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className='flex gap-4 pt-6'>
          <button
            type='submit'
            disabled={isAdding || isUpdating}
            className='bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
          >
            {isAdding || isUpdating ? (
              <>
                <CircularProgress size={20} color='inherit' />
                {isEdit ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              <>{isEdit ? 'Update Book' : 'Add Book'}</>
            )}
          </button>

          <button
            type='button'
            onClick={() => navigate(-1)}
            className='px-8 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
