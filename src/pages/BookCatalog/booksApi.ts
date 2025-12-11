import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book } from "./types/Book";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tetianaanufriieva.github.io/books-json-data/",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => "data.json",
    }),
    getBookById: builder.query<Book, string>({
      query: () => "data.json",
      transformResponse: (response: Book[], _meta, id) => {
        const bookId = Number(id);
        const found = response.find((book) => book.id === bookId);
        if (!found) throw new Error("Book not found");
        return found;
      },
    }),
    addBook: builder.mutation<Book, Partial<Book>>({
      queryFn: async (newBook) => ({ data: { ...newBook, id: Date.now() } as Book }),
    }),
    updateBook: builder.mutation<Book, Partial<Book> & { id: number }>({
      queryFn: async (updatedBook) => ({ data: updatedBook as Book }),
    }),
    deleteBook: builder.mutation<{ success: boolean; id: number }, number>({
      queryFn: async (id) => ({ data: { success: true, id } }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;