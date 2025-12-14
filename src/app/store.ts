import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { bookApi } from '../api/bookApi';

// Import existing reducers
import languageReducer from '../features/language/languageSlice';
import themeReducer from '../features/theme/themeSlice';
import authReducer from '../features/auth/authSlice';


// ---------- Комбинируем все редьюсеры ----------

const rootReducer = combineReducers({
  language: languageReducer,
  theme: themeReducer,
  auth: authReducer,
  [bookApi.reducerPath]: bookApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language', 'theme', 'user'],
  blacklist: [bookApi.reducerPath], // Исключаем то, что не нужно сохранять
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ---------- Создаём store ----------

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }).concat(bookApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
