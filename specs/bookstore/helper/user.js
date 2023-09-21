import supertest from "supertest";
import config from "../config";
const {url} = config;

let token = '';

// Контроллер user

const user = {
    createUser: () => {
        return supertest(url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send(config.credentials)
    },

    login: (payload, token) => {
        return supertest(url)
            .post('/Account/v1/Authorized')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
    },

    authToken: (payload) => {
        return supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .send(payload)
    },

    async getAuthToken() {
        const payload = config.credentials
        const res = await this.authToken(payload)
        return res.body.token
    },

    async logIn(payload) {
        token = await this.getAuthToken();
        await this.login(payload, token)
        return token
    },

    user: (token, userId) => {
        return supertest(url)
            .get(`/Account/v1/User/${userId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
    },

    deleteUser: (token, userId) => {
        return supertest(url)
            .delete(`/Account/v1/User/${userId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
    }
}

export default user