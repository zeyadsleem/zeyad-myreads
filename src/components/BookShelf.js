import React from "react";
import Book from "./Book";

export default function BookShelf(props) {
  const { books, shelfName, onChangeshelf } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.length > 0 &&
            books.map((book) => (
              <li key={book.id}>
                <Book book={book} onChangeshelf={onChangeshelf} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
