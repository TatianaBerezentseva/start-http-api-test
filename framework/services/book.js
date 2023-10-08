import supertest from "supertest";

import config from "../config/config";
const { faker } = require('@faker-js/faker');
const { url } = config

// контроллер user
const book = {
    // Функция авторизации
    delete: (payload) => {
        return supertest(url)
            .delete(`/BookStore/v1/Book`)
            .set('Accept', 'application/json')
            .send(payload)
    },

    put: (payload) => {
        return supertest(url)
            .put(`/BookStore/v1/Book?ISBN=${isbn}`)
            .set('Accept', 'application/json')
            .send(payload)
    },

    get: (isbn) => {
        return supertest(url)
            .get(`/BookStore/v1/Book?ISBN=${isbn}`)
            .set('Accept', 'application/json')
            .send()
    },

    randomISBN() {
        return faker.commerce.isbn({ variant : 13, separator:""});
    }
}

export default book