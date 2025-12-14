import { getUsers, saveUsers } from '../utils/storage';

export const initializeDemoData = () => {
  console.log('Initializing demo data...');

  const users = getUsers();
  let hasChanges = false;

  // Демо админ
  if (!users['admin@bookstore.com']) {
    const adminUser = {
      id: 'admin_001',
      email: 'admin@bookstore.com',
      name: 'Administrator',
      role: 'admin' as const, // Явно указываем тип
      createdAt: new Date().toISOString(),
    };

    users['admin@bookstore.com'] = {
      password: 'admin123',
      user: adminUser,
    };
    hasChanges = true;
    console.log('Demo admin created');
  }

  // Демо пользователь
  if (!users['demo@bookstore.com']) {
    const demoUser = {
      id: 'user_001',
      email: 'demo@bookstore.com',
      name: 'Demo User',
      role: 'user' as const, // Явно указываем тип
      createdAt: new Date().toISOString(),
    };

    users['demo@bookstore.com'] = {
      password: 'demo123',
      user: demoUser,
    };
    hasChanges = true;
    console.log('Demo user created');
  }

  // Дополнительный тестовый пользователь
  if (!users['user@example.com']) {
    const testUser = {
      id: 'user_002',
      email: 'user@example.com',
      name: 'Test User',
      role: 'user' as const,
      createdAt: new Date().toISOString(),
    };

    users['user@example.com'] = {
      password: 'password123',
      user: testUser,
    };
    hasChanges = true;
    console.log('Test user created');
  }

  if (hasChanges) {
    saveUsers(users);
    console.log('Demo data saved');
  }
};
