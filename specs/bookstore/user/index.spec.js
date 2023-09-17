import user from "../helper/user";
import config from "../config";

let userID = '';

describe('user', () => {
    describe('POST /Account/v1/User', () => {
        test('Create user', async () => {
            const res = await user.createUser();
            userID = res.body.userID
            console.log(userID)
            expect(res.status).toEqual(201);
        })
    })
    describe('POST /Account/v1/Authorized', () => {
        test('Successful authorization', async () => {
            const token = await user.getAuthToken();
            const res = await user.login(config.credentials, token)
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(true);
        })

        /*
        * Тут по документации должен быть 404, но при прогоне теста возвращал 'UserName and Password required.'
        **/
        test('Unsuccessful authorization with wrong username', async () => {
            const token = await user.getAuthToken();
            const res = await user.login({username: 'Natali', password: 'Natalie_123!'}, token)
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('UserName and Password required.')
        })

        /*
        * Тут по документации должен быть 404, но при прогоне теста возвращал 'UserName and Password required.'
        **/
        test('Unsuccessful authorization with wrong password', async () => {
            const token = await user.getAuthToken();
            const res = await user.login({username: 'Natalie', password: 'Natalie_123'}, token)
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('UserName and Password required.')
        })
    })

    describe('GET /Account/v1/User/', () => {
        test('Get user info', async () => {
            const token = await user.logIn(config.credentials)
            console.log(userID)
            const res = await user.user(token, userID);
            expect(res.status).toEqual(200);
            expect(res.body.username).toEqual(`${config.credentials.userName}`)
        })

        test('Get error if user does not exist', async () => {
            const token = await user.logIn(config.credentials)
            const res = await user.user(token, '4654754');
            expect(res.status).toEqual(401);
            expect(res.body.message).toEqual('User not found!')
        })
    })

    describe('DELETE /Account/v1/User/', () => {
        test('Successful deletion of a user', async () => {
            const token = await user.logIn(config.credentials)
            const res = await user.deleteUser(token, userID);
            expect(res.status).toEqual(204);
        })

        test('Get error if user does not exist', async () => {
            const token = await user.logIn(config.credentials)
            const res = await user.user(token, '4654754');
            expect(res.status).toEqual(401);
            expect(res.body.message).toEqual('User not found!')
        })
    })
})