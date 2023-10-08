import supertest from "supertest";
import config from "../../framework/config/config";
import user from "../../framework/services/user";

describe('User', () => {
    describe('GET /Account/v1/User/{UUID}', () => {
        test('Метод должен существовать', async () => {
            const res = await supertest(config.url)
                .get('/Account/v1/User/')
                .send({})

            expect(res.status).not.toEqual(404);
        })

        test('Получение неавторизованного пользователя по uuid', async () => {
            const createRes = await user.create({ "userName" : user.randomUserName(), "password": `${config.defaultPassword}` })

            const getRes = await user.get(createRes.body.userID)

            expect(getRes.status).toEqual(401);
            expect(getRes.body.code).toEqual('1200')
            expect(getRes.body.message).toEqual('User not authorized!')
        })
    })
})