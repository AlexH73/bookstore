import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '../components/book/BookForm';
import { useGetLocalBooksQuery } from '../api/bookApi';
import { CircularProgress, Alert, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: localBooks = [], isLoading } = useGetLocalBooksQuery();

  const book = localBooks.find((b) => b.id === id);

  useEffect(() => {
    if (!isLoading && !book) {
      setTimeout(() => navigate('/catalog'), 3000);
    }
  }, [isLoading, book, navigate]);

  if (isLoading) {
    return (
      <div className='container-custom py-12'>
        <CircularProgress />
      </div>
    );
  }

  if (!book) {
    return (
      <div className='container-custom py-12 px-10'>
        <Alert severity='error' className='mb-4'>
          Book not found or you don't have permission to edit it
        </Alert>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/catalog')}>
          Back to Catalog
        </Button>
      </div>
    );
  }

  return <BookForm initialValues={book} isEdit={true} />;
};

export default EditBook;
