/* ReadingList.js */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Navbar from "../Navbar/Navbar";
import React from "react";
import { DataGrid } from '@mui/x-data-grid';

const ReadingList = () => {
    
    var loadedBooks = require("../../preloaded_books/preloaded_book_info.json");
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'isbn', headerName: 'Last name', width: 200 },
        { field: 'author', headerName: 'Author', width: 200 },
        { field: 'genre', headerName: 'Genre', width: 200 }
    ];
    var rows = [];
    for (var bookId in loadedBooks) {
        const thisBook = loadedBooks[bookId];
        rows.push({id: thisBook.id, title: thisBook.title, isbn: thisBook.isbn, author: thisBook.author, genre: thisBook.genre});
    }
    return (
        <div className="readingList">
          <Navbar />
          <div className="main-content">
            <header className="readingList-header">
              <h1>Reading List</h1>
            </header>
            <main>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            />
            </main>
            <footer className="readingList-footer">
              {/* Footer content here */}
            </footer>
          </div>
        </div>
    );
}
export default ReadingList;