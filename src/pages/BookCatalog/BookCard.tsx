import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { removeBook } from "./booksSlice";
import { currentUser } from "./types/User";
import { Link } from "react-router-dom";
import type { Book } from "./types/Book";

interface Props {
  book: Book;
  onEdit: (book: Book) => void;
}

export const BookCard = ({ book, onEdit }: Props) => {
  const dispatch = useAppDispatch();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-lg transition flex flex-col h-[520px] relative group">
      <Link to={`/book/${book.id}`} className="flex-1">
        <div className="relative h-64 flex items-center justify-center mb-3 bg-gray-100 rounded-lg overflow-hidden">
          {!imgError && book.cover_url ? (
            <img
              src={book.cover_url}
              alt={book.title}
              className="max-h-full max-w-full object-contain transition group-hover:opacity-95"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>
      </Link>

      <div className="absolute top-2 right-2 flex gap-2">
        {currentUser.role === "user" && (
          <button
            className="text-red-600 text-xl p-1 bg-white rounded-full shadow hover:text-red-700 transition transform hover:scale-110"
            title="Add to Favorites"
          >
            ❤️
          </button>
        )}

        {currentUser.role === "admin" && (
          <button
            className="text-red-600 text-xl p-1 bg-white rounded-full shadow hover:text-red-700 transition transform hover:scale-110"
            title="Delete"
            onClick={() => {
              if (confirm("Delete this book?")) dispatch(removeBook(book.id));
            }}
          >
            ❌
          </button>
        )}
      </div>

      <Link to={`/book/${book.id}`} className="mt-2">
        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-red-600 transition">
          {book.title}
        </h3>
      </Link>

      <p className="text-gray-500 text-sm mt-1">{book.author}</p>
      <div className="flex items-center text-sm mt-2">
        ⭐ <span className="ml-1 font-medium">{book.rating}</span>
        <span className="ml-1 text-gray-400">({book.reviews_count})</span>
      </div>

      <div className="font-semibold mt-3 text-lg flex-1">
        {book.price} {book.currency}
      </div>

      {currentUser.role === "user" && (
        <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition mt-2">
          Add to Cart
        </button>
      )}

      {currentUser.role === "admin" && (
        <button
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition mt-2"
          onClick={() => onEdit(book)}
        >
          Edit
        </button>
      )}
    </div>
  );
};
