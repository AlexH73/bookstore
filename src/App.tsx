import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { BooksList } from "./pages/BookCatalog/BooksList";
import { Provider } from "react-redux";
import { BookDetails } from "./pages/BookCatalog/BookInfo";
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="bestseller" element={<BooksList />} />
            <Route path="book/:id" element={<BookDetails />} />

            {/* В будущем можно добавить: */}
            {/* <Route path="cart" element={<Cart />} /> */}
            {/* <Route path="checkout" element={<Checkout />} /> */}
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
};

export default App;
