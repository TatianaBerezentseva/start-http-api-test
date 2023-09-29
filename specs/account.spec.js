import supertest from "supertest";
import user from "../../framework/services/user";
import config from "../../framework/config";
const { faker } = require("@faker-js/faker");

describe("Account", () => {
  let client;
  let token;

  beforeAll(async () => {
    token = await user.getAuthToken();
    client = supertest(config.url);
  });

  describe("GET /Account/v1/User/{uuid}", () => {
    test("Успешный запрос информации о пользователе", async () => {
      const res = await client
        .get(`/Account/v1/User/${config.uuid}`)
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send();
      expect(res.status).toEqual(200);
    });
  });

  describe("POST /Account/v1/Authorized", () => {
    test("Авторизация должна проходить успешно с правильным логином и паролем", async () => {
      const res = await client
        .post("/Account/v1/Authorized")
        .set("Content-Type", "application/json")
        .send(config.credentials);
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(true);
    });

    test("Авторизация должна возвращать статус с кодом ошибки если логин неверный", async () => {
      const res = await client
        .post("/Account/v1/Authorized")
        .set("Content-Type", "application/json")
        .send({
          userName: "tinkoty",
          password: `${config.credentials.password}`,
        });
      expect(res.status).toEqual(404);
    });

    test("Авторизация должна возвращать статус с кодом ошибки если пароль неверный", async () => {
      const res = await client
        .post("/Account/v1/Authorized")
        .set("Content-Type", "application/json")
        .send({
          userName: `${config.credentials.userName}`,
          password: "Tinkotya19071997",
        });
      expect(res.status).toEqual(404);
    });
  });

  describe("POST /Account/v1/GenerateToken", () => {
    test("Возвращает ошибку если передали неверные лог/пасс", async () => {
      const res = await client
        .post(`/Account/v1/GenerateToken`)
        .set("Content-Type", "application/json")
        .send({
          userName: "userName",
          password: "password",
        });
      expect(res.status).toEqual(200);
      expect(res.body.token).toEqual(null);
      expect(res.body.result).toEqual("User authorization failed.");
    });

    test("Генерация токена успешно", async () => {
      const res = await client
        .post(`/Account/v1/GenerateToken`)
        .set("Content-Type", "application/json")
        .send(config.credentials);
      expect(res.status).toEqual(200);
    });
  });

  describe("POST /Account/v1/User", () => {
    const randomName = faker.lorem.word();
    const randomPassword = `1@Q+${faker.lorem.word()}`;

    test("Успешное создание юзера", async () => {
      const res = await client
        .post("/Account/v1/User/")
        .set("Content-Type", "application/json")
        .send({
          userName: randomName,
          password: randomPassword,
        });
      expect(res.status).toEqual(201);
      expect(res.body.userId).not.toBeNull();
    });

    test("Нельзя создать дубликат юзера", async () => {
      const res = await client
        .post("/Account/v1/User/")
        .set("Content-Type", "application/json")
        .send({
          userName: randomName,
          password: randomPassword,
        });
      expect(res.status).toEqual(406);
      expect(res.body.message).toEqual("User exists!");
    });
  });

  describe("DELETE /Account/v1/User", () => {
    test("ошибка в ответ на ввод спецсимволов", async () => {
      const res = await client
        .delete(`/Account/v1/User/{?}`)
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send();
      expect(res.status).toEqual(200);
    });

    test("Нельзя удалить пользователя без авторизации", async () => {
      const res = await client
        .delete(`/Account/V1/User/${config.uuid}`)
        .set("Content-Type", "application/json")
        .send();
      expect(res.status).toEqual(401);
    });
  });
 })