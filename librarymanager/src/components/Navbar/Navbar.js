import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../LibraryManager/LibraryManager.css';

const Navbar = () => (
    <aside className="sidebar">
      <div className="sidebar-section">
        <button className="sidebar-item">Library</button>
        <div className="search-container">
          <form className="search-bar">
            <input type="search" placeholder="Search books..." />
            <button type="submit">🔍</button>
          </form>
        </div>
        <button className="sidebar-item active">Dashboard</button>
        <button className="sidebar-item">Reading List</button>
        <button className="sidebar-item"><Link to="/libraryManager" className="link-style">Manage Inventory (staff)</Link></button>
      </div>
      <div className="sidebar-section">
        <button className="sidebar-item">
          <Link to="/login" className="link-style">Profile</Link>
        </button>
        <button className="sidebar-item">Logout</button>
      </div>
    </aside>
  );

  export default Navbar;

  