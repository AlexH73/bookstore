import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchBooks, selectBooks, selectLoading, selectError } from "./booksSlice";
import { BookCard } from "./BookCard";
import { currentUser } from "./types/User";
import type { Book } from "./types/Book";
import { BookForm } from "./BookForm";
// import BookCard from "../../components/ui/BookCard";


export const BooksList = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const [formOpen, setFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditingBook(undefined);
    setFormOpen(true);
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4">
      {books.length === 0 && currentUser?.role === "admin" && !formOpen && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">No books available</h2>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            onClick={handleAdd}
          >
            Add New Book
          </button>
        </div>
      )}

      {currentUser?.role === "admin" && books.length > 0 && !formOpen && (
        <button
          className="mb-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          onClick={handleAdd}
        >
          Add New Book
        </button>
      )}

      {books.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onEdit={handleEdit} />
            // <BookCard book={{
            //           id: {book.id},
            //           title: '',
            //           author: '',
            //           price: 0,
            //           rating: 0,
            //           image: '',
            //           category: '',
            //           bestseller: undefined,
            //           sale: undefined,
            //           salePrice: undefined
            //         }} />
          ))}
        </div>
      )}

      {formOpen && (
        <BookForm
          bookToEdit={editingBook}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
};
