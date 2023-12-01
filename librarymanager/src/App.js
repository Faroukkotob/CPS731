import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LibraryManager from './components/LibraryManager/LibraryManager';
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/libraryManager" element={<LibraryManager />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        </Routes>
    </Router>
  );
}

export default App;