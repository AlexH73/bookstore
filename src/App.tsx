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
import { useThemeMode } from './features/theme/useThemeMode';
// import Catalog from './pages/Catalog';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';

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
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} /> */}
      </Route>
    </Routes>
  );
};

export default App;