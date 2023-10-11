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

    addBook: () => {
    return supertest(url)
        .post('/BookStore/v1/Books')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({userId: `${userId}`, collectionOfIsbns: [{isbn: `${isbn}`}]});
    },

    putBook: () => {
    return supertest(url)
        .put(`/BookStore/v1/Books/${booksConstants.firstBook.isbn}`)
        .set("Accept", "application/json")
        .set('Authorization', `Bearer ${token}`)
        .send();
    },

    deleteBook: () => {
    return supertest(url)
      .delete(`/BookStore/v1/Book`)
      .set("Accept", "application/json")
      .set('Authorization', `Bearer ${token}`)
      .send();
    },
};

export default book;