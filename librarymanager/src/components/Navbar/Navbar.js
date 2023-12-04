import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../LibraryManager/LibraryManager.css';
import dashboardIcon from './dashboard.jpg';
import readingListIcon from './books.jpg';
import manageInventoryIcon from './books.jpg';
import profileIcon from './profile.jpg';
import loginIcon from './login.jpg'; 
import searchIcon from './Search.jpg';
import Auth from '../Auth/Auth'; 
import ReadingList from '../ReadingList/ReadingList';
import Staff from '../Orders/Staff';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Library</h1>
      </div>
      <div className="search-container">
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <button type="submit" className="search-button">
            <img src={searchIcon} alt="Search" className="search-icon" />
          </button>
          <input 
            type="search" 
            placeholder="Search"
            value={searchTerm} 
            onChange={handleSearchChange}
            className="search-input"
          />
        </form>
      </div>
      <div className="sidebar-section">
        <button className="sidebar-item active">
          <img src={dashboardIcon} alt="Dashboard" className="sidebar-icon" /> Dashboard
        </button>
        <Link to="/readingList" className="sidebar-item link-style">
          <img src={readingListIcon} alt="Reading List" className="sidebar-icon" /> Reading List
        </Link>
        <Link to="/libraryManager" className="sidebar-item link-style">
          <img src={manageInventoryIcon} alt="Manage Inventory" className="sidebar-icon" /> Manage Inventory 
        </Link>
        <Link to="/staff" className="sidebar-item link-style">
          <img src={profileIcon} alt="Profile" className="sidebar-icon" /> Staff
        </Link>
        <Link to="/checkout" className="sidebar-item link-style">
          <img src={profileIcon} alt="Manage Inventory" className="sidebar-icon" /> Checkout
        </Link>
        <Link to="/orders" className="sidebar-item link-style">
          <img src={profileIcon} alt="Manage Inventory" className="sidebar-icon" /> Orders
        </Link>
        <Auth isLoggedIn={isLoggedIn} loginIcon={loginIcon} />
      </div>
    </aside>
  );
};

export default Navbar;
