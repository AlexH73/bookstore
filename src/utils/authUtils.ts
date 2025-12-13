// src/utils/authUtils.ts
export interface User {
  id?: string;
  email: string;
  name?: string;
  role?: 'user' | 'admin';
  isAuthenticated: boolean;
}

export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('bookstore_user');
    if (!userStr) return null;

    const user = JSON.parse(userStr);
    // Роль по умолчанию
    if (user && !user.role) {
      user.role = 'user'; // По умолчанию все обычные пользователи
      // Делаем админом определенных пользователей
      if (
        user.email === 'admin@bookstore.com' ||
        user.email === 'demo@bookstore.com'
      ) {
        user.role = 'admin';
      }
    }
    return user;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

export const canEditBook = (book: any): boolean => {
  const user = getCurrentUser();
  if (!user?.isAuthenticated) return false;

  // Админы могут редактировать все локальные книги
  if (user.role === 'admin' && book?.isLocal) return true;

  // Пользователи могут редактировать только свои книги
  if (book?.addedBy === user.email) return true;

  return false;
};
