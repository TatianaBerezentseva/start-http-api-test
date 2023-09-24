import user from "../helper/user";
import book from "../helper/book";
import config from "../config";
import { expect, test, describe } from '@jest/globals'

let isbn = '';
const incorrectIsbn = '9781449331819';
const unavailableIsbn = '9781491904244';

describe('Book', () => {
    describe('POST /BookStore/v1/Books', () => {
        test('Create book', async () => {
            const token = await user.getAuthToken();
            await user.login(config.credentials, token)
            isbn = await book.getIsbnFromCollection()
            const res = await book.createBook(isbn, token)
            expect(res.status).toEqual(201);
            expect(res.body.books[0].isbn).toBeTruthy();
        })

        test('Not authorized error', async () => {
            const res = await book.createBook(isbn, 'token')
            expect(res.status).toEqual(401);
            expect(res.body.code).toEqual('1200');
            expect(res.body.message).toEqual('User not authorized!');
        })

        test('ISBN not found', async () => {
            const token = await user.getAuthToken();
            await user.login(config.credentials, token)
            const res = await book.createBook(incorrectIsbn, token)
            expect(res.status).toEqual(400);
            expect(res.body.code).toEqual('1205');
            expect(res.body.message).toEqual('ISBN supplied is not available in Books Collection!');
        })
    })

    describe('PUT /BookStore/v1/Books/', () => {
        test('Change book', async () => {
            const token = await user.getAuthToken();
            await user.login(config.credentials, token)
            const res = await book.changeBook(isbn, token)
            expect(res.status).toEqual(200);
            expect(res.body.books.isbn).toEqual(isbn);
        })

        test('ISBN not found', async () => {
            const token = await user.getAuthToken();
            await user.login(config.credentials, token)
            const res = await book.changeBook(unavailableIsbn, token)
            expect(res.status).toEqual(400);
            expect(res.body.code).toEqual('1206');
            expect(res.body.message).toEqual(`ISBN supplied is not available in User's Collection!`);
        })

        test('Not authorized error', async () => {
            const res = await book.changeBook(isbn, 'token')
            expect(res.status).toEqual(401);
            expect(res.body.code).toEqual('1200');
            expect(res.body.message).toEqual('User not authorized!');
        })
    })

    describe('GET /BookStore/v1/Book?ISBN=', () => {
        test('Get book info', async () => {
            const res = await book.getBookInfo(isbn);
            expect(res.status).toEqual(200);
            expect(res.body.isbn).toEqual(isbn)
        })

        test('ISBN not found', async () => {
            const res = await book.getBookInfo(incorrectIsbn);
            expect(res.status).toEqual(400);
            expect(res.body.code).toEqual('1205');
            expect(res.body.message).toEqual('ISBN supplied is not available in Books Collection!')
        })
    })

    describe('DELETE /BookStore/v1/Book', () => {
        test('Successful deletion of a book', async () => {
            const token = await user.getAuthToken();
            await user.login(config.credentials, token)
            const res = await book.deleteBook(token, isbn);
            expect(res.status).toEqual(204);
        })

        test('Not authorized error', async () => {
            const res = await book.deleteBook('token', isbn);
            expect(res.status).toEqual(401);
            expect(res.body.code).toEqual('1200');
            expect(res.body.message).toEqual('User not authorized!')
        })

        test('Book not found', async () => {
            const token = await user.getAuthToken();
            await user.login(config.credentials, token)
            const res = await book.deleteBook(token, isbn);
            expect(res.status).toEqual(400);
            expect(res.body.code).toEqual('1206');
            expect(res.body.message).toEqual(`ISBN supplied is not available in User's Collection!`)
        })
    })
})