 import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import Layout from './components/layout/Layout';
//import Home from './pages/Home';
import Login from './RegisterUndLogin/Login';
import Register from './RegisterUndLogin/Register';
import Dashboard from './RegisterUndLogin/Dashboard';
import ProtectedRoute from './RegisterUndLogin/utils/ProtectedRoute';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
// import Catalog from './pages/Catalog';
// import Product from './pages/Product';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useThemeMode } from './features/theme/useThemeMode';

const App: React.FC = () => {
  useThemeMode(); 
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
     {/* <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path='catalog' element={<Catalog />} />
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} /> 
      </Route> */}
  
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path='catalog' element={<Catalog />} />
        <Route path='product/:id' element={<Product />} />
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} /> */}

        {/* Auth Routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        {/* Protected Routes */}
        <Route
          path='dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Additional Protected Routes */}
        <Route
          path='orders'
          element={
            <ProtectedRoute>
              <div className='container-custom py-8'>
                <h1 className='text-3xl font-bold'>My Orders</h1>
                <p>Order history page (coming soon)</p>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path='wishlist'
          element={
            <ProtectedRoute>
              <div className='container-custom py-8'>
                <h1 className='text-3xl font-bold'>My Wishlist</h1>
                <p>Wishlist page (coming soon)</p>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
};

export default App;