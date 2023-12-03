import React, { useState, useEffect } from 'react';
import './LibraryManager.css';
import Navbar from "../Navbar/Navbar";

const AddBookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [pictures, setPictures] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const pictureArray = pictures.split('\n').filter(p => p.trim() !== '');
    onAddBook({ 
      id: Date.now(), 
      title, 
      author, 
      isbn, 
      pictures: pictureArray, 
      description 
    });
    setTitle('');
    setAuthor('');
    setIsbn('');
    setPictures('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
      <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="ISBN" required />
      <textarea value={pictures} onChange={e => setPictures(e.target.value)} placeholder="Picture URLs (one per line)" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Book Description" required />
      <button type="submit">Add Book</button>
    </form>
  );
};

const BookCarousel = ({ books }) => (
  <div className="carousel">
    {books.map(book => (
      <div className="book" key={book.id}>
        {book.pictures.map((picture, index) => (
          <img key={index} src={picture} alt={`${book.title} - ${index + 1}`} />
        ))}
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>ISBN: {book.isbn}</p>
        <p>{book.description}</p>
      </div>
    ))}
  </div>
);

const LibraryManager = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books'));
    if (savedBooks) {
      setBooks(savedBooks);
    }
  }, []);

  const handleNewBook = (newBook) => {
    setBooks(prevBooks => {
      const updatedBooks = [...prevBooks, newBook];
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      return updatedBooks;
    });
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
