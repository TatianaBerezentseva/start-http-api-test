import supertest from "supertest";

import config from "../config/config";
const { faker } = require('@faker-js/faker');
const { url } = config

// контроллер user
const books = {
    // Функция авторизации
    updateByISBN: (isbn, payload) => {
        return supertest(url)
            .put(`/BookStore/v1/Books/${isbn}`)
            .set('Accept', 'application/json')
            .send(payload)
    },

    createByISBN: (payload) => {
        return supertest(url)
            .post('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .send(payload)
    }
}

export default books