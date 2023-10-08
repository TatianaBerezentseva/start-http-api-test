import supertest from "supertest";

import config from "../config/config";
const { faker } = require('@faker-js/faker');
const { url } = config

// контроллер user
const user = {
    // Функция авторизации
    create: (payload) => {
        return supertest(url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send(payload)
    },

    delete: (uuid) => {
        return supertest(url)
            .delete(`/Account/v1/User/${uuid}`)
            .set('Accept', 'application/json')
            .send()
    },

    get: (uuid) => {
        return supertest(url)
            .get(`/Account/v1/User/${uuid}`)
            .set('Accept', 'application/json')
            .send()
    },

    randomUserName() {
        return `${faker.person.lastName()}-${faker.person.firstName()}`;
    }
}

export default user