import supertest from "supertest";
import config from "../../framework/config/config";
import user from "../../framework/services/user";

describe('User', () => {
    describe('DELETE /Account/v1/User/{UUID}', () => {
        test('Метод должен существовать', async () => {
            const res = await supertest(config.url)
                .delete('/Account/v1/User/')
                .send({})

            expect(res.status).not.toEqual(404);
        })

        test('Удаление неавторизованного пользователя по uuid', async () => {
            const createRes = await user.create({ "userName" : user.randomUserName(), "password": `${config.defaultPassword}` })

            const deleteRes = await user.delete(createRes.body.userID)

            expect(deleteRes.status).toEqual(401);
            expect(deleteRes.body.code).toEqual('1200')
            expect(deleteRes.body.message).toEqual('User not authorized!')
        })
    })
})