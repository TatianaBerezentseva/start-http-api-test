import supertest from "supertest";
import config from "../../framework/config/config";

describe('Book', () => {
    describe('POST /BookStore/v1/Book', () => {
        test('Метод должен существовать', async () => {
            const res = await supertest(config.url)
                .post('/BookStore/v1/Book')
                .send({})

            expect(res.status).not.toEqual(404);
        })
    })
})
