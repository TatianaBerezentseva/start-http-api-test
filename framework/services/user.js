import supertest from "supertest";

import config from "../config";
const { url } = config;

const user = {
  
  userRegistration: (payload=config.credentials) => {
    return supertest(url)
      .post("/Account/v1/User")
      .set("Accept", "application/json")
      .send(payload);
  },

  autorizationCheck: (payload=config.credentials) => {
    return supertest(url)
    .post("/Account/v1/Authorized")
    .set("Accept", "application/json")
    .send(payload);
  },

  generateToken: (payload=config.credentials) => {
    return supertest(url)
    .post("/Account/v1/GenerateToken")
    .set("Accept", "application/json")
    .send(payload);
  },

  deleteUser: (userId, token) => {
    return supertest(url)
      .delete(`/Account/v1/User/${userId}`)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${token}`)
      .send();
  },

  getUserInfo: (userId, token) => {
    return supertest(url)
    .get(`/Account/v1/User/${userId}`)
    .set("Accept", "application/json")
    .set("authorization", `Bearer ${token}`)
    .send();
  },

  async getAuthToken() {
    const response = await this.generateToken()
    const token = response.body.token 
    return token
  }
};

export default user;
