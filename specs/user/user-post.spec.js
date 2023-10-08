import supertest from "supertest";
import config from "../../framework/config/config";
import user from "../../framework/services/user";

describe('User', () => {
  describe('POST /Account/v1/User', () => {
    test('Метод должен существовать', async () => {
      const res = await supertest(config.url)
          .post('/Account/v1/User')
          .send({})

      expect(res.status).not.toEqual(404);
    })

    test('Создание нового пользователя парой userName и password', async () => {
      const res = await user.create({ "userName" : user.randomUserName(), "password": `${config.defaultPassword}` })

      expect(res.status).toEqual(201);
      expect(typeof res.body.userID).toEqual('string')
      expect(typeof res.body.username).toEqual('string')
    })

    test('Создание пользователя с уже созданной парой с userName и password', async () => {
      const payload = { "userName" : user.randomUserName(), "password": `${config.defaultPassword}` }

      // шаг с созданием дубликата-юзера до
      await user.create(payload)

      const res = await user.create(payload)

      expect(res.status).toEqual(406);
      expect(res.body.code).toEqual('1204')
      expect(res.body.message).toEqual('User exists!')
    })
  })
})