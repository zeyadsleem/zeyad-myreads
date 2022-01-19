import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import { BrowserRouter as Router, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = async () => {
    const receivedBooks = await BooksAPI.getAll();
    this.setState({ books: receivedBooks });
  };

  updateBook = async (id, shelfName) => {
    await BooksAPI.update(id, shelfName);
    this.getBooks();
  };

  changeBookShelf = async (bookId, shelfName) => {
    this.updateBook(bookId, shelfName);
  };

  render() {
    return (
      <div className="app">
        <Router>
          <Route exact path="/">
            <HomePage
              books={this.state.books}
              onChangeshelf={this.changeBookShelf}
            />
          </Route>
          <Route path="/search">
            <SearchPage
              books={this.state.books}
              onChangeshelf={this.changeBookShelf}
            />
          </Route>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
