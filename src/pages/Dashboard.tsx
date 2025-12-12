import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import {
  Person,
  ShoppingCart,
  FavoriteBorder,
  History,
  Settings,
  Logout,
  Book,
  Star,
  LocalShipping,
  Security,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { icon: <Book />, label: 'Books Read', value: '12', color: 'text-primary' },
    {
      icon: <ShoppingCart />,
      label: 'Orders',
      value: '5',
      color: 'text-secondary',
    },
    { icon: <Star />, label: 'Reviews', value: '8', color: 'text-warning' },
    {
      icon: <FavoriteBorder />,
      label: 'Wishlist',
      value: '23',
      color: 'text-accent',
    },
  ];

  const quickActions = [
    { icon: <ShoppingCart />, label: 'Continue Shopping', to: '/catalog' },
    { icon: <History />, label: 'Order History', to: '/orders' },
    { icon: <FavoriteBorder />, label: 'My Wishlist', to: '/wishlist' },
    { icon: <Settings />, label: 'Account Settings', to: '/settings' },
  ];

  return (
    <div className='container-custom py-10 px-10'>
      {/* Breadcrumbs */}
      <div className='flex items-center text-sm text-muted-foreground mb-8'>
        <span
          className='hover:text-primary cursor-pointer'
          onClick={() => navigate('/')}
        >
          Home
        </span>
        <span className='mx-2'>/</span>
        <span className='text-foreground font-semibold'>Dashboard</span>
      </div>

      {/* Header Banner */}
      <div className='bg-gradient-primary rounded-2xl p-8 text-white shadow-md mb-10'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
          <div className='flex items-center gap-5'>
            <div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur'>
              <Person className='w-10 h-10' />
            </div>

            <div>
              <h1 className='text-3xl font-bold'>
                Welcome back, {user?.name || user?.email?.split('@')[0]}!
              </h1>
              <p className='opacity-80 mt-1'>
                Member since{' '}
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className='flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors'
          >
            <Logout className='w-5 h-5' />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
        {/* Left side */}
        <div className='lg:col-span-2 space-y-10'>
          {/* Stats */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
            {stats.map((stat, index) => (
              <div key={index} className='card p-6 rounded-xl'>
                <div className={`${stat.color} mb-3`}>{stat.icon}</div>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <div className='text-sm text-muted-foreground'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className='card rounded-xl overflow-hidden'>
            <div className='p-6 border-b border-border'>
              <h2 className='text-xl font-bold'>Recent Orders</h2>
            </div>

            <div className='p-6'>
              <div className='space-y-4'>
                {[1, 2, 3].map((order) => (
                  <div
                    key={order}
                    className='flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-colors'
                  >
                    <div className='flex items-center gap-4'>
                      <img
                        src={`https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=150&fit=crop&${order}`}
                        alt='Book'
                        className='w-12 h-16 object-cover rounded-md'
                      />
                      <div>
                        <h3 className='font-semibold'>Book Title {order}</h3>
                        <p className='text-sm text-muted-foreground'>
                          Order #ORD-2024-{1000 + order}
                        </p>
                      </div>
                    </div>

                    <div className='text-right'>
                      <div className='font-bold'>€{19.99 + order}</div>
                      <div className='text-sm text-success'>Delivered</div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/orders')}
                className='btn-outline w-full mt-6'
              >
                View All Orders
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className='card p-6 rounded-xl'>
            <h2 className='text-xl font-bold mb-6'>Quick Actions</h2>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.to)}
                  className='flex flex-col items-center p-4 border border-border rounded-xl hover:bg-muted transition-colors'
                >
                  <div className='text-primary mb-2'>{action.icon}</div>
                  <span className='text-sm font-medium text-center'>
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className='space-y-10'>
          {/* Account Info */}
          <div className='card p-6 rounded-xl'>
            <h2 className='text-xl font-bold mb-6'>Account Information</h2>

            <div className='space-y-4'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Email</span>
                <span className='font-medium'>{user?.email}</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Account Type</span>
                <span className='badge-primary'>Premium Reader</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Reading Level</span>
                <span className='font-medium'>Advanced</span>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className='card p-6 rounded-xl'>
            <div className='flex items-center gap-3 mb-6'>
              <Security className='w-6 h-6 text-success' />
              <h2 className='text-xl font-bold'>Security</h2>
            </div>

            <div className='space-y-4'>
              <button className='w-full text-left p-4 border border-border rounded-xl hover:bg-muted transition-colors'>
                <div className='font-medium'>Change Password</div>
                <div className='text-sm text-muted-foreground'>
                  Update your password regularly
                </div>
              </button>

              <button className='w-full text-left p-4 border border-border rounded-xl hover:bg-muted transition-colors'>
                <div className='font-medium'>Two-Factor Authentication</div>
                <div className='text-sm text-muted-foreground'>
                  Add an extra layer of security
                </div>
              </button>
            </div>
          </div>

          {/* Shipping & Payment */}
          <div className='card p-6 rounded-xl'>
            <div className='flex items-center gap-3 mb-6'>
              <LocalShipping className='w-6 h-6 text-primary' />
              <h2 className='text-xl font-bold'>Shipping & Payment</h2>
            </div>

            <div className='space-y-4'>
              <button className='w-full text-left p-4 border border-border rounded-xl hover:bg-muted transition-colors'>
                <div className='flex justify-between'>
                  <div>
                    <div className='font-medium'>Default Address</div>
                    <div className='text-sm text-muted-foreground'>
                      123 Main St, Berlin
                    </div>
                  </div>
                  <span className='text-primary text-sm'>Edit</span>
                </div>
              </button>

              <button className='w-full text-left p-4 border border-border rounded-xl hover:bg-muted transition-colors'>
                <div className='flex justify-between'>
                  <div>
                    <div className='font-medium'>Payment Methods</div>
                    <div className='text-sm text-muted-foreground'>
                      •••• 4242 (Visa)
                    </div>
                  </div>
                  <span className='text-primary text-sm'>Manage</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
