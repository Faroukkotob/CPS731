import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../LibraryManager/LibraryManager.css';

const Sidebar = () => (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-item">Library</div>
        <div className="search-container">
          <form className="search-bar">
            <input type="search" placeholder="Search books..." />
            <button type="submit">🔍</button>
          </form>
        </div>
        <div className="sidebar-item active">Dashboard</div>
        <div className="sidebar-item">Reading List</div>
        <div className="sidebar-item">Manage Inventory (staff)</div>
      </div>
      <div className="sidebar-section">
      <div className="sidebar-item">Profile</div>
        <div className="sidebar-item">Logout</div>
      </div>
    </aside>
  );

const checkout = () => {
    return (
        <div className="library-manager">
      <Sidebar />
      <center><h1>hhi</h1></center>
      </div>
    );
};

export default checkout;