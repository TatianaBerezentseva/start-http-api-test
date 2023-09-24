import supertest from "supertest";
import config from "../config";
const {url} = config;

// Контроллер book

const book = {
    getIsbn: () => {
        return supertest(url)
            .get('/BookStore/v1/Books')
            .set('Accept', 'application/json')
    },

    async getIsbnFromCollection() {
        const res = await this.getIsbn();
        return res.body.books[0].isbn;
    },

    createBook: (isbn, token) => {
        return supertest(url)
            .post('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                userId: `${config.userID}`,
                collectionOfIsbns: [
                    {
                        isbn: `${isbn}`
                    }
                ]})
    },

    changeBook: (isbn, token) => {
        return supertest(url)
            .put(`/BookStore/v1/Books/${isbn}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                userId: config.userID,
                isbn: `${isbn}`
            })
    },

    getBookInfo: (isbn) => {
        return supertest(url)
            .get(`/BookStore/v1/Book?ISBN=${isbn}`)
            .set('Accept', 'application/json')
    },

    deleteBook: (token, isbn) => {
        return supertest(url)
            .delete('/BookStore/v1/Book')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                isbn: `${isbn}`,
                userId: config.userID
            })
    }
}

export default book