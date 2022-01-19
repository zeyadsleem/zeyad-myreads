import axios from "axios";
import React, { Component } from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

export default class Search extends Component {
  state = {
    query: "",
    books: [],
  };

  cancellation = null;

  getBookSearchResults = async (input) => {
    try {
      const searchedBooks = await BooksAPI.search(
        input,
        this.cancellation
      );
      if (searchedBooks.error) return [];
      else if (searchedBooks) {
        const updatedBooks = this.updateBookShelves(searchedBooks);
        return updatedBooks;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  updateBookShelves(searchedBooks) {
    const { books } = this.props;
    const updatedBooks = searchedBooks.map((searchedBook) => {
      books.forEach((homeBook) => {
        if (homeBook.id === searchedBook.id) {
          searchedBook.shelf = homeBook.shelf;
        }
      });
      if (!searchedBook.shelf) searchedBook.shelf = "none";
      return searchedBook;
    });
    return updatedBooks;
  }
  cancellationRequest = () => {
    if (this.cancellation !== null) {
      this.cancellation.cancel("cancelled reqest");
    }
    this.cancellation = axios.CancelToken.source();
  };

  handleChange = async (event) => {
    const query = event.target.value;
    this.setState({ query });
    this.cancellationRequest();
    if (query === "") {
      this.setState({ books: [] });
    } else if (query) {
      const searchedBooks = await this.getBookSearchResults(query);
      if (searchedBooks && searchedBooks.length > 0) {
        this.setState({ books: searchedBooks });
      } else {
        this.setState({ books: [] });
      }
    }
  };

  render() {
    const { onChangeshelf } = this.props;
    const { books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              value={this.state.query}
              onChange={this.handleChange}
              placeholder="Search By Book itle"
            />
          </div>
          <p />
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length === 0 ? (
              <li />
            ) : (
              books.map((book) => (
                <li key={book.id}>
                  <Book book={book} onChangeshelf={onChangeshelf} />
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    );
  }
}
