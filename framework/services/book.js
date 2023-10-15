import supertest from "supertest";
import config from "../config";
import booksConstants from "../constants";

const { url } = config;

const book = {

    getBook: ( ) => {
    return supertest(url)
      .get("/BookStore/v1/Book")
      .set("Accept", "application/json")
      .send();
    },

    getBooks: () => {
    return supertest(url)
      .get("/BookStore/v1/Books")
      .set("Accept", "application/json")
      .send();
    },

    addBook: (payload, token) => {
    return supertest(url)
        .post('/BookStore/v1/Books')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(payload);
    },

    putBook: (firstBook, userId, isbn, token) => {
    return supertest(url)
        .put(`/BookStore/v1/Books/${firstBook}`)
        .set("Accept", "application/json")
        .set('Authorization', `Bearer ${token}`)
        .send({
            userId: `${userId}`,
            isbn: `${isbn}`,
          });
    },

    deleteBook: (token) => {
    return supertest(url)
      .delete(`/BookStore/v1/Book`)
      .set("Accept", "application/json")
      .set('Authorization', `Bearer ${token}`)
      .send();
    },
};

export default book;