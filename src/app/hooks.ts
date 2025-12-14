import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { canEditBook, getCurrentUser, isAdmin } from "../utils/authUtils";

export const useAppDispatch = ()=>useDispatch<AppDispatch>();
// → Делаем свой useDispatch, который знает типы Actions.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// → Делаем свой useSelector, который знает структуру всего Redux state.

// Специальные хуки для авторизации (работают с AuthContext через localStorage)
export const useCurrentUser = () => {
  return getCurrentUser();
};

export const useIsAdmin = () => {
  return isAdmin();
};

export const useCanEditBook = (book: any) => {
  return canEditBook(book);
};

export const useIsAuthenticated = () => {
  const user = getCurrentUser();
  return user?.isAuthenticated || false;
};
