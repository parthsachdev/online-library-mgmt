import {Router} from 'express';
import * as utils from './utils';
import * as authHandler from './handlers/auth';
import * as userHandler from './handlers/users';
import * as booksHandler from './handlers/books';
import * as borrowingHistory from './handlers/borrowing_history';
import * as advQuery from './handlers/advQuery';

export const router: Router = Router();

router.post('/login', authHandler.login);

router.get('/books', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['LIBRARIAN', 'MEMBER']), booksHandler.getBooks);
router.get('/books/:id', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['LIBRARIAN', 'MEMBER']), booksHandler.getBookById);
router.post('/books', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['LIBRARIAN']), booksHandler.createBook);
router.put('/books/:id', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['LIBRARIAN']), booksHandler.updateBookById);
router.delete('/books/:id', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['LIBRARIAN']), booksHandler.deleteBookById);

router.get('/users', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['LIBRARIAN']), userHandler.getUsers);
router.get('/users/:id', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['LIBRARIAN']), userHandler.getUserById);
router.post('/users', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['LIBRARIAN']), userHandler.createUser);
router.put('/users/:id', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['LIBRARIAN']), userHandler.updateUserById);
router.delete('/users/:id', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['LIBRARIAN']), userHandler.deleteUserById);

router.get('/borrow-history', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['LIBRARIAN']), borrowingHistory.getBorrowingHistroyEntries);
router.get('/borrow-history/:id', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['LIBRARIAN']), borrowingHistory.getBorrowingHistoryById);
router.post('/borrow-history', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['MEMBER']), borrowingHistory.borrowBook);
router.put('/borrow-history/:id/return', utils.decodeJWTFromHeader, utils.allowedRolesHandler(['MEMBER']), borrowingHistory.returnBook);

router.get('/advQuery/quantityLessThan/:quantity', advQuery.quantityLessThan);
router.get('/advQuery/borrowedBookMoreThan/:noOfTimes', advQuery.borrowedBookMoreThan);
router.get('/advQuery/totalBorrowedBooksPerUser', advQuery.totalBorrowedBooksPerUser);

