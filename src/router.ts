import {Router} from 'express';
import * as utils from './utils';
import * as authHandler from './handlers/auth';
import * as userHandler from './handlers/users';
import * as booksHandler from './handlers/books';
import * as borrowingHistory from './handlers/borrowing_history';
import * as advQuery from './handlers/advQuery';

export const router: Router = Router();

router.post('/login', authHandler.login);

router.get('/books', utils.decodeJWTFromHeader, booksHandler.getBooks);
router.get('/books/:id', utils.decodeJWTFromHeader, booksHandler.getBookById);
router.post('/books', utils.decodeJWTFromHeader, booksHandler.createBook);
router.put('/books/:id', utils.decodeJWTFromHeader, booksHandler.updateBookById);
router.delete('/books/:id', utils.decodeJWTFromHeader, booksHandler.deleteBookById);

router.get('/users', utils.decodeJWTFromHeader, userHandler.getUsers);
router.get('/users/:id', utils.decodeJWTFromHeader, userHandler.getUserById);
router.post('/users', userHandler.createUser);
router.put('/users/:id', utils.decodeJWTFromHeader, userHandler.updateUserById);
router.delete('/users/:id', utils.decodeJWTFromHeader, userHandler.deleteUserById);

router.get('/borrow-history', utils.decodeJWTFromHeader, borrowingHistory.getBorrowingHistroyEntries);
router.get('/borrow-history/:id', utils.decodeJWTFromHeader, borrowingHistory.getBorrowingHistoryById);
router.post('/borrow-history', utils.decodeJWTFromHeader, borrowingHistory.borrowBook);
router.put('/borrow-history/:id/return', utils.decodeJWTFromHeader, borrowingHistory.returnBook);

router.get('/advQuery/quantityLessThan/:quantity', advQuery.quantityLessThan);
router.get('/advQuery/borrowedBookMoreThan/:noOfTimes', advQuery.borrowedBookMoreThan);
router.get('/advQuery/totalBorrowedBooksPerUser', advQuery.totalBorrowedBooksPerUser);

