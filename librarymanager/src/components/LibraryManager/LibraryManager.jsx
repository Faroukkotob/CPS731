import React, { useState, useEffect } from 'react';
import './LibraryManager.css';
import Navbar from "../Navbar/Navbar";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const AddBookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [genre, setGenre] = useState('');
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
      genre,
      pictures: pictureArray, 
      description 
    });
    setTitle('');
    setAuthor('');
    setIsbn('');
    setGenre('');
    setPictures('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
      <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="ISBN" required />
      <input type="text" value={genre} onChange={e => setGenre(e.target.value)} placeholder="Genre" required />
      <textarea value={pictures} onChange={e => setPictures(e.target.value)} placeholder="Picture URLs (one per line)" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Book Description" required />
      <button type="submit">Add Book</button>
    </form>
  );
};


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const BookCarousel = ({ books }) => {
    const [emblaRef] = useEmblaCarousel({slidesToScroll: 3})
    var booksRenders = books.map(book => (
      <div className="embla__slide">
      <div className="book" key={book.id}>
        {book.pictures.map((picture, index) => (
          <img key={index} src={picture} alt={`${book.title} - ${index + 1}`} />
        ))}
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>ISBN: {book.isbn}</p>
        <p>{book.description}</p>
      </div>
      </div>
    ))
    return(
      
    <div className="embla" ref={emblaRef}>
      <div className="embla__container"> {
        booksRenders
      }
      </div>
    </div>
)}

const LibraryManager = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    var savedBooks = JSON.parse(localStorage.getItem('books'));
    console.log(savedBooks);
    const preloadBooks = require("../../preloaded_books/preloaded_book_info.json");
    console.log(preloadBooks);
    if (savedBooks) {
      for (var preloadedBookId in preloadBooks) {
        console.log("iterating on book:");
        if(!savedBooks.includes(preloadBooks[preloadedBookId])) {
          savedBooks.push(preloadBooks[preloadedBookId]);
        }
      }
      console.log("books after iteration");
      console.log(savedBooks);
      setBooks(savedBooks);
    } else {
      setBooks(preloadBooks);
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
