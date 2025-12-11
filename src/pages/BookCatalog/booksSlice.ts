import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import type { Book } from "./types/Book";

interface BooksState {
  items: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  loading: false,
  error: null,
};

// Подгрузка книг с API
export const fetchBooks = createAsyncThunk<Book[]>(
  "books/fetchBooks",
  async () => {
    const res = await fetch("https://tetianaanufriieva.github.io/books-json-data/data.json");
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return await res.json();
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<Book>) {
      state.items.push(action.payload);
    },
    removeBook(state, action: PayloadAction<number>) {
      state.items = state.items.filter((b) => b.id !== action.payload);
    },
    updateBook(state, action: PayloadAction<Book>) {
      const index = state.items.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading books";
      });
  },
});

export const { addBook, removeBook, updateBook } = booksSlice.actions;
export const selectBooks = (state: RootState) => state.books.items;
export const selectLoading = (state: RootState) => state.books.loading;
export const selectError = (state: RootState) => state.books.error;
export default booksSlice.reducer;