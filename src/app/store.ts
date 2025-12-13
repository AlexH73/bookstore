import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import existing reducers
import languageReducer from '../features/language/languageSlice';
import themeReducer from '../features/theme/themeSlice';
import booksReducer from '../pages/BookCatalog/booksSlice';


// ---------- Комбинируем все редьюсеры ----------

const rootReducer = combineReducers({
  language: languageReducer,
  theme: themeReducer,
  books: booksReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language', 'theme', 'user', "books"],
  blacklist: [], // Исключаем то, что не нужно сохранять
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ---------- Создаём store ----------

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {},
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
