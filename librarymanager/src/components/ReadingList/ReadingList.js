/* ReadingList.js */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Navbar from "../Navbar/Navbar";
import React from "react";
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';
import { Button } from '@mui/material';

function getCatalogue() {
    var savedBooks = JSON.parse(localStorage.getItem('books'));
    const preloadBooks = require("../../preloaded_books/preloaded_book_info.json");
    if (savedBooks) {
      for (var preloadedBookId in preloadBooks) {
        if(!savedBooks.includes(preloadBooks[preloadedBookId])) {
          savedBooks.push(preloadBooks[preloadedBookId]);
        }
      }
      return savedBooks;
    } else {
      return preloadBooks;
    }
}

function getReadingListBooks() {
    return JSON.parse(localStorage.getItem('readingListBooks'));
}

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'isbn', headerName: 'Last name', width: 200 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'genre', headerName: 'Genre', width: 200 }
];

const ReadingList = () => {
    
    var bookCatalogue = getCatalogue();
    var catalogueRows = [];
    for (var bookIdCatalogue in bookCatalogue) {
        const thisBook = bookCatalogue[bookIdCatalogue];
        catalogueRows.push({id: thisBook.id, title: thisBook.title, isbn: thisBook.isbn, author: thisBook.author, genre: thisBook.genre,price: thisBook.price});
    }
    
    //var catalogueTableRef = useGridApiContext();
    var catalogueTable = (<DataGrid
        rows={catalogueRows}
        columns={columns}
        initialState={{
        pagination: {
        paginationModel: { page: 0, pageSize: 5 },
        },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
    />);
    var readingListBooks = getReadingListBooks();
    var readingListRows = [];
    for (var bookIdReadingList in readingListBooks) {
        const thisBook = bookCatalogue[bookIdReadingList];
        readingListRows.push({id: thisBook.id, title: thisBook.title, isbn: thisBook.isbn, author: thisBook.author, genre: thisBook.genre,price: thisBook.price});
    }
    
   // var readingTableRef = useGridApiContext();
    var readingListTable = (<DataGrid
        rows={readingListRows}
        columns={columns}
        initialState={{
        pagination: {
        paginationModel: { page: 0, pageSize: 5 },
        },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
    />
    );
    return (
        <div className="readingList">
          <Navbar />
          <div className="main-content">
            <header className="readingList-header">
              <h1>Reading List</h1>
            </header>
            <main>
            {catalogueTable}
            <Button variant="text" onClick={() => {
            }}>Add Books</Button>
            <Button variant="text" onClick={() => {

            }}>Remove Books</Button>
            </main>
            <footer className="readingList-footer">
            {readingListTable}
            </footer>
          </div>
        </div>
    );
}
export default ReadingList;
