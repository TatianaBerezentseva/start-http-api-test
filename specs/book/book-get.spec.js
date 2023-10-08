import supertest from "supertest";
import config from "../../framework/config/config";
import book from "../../framework/services/book";

describe('Book', () => {
    describe('GET /BookStore/v1/Book', () => {
        test('Метод должен существовать', async () => {
            const res = await supertest(config.url)
                .get(`/BookStore/v1/Book?ISBN=${config.isbn_1}`)
                .send({})

            expect(res.status).not.toEqual(404);
        })

        test(`Вернуть информацию о книге с isbn = ${config.isbn_1}`, async () => {
            const res = await supertest(config.url)
                .get(`/BookStore/v1/Book?ISBN=${config.isbn_1}`)
                .send()

            expect(res.status).toEqual(200);
            expect(res.body.isbn).toEqual(config.isbn_1)
            expect(res.body.publisher).toEqual('O\'Reilly Media')
        })
    })
})
