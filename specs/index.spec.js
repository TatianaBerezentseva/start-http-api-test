import fetch from 'node-fetch'
import { expect, test } from '@jest/globals'

const postMethod = 'POST'
const contentTypeHeader = { 'Content-type': 'application/json' }

test('Создание пользователя c ошибкой: логин уже используется', async () => {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
    method: postMethod,
    body: JSON.stringify({ userName: 'Loo_ZU', password: 'Loo_ZU_123!' }),
    headers: contentTypeHeader
  })
  const result = await response.json()
  expect(response.status).toEqual(406)
  expect(result.message).toEqual('User exists!')
})

test('Создание пользователя c ошибкой: пароль не подходит', async () => {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
    method: postMethod,
    body: JSON.stringify({ userName: 'Loo', password: 'loo_zo' }),
    headers: contentTypeHeader
  })
  const result = await response.json()
  expect(response.status).toEqual(400)
  expect(result.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
})

test('Успешное создание пользователя', async () => {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
    method: postMethod,
    body: JSON.stringify({ userName: 'Simply_Redy', password: 'Simply_Redy_123!' }),
    headers: contentTypeHeader
  })
  expect(response.status).toEqual(201)
})

test('Генерация токена с ошибкой (некорректные логин и пароль)', async () => {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
    method: postMethod,
    body: JSON.stringify({ userName: '', password: 12345 }),
    headers: contentTypeHeader
  })
  const result = await response.json()
  expect(response.status).toEqual(400)
  expect(result.message).toEqual('UserName and Password required.')
})

test('Успешная генерация токена для существующего юзера', async () => {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
    method: postMethod,
    body: JSON.stringify({ userName: 'Simply_Red', password: 'Simply_Red_123!' }),
    headers: contentTypeHeader
  })
  const responseBody = await response.json()
  expect(response.status).toEqual(200)
  expect(responseBody.status).toEqual('Success')
  expect(responseBody.result).toEqual('User authorized successfully.')
})
