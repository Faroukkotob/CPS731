/* ReadingList.js */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Navbar from "../Navbar/Navbar";
import React from "react";
import { DataGrid } from '@mui/x-data-grid';
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
    { field: 'isbn', headerName: 'Isbn', width: 200 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'genre', headerName: 'Genre', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 }
];

var readingListSelected = new Set();
var catalogueSelected = new Set();


const ReadingList = () => {
  
    var [catalogueRows,setCatalogueRows] = React.useState([]);
    var [readingListRows, setReadingListRows] = React.useState([]);

    var bookCatalogue = getCatalogue();
    for (var bookIdCatalogue in bookCatalogue) {
        const thisBook = bookCatalogue[bookIdCatalogue];
        catalogueRows = [...catalogueRows, {id: thisBook.id, title: thisBook.title, isbn: thisBook.isbn, author: thisBook.author, genre: thisBook.genre, price: thisBook.price}];
    }
  
    function onCatalogueSelectionModelChange(ids) {
      catalogueSelected = new Set(ids);
      console.log(catalogueSelected);
    }

    var catalogueTable = (<DataGrid
        rows={catalogueRows}
        onRowSelectionModelChange={(ids) => onCatalogueSelectionModelChange(ids)}
        columns={columns}
        initialState={{
        pagination: {
        paginationModel: { page: 0, pageSize: 5 },
        },
        }}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10]}
        checkboxSelection
    />);
    var readingListBooks = getReadingListBooks();
    for (var bookIdReadingList in readingListBooks) {
        const thisBook = bookCatalogue[bookIdReadingList];
        readingListRows = [...readingListRows, {id: thisBook.id, title: thisBook.title, isbn: thisBook.isbn, author: thisBook.author, genre: thisBook.genre, price: thisBook.price}]
    }
    
    function onReadingListSelectionModelChange(ids) {
      readingListSelected = new Set(ids);
      console.log(catalogueSelected);
    }

    var readingListTable = (<DataGrid
        rows={readingListRows}
        onRowSelectionModelChange={(ids) => onReadingListSelectionModelChange(ids)}
        columns={columns}
        initialState={{
        pagination: {
        paginationModel: { page: 0, pageSize: 5 },
        },
        }}
        getRowId={(row) => row.id}
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
        <h2>Catalogue</h2>
        </header>
            <main>
        {catalogueTable}
            <Button variant="text" onClick={() => {
              const selectedCatalogueBooks = catalogueRows.filter((book) => {
                console.log("Book selection");
                console.log(book);
                return catalogueSelected.has(book.id) && readingListRows.every((alreadyOnList) => alreadyOnList.id !== book.id);
              })
              readingListRows = [...readingListRows, ...selectedCatalogueBooks];
              setReadingListRows(readingListRows);
            }}>Add Books</Button>
            </main>
            <h2>My List</h2>
            <footer className="readingList-footer">
            {readingListTable}
            <Button variant="text" onClick={() => {
              readingListRows = readingListRows.filter((book) =>
               !readingListSelected.has(book.id));
              setReadingListRows(readingListRows);
            }}>Remove Books</Button>
            </footer>
          </div>
        </div>
    );
}
export default ReadingList;
