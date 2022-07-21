import supertest from 'supertest'

import config from '../config'
const { url } = config

let token = ''

// Контроллер user
const user = {
  /**
   * Функция для авторизации
   * 
   * @param {object} payload - Входные данные для авторизации
   * @param {string} payload.username - Имя пользователя
   * @param {string} payload.password - Пароль пользователя
   * @return {object} - ответ от сервера
   */
  login: (payload) => {
    // Детали реализации.
    // Специальный url + специальный endpoint + установить header Accept + send
    return supertest(url)
      .post('/api/v1/login')
      .set('Accept', 'application/json')
      .send(payload)
  },
  
  // Каждый раз запрос к веб-серверу
  async getAuthToken() {
    const payload = config.credentials

    const res = await this.login(payload) // this = user. Аналогичен await user.login(payload)

    return res.body.token
  },

  // Здесь будет кэш
  async getAuthTokenWithCache() {
    if (token) {
      return token
    }

    token = await this.getAuthToken()

    return token
  },

  user: (token) => {
    return supertest(url)
      .get('/api/v1/user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send()
  }
}

export default user

// JWT - JSON Web Token
// specs
// specs/user/login
// specs/user
