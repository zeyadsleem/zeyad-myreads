import axios from "axios";

// API from Udacity

const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books);

export const update = (id, shelf) =>
  fetch(`${api}/books/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const search = async (query, cancelToken) => {
  const { data } = await axios.post(
    `${api}/search`,
    { query },
    {
      headers: {
        Authorization: token,
      },
      cancelToken: cancelToken.token,
    }
  );
  return data.books;
};
