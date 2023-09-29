import supertest from "supertest";

import config from "../config";
const { url } = config;

const user = {
  login: (payload) => {
    return supertest(url)
      .post("/Account/v1/GenerateToken")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send(payload);
  },

  async getAuthToken() {
    const payload = config.credentials;
    const res = await this.login(payload);
    return res.body.token;
  },

  async deleteUser(userId) {
    return supertest(url)
      .delete(`/Account/v1/User/${userId}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send();
  },

  async getUserInfo(userId) {
    return supertest(url)
    .get(`/Account/v1/User/${userId}`)
    .set("Accept", "application/json")
    .set("Content-Type", "application/json")
    .send();
  }
};

export default user;
