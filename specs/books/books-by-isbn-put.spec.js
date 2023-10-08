import supertest from "supertest";
import config from "../../framework/config/config";
import books from "../../framework/services/books";

describe('Books', () => {
    describe('DELETE /BookStore/v1/Books', () => {
        test('Метод должен существовать', async () => {
            const res = await supertest(config.url)
                .put(`/BookStore/v1/Books/${config.isbn}`)
                .send({})

            expect(res.status).not.toEqual(404);
        })
    })
})