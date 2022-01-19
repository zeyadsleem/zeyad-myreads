import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

export default class HomePage extends Component {
  getShelvesFromBooks = (books) => {
    const currentlyReading = books.filter(
      (book) => book.shelf === "currentlyReading"
    );

    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");

    return [
      {
        id: 1,
        title: "Currently Reading",
        books: currentlyReading,
      },
      {
        id: 2,
        title: "Want To Read",
        books: wantToRead,
      },
      {
        id: 3,
        title: "Read",
        books: read,
      },
    ];
  };

  render() {
    const shelves = this.getShelvesFromBooks(this.props.books);
    const { onChangeshelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          {shelves.length > 0 &&
            shelves.map((shelf) => (
              <BookShelf
                key={shelf.id}
                books={shelf.books}
                shelfName={shelf.title}
                onChangeshelf={onChangeshelf}
              />
            ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
