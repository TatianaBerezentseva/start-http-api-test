import supertest from "supertest";
import user from "../../framework/services/user";
import config from "../../framework/config";
import book from "../framework/services/book";
import booksConstants from "../framework/constants";
const { faker } = require("@faker-js/faker");

describe("BOOKS", () => {
  let client;
  let token;
  beforeAll(async () => {
    token = await user.getAuthToken();
    client = supertest(config.url);
  });

  describe("POST", () => {
    test("Успешное добавление одной книги в библиотеку юзера", async () => {
      const res = await book.addBook({
          userId: config.uuid,
          collectionOfIsbns: [
            {
              userId: config.uuid,  
              isbn: booksConstants.firstBook.isbn,
            },
          ],
        });
      expect(res.status).toEqual(201);
      expect(res.body.books).not.toBeNull();
    });

    test("Ошибка при передаче дубля книги", async () => {
      const res = await book.addBook({
        userId: config.uuid,
        collectionOfIsbns: [
          {
            userId: config.uuid,  
            isbn: booksConstants.firstBook.isbn,
          },
        ],
      });
      expect(res.status).toEqual(400);
      expect(res.body).toEqual(booksConstants.bookDuplicateErrorMessage);
    });

    test("Успешно добавляются две книги в библиотеку пользователя", async () => {
      const res = await book.addBook({
          userId: config.uuid,
          collectionOfIsbns: [
            {
              isbn: booksConstants.firstBook.isbn,
            },
            {
              isbn: booksConstants.secondBook.isbn,
            },
          ],
        });
      expect(res.status).toEqual(201);
      expect(res.body.books).not.toBeNull();
  });

  test("Ошибка при передаче неверного объекта/массива в запросе", async () => {
    const res = await book.addBook({
        userId: config.uuid,
        collectionOfIsbns: [
          {
            isbn: booksConstants.firstBook.isbn,
            isbn: booksConstants.secondBook.isbn,
          },
        ],
      });
    expect(res.status).toEqual(400);
  });
});

  describe("PUT", () => {

    test("успешное редактирование книги", async () => {
      const res = await book.putBook({
          userId: `${config.uuid}`,
          isbn: `${booksConstants.secondBook.isbn}`,
        });
      expect(res.status).toEqual(200);
    });

    test("книга не редактируется без авторизации", async () => {
      const res = await book.putBook({
          userId: "string",
          isbn: `${booksConstants.secondBook.isbn}`,
        });
      expect(res.status).toEqual(401);
      expect(response.body).toEqual({code: '1200', message: 'User not authorized!'});
    });
  });

  describe("GET /BookStore/v1/Books", () => {
    test("Успешно возвращается список всех книг", async () => {
      const res = await book.getBooks()
      expect(res.status).toEqual(200);
      expect(res.body.books).not.toBeNull();
    });
  });

  describe("GET /BookStore/v1/Book", () => {
    test.each`
    isbn          | answer
    ${'9781449325862'} | ${200}
    ${'9781449331818'} | ${200}
    ${'9781449337711'} | ${200}
    ${'9781449365035'} | ${200}
    ${'9781491904244'} | ${200}
    ${'9781491950296'} | ${200}
    ${'9781593275846'} | ${200}
    ${'9781593277574'} | ${200}
    ${'test'}          | ${400}
    ${'123'}           | ${400}
    ${'ISBN'}          | ${400}
    `("Успешно возвращается информация по существующей книге", async () => {
      const res = await book.getBook(`${booksConstants.firstBook.isbn}`);
      expect(res.status).toEqual(answer);
    });

    test("Ошибка, при попытке получить информацию по несуществующей книге", async () => {
      const res = await book.getBook(booksConstants.fakeIsbn);
      expect(res.status).toEqual(400);
      expect(res.body).toEqual(booksConstants.bookErrorMessage);
    });
  });
  
  describe("DELETE /BookStore/v1/Book", () => {
    test("Успешное удаление книги", async () => {
      const res = await book.deleteBook({
          isbn: booksConstants.secondBook.isbn,
          userId: config.uuid,
        });
      expect(res.status).toEqual(204);
      expect(res.body).toEqual({});
    });

    test("Нет ошибки при попытке удалить книгу, которой нет в библиотеке юзера", async () => {
      const res = await book.deleteBook({
          isbn: booksConstants.fakeIsbn,
          userId: config.uuid,
        });
      expect(res.status).toEqual(204);
      expect(res.body).toEqual({});
    });
  });
});