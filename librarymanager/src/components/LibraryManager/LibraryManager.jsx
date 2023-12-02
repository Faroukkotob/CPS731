import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LibraryManager.css';
import Navbar from "../Navbar/Navbar"

const AddBookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook({ id: Date.now(), title, author, cover });
    setTitle('');
    setAuthor('');
    setCover('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
      <input type="text" value={cover} onChange={e => setCover(e.target.value)} placeholder="Cover URL" required />
      <button type="submit">Add Book</button>
    </form>
  );
};

const BookCarousel = ({ books }) => (
  <div className="carousel">
    {books.map(book => (
      <div className="book" key={book.id}>
        <img src={book.cover} alt={book.title} />
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      </div>
    ))}
  </div>
);

const LibraryManager = () => {
  const [books, setBooks] = useState([]);

  const handleNewBook = (newBook) => {
    setBooks(prevBooks => [...prevBooks, newBook]);
  };

  return (
    <div className="library-manager">
      <Navbar />
      <div className="main-content">
        <header className="library-header">
          <h1>Library Manager</h1>
        </header>
        <main>
          <AddBookForm onAddBook={handleNewBook} />
          <section className="carousel-section">
            <h2>Curated by our staff</h2>
            <BookCarousel books={books} />
          </section>
        </main>
        <footer className="library-footer">
          {/* Footer content here */}
        </footer>
      </div>
    </div>
  );
};

export default LibraryManager;
