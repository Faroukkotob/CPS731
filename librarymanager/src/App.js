import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LibraryManager from './components/LibraryManager/LibraryManager';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/libraryManager" element={<LibraryManager />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        </Routes>
    </Router>
  );
}

export default App;