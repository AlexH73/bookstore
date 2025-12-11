import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addBook, updateBook } from "./booksSlice";
import type { Book } from "./types/Book";
import { currentUser } from "./types/User";

export interface BookFormProps {
  bookToEdit?: Book;
  onClose: () => void;
}

export const BookForm = ({ bookToEdit, onClose }: BookFormProps) => {
  const dispatch = useAppDispatch();

  if (!currentUser || currentUser.role !== "admin") return null;

  const [formData, setFormData] = useState<Book>(
    bookToEdit ?? {
      id: Date.now(),
      title: "",
      author: "",
      isbn: "",
      publication_year: new Date().getFullYear(),
      language: "",
      genre: [],
      price: 0,
      currency: "USD",
      stock: 0,
      rating: 0,
      reviews_count: 0,
      cover_url: "",
      annotation: "",
    }
  );

  const [errors, setErrors] = useState<{ title?: string; author?: string }>({});

  const handleSave = () => {
    const newErrors: typeof errors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (!confirm("Do you really want to save?")) return;

    if (bookToEdit) {
      dispatch(updateBook(formData));
    } else {
      dispatch(addBook(formData));
    }

    onClose();
  };

  const handleChange = (field: keyof Book, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const inputBaseClasses =
    "border p-2 rounded w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-5 md:p-6 rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">
          {bookToEdit ? "Edit Book" : "Add New Book"}
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">
            Title *
          </label>
          <input
            className={`${inputBaseClasses} ${
              errors.title ? "border-red-500 ring-red-200" : "border-gray-300"
            }`}
            placeholder="Enter book title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">
            Author *
          </label>
          <input
            className={`${inputBaseClasses} ${
              errors.author ? "border-red-500 ring-red-200" : "border-gray-300"
            }`}
            placeholder="Enter author name"
            value={formData.author}
            onChange={(e) => handleChange("author", e.target.value)}
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
          )}
        </div>

        {/* ISBN */}
        <div className="mb-3">
          <label className="block font-medium mb-1 text-gray-700">ISBN</label>
          <input
            className={inputBaseClasses}
            placeholder="ISBN"
            value={formData.isbn}
            onChange={(e) => handleChange("isbn", e.target.value)}
          />
        </div>

        {/* Year + Language */}
        <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Publication Year
            </label>
            <input
              type="number"
              className={inputBaseClasses}
              value={formData.publication_year}
              onChange={(e) =>
                handleChange("publication_year", Number(e.target.value))
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Language
            </label>
            <input
              className={inputBaseClasses}
              placeholder="Language"
              value={formData.language}
              onChange={(e) => handleChange("language", e.target.value)}
            />
          </div>
        </div>

        {/* Genre */}
        <div className="mb-3">
          <label className="block font-medium mb-1 text-gray-700">
            Genre (comma-separated)
          </label>
          <input
            className={inputBaseClasses}
            value={formData.genre.join(", ")}
            onChange={(e) =>
              handleChange(
                "genre",
                e.target.value.split(",").map((g) => g.trim())
              )
            }
          />
        </div>

        {/* Price + Currency */}
        <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Price
            </label>
            <input
              type="number"
              className={inputBaseClasses}
              value={formData.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Currency
            </label>
            <input
              className={inputBaseClasses}
              value={formData.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
            />
          </div>
        </div>

        {/* Stock + Rating */}
        <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Stock
            </label>
            <input
              type="number"
              className={inputBaseClasses}
              value={formData.stock}
              onChange={(e) => handleChange("stock", Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Rating
            </label>
            <input
              type="number"
              className={inputBaseClasses}
              value={formData.rating}
              onChange={(e) => handleChange("rating", Number(e.target.value))}
            />
          </div>
        </div>

        {/* Reviews Count + Cover URL */}
        <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Reviews Count
            </label>
            <input
              type="number"
              className={inputBaseClasses}
              value={formData.reviews_count}
              onChange={(e) =>
                handleChange("reviews_count", Number(e.target.value))
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Cover URL
            </label>
            <input
              className={inputBaseClasses}
              value={formData.cover_url}
              onChange={(e) => handleChange("cover_url", e.target.value)}
            />
          </div>
        </div>

        {/* Annotation */}
        <div className="mb-3">
          <label className="block font-medium mb-1 text-gray-700">
            Annotation
          </label>
          <textarea
            className={`${inputBaseClasses} resize-none h-24`}
            value={formData.annotation}
            onChange={(e) => handleChange("annotation", e.target.value)}
          />
        </div>

        <div className="flex gap-3 mt-6 justify-end">
          <button
            className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition w-full md:w-auto"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-300 text-gray-800 py-2 px-6 rounded hover:bg-gray-400 transition w-full md:w-auto"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
