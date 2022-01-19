import React from "react";

export default function Book(props) {
  const { book, onChangeshelf } = props;
  const blankImage = "";

  const changeBookShelf = (e) => {
    let category = e.target.value;
    onChangeshelf(book.id, category);
  };
  return (
    !(book === "") && (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${
                book.imageLinks ? book.imageLinks.thumbnail : blankImage
              }")`,
            }}
          />
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={changeBookShelf}>
              <option value="move" disabled>
                Move on
              </option>

              <option value="currentlyReading">Currently Reading</option>

              <option value="wantToRead">Want to Read</option>

              <option value="read">Read</option>

              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {Array.isArray(book.authors) ? (
            book.authors.map((author) => (
              <div key={author}>
                <span>{author}</span>
                <br />
              </div>
            ))
          ) : (
            <span>{book.authors}</span>
          )}
        </div>
      </div>
    )
  );
}
