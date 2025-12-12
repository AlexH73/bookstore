export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role?: 'user' | 'admin';
  createdAt: string;
}

export interface AuthUser {
  email: string;
  name?: string;
  token?: string;
  role?: 'user' | 'admin';
  isAuthenticated: boolean;
}

// Сохранение текущего пользователя
export const saveAuthUser = (user: User) => {
  const authData = {
    email: user.email,
    name: user.name,
    isAuthenticated: true,
    lastLogin: new Date().toISOString(),
  };
  localStorage.setItem('auth_user', JSON.stringify(authData));
};

// Получение текущего пользователя
export const getAuthUser = (): AuthUser | null => {
  const data = localStorage.getItem('auth_user');
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

// Очистка данных пользователя
export const clearAuthUser = () => {
  localStorage.removeItem('auth_user');
};

// Сохранение всех пользователей (для демо)
export const saveUsers = (
  users: Record<string, { password: string; user: User }>
) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Получение всех пользователей
export const getUsers = (): Record<
  string,
  { password: string; user: User }
> => {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : {};
};

// Сохранение токена
export const saveToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

// Получение токена
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Проверка, аутентифицирован ли пользователь
export const isAuthenticated = (): boolean => {
  const user = getAuthUser();
  return user?.isAuthenticated || false;
};

// Очистка всех данных аутентификации
export const clearAllAuthData = () => {
  localStorage.removeItem('auth_user');
  localStorage.removeItem('auth_token');
  // Не удаляем users, чтобы сохранить регистрации
};
