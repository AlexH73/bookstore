import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectBooks } from "./booksSlice";
import { currentUser } from "./types/User";

export const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const books = useAppSelector(selectBooks);
  const book = books.find((b) => b.id === Number(id));

  if (!book) return <p>Book not found</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <img
            src={book.cover_url}
            alt={book.title}
            className="rounded-xl shadow-md w-60 md:w-80 object-cover"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">{book.title}</h1>
          <h2 className="text-gray-600 text-lg mb-4">{book.author}</h2>

          <div className="text-xl font-bold mb-4">
            {book.price} {book.currency}
          </div>

          <div className={`text-sm font-medium mb-6 ${book.stock > 0 ? "text-green-600" : "text-red-600"}`}>
            {book.stock > 0 ? "In stock" : "Out of stock"}
          </div>

          {/* Кнопка добавления в корзину для обычного пользователя */}
          {currentUser.role === "user" && (
            <button
              disabled={book.stock === 0}
              className={`w-full md:w-64 py-3 rounded-lg text-white text-lg transition ${
                book.stock > 0 ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
          )}

          <div className="mt-6 border-t border-gray-200 pt-4 text-gray-700 space-y-2">
            <p><span className="font-medium">ISBN:</span> {book.isbn}</p>
            <p><span className="font-medium">Publication Year:</span> {book.publication_year}</p>
            <p><span className="font-medium">Language:</span> {book.language}</p>
            <p><span className="font-medium">Genres:</span> {book.genre.join(", ")}</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Description</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{book.annotation}</p>
      </div>
    </div>
  );
};
