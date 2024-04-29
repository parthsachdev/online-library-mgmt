import { NextFunction, Request, Response } from "express";
import * as apiUtils from '../apiUtils';
import * as bookSchema from '../schemas/books';
import * as utils from '../utils';

export async function getBooks(req: Request, res: Response, next: NextFunction) {
	req.action = 'getBooks';
	try {
		const response = await bookSchema.getAllBooks();
		return apiUtils.BOOK_RESPONSES.ALL_BOOKS_SUCCESS(res, response);
	} catch (err) {
		next(err);
	}
}

export async function getBookById(req: Request, res: Response, next: NextFunction) {
	req.action = 'getBookById';
	try {

		const id = req.params.id;
		const response = await bookSchema.getBookById(id);
		if (!response) {
			return apiUtils.BOOK_RESPONSES.BOOK_NOT_FOUND(res);
		}
		return apiUtils.BOOK_RESPONSES.GET_BOOK_BY_ID_SUCCESS(res, response);
	} catch (err) {
		next(err);
	}
}

export async function createBook(req: Request, res: Response, next: NextFunction) {
	req.action = 'createBook';
	try {
		const {title, author, genre, publishedYear, ISBN, quantity} = req.body;
		const response = await bookSchema.createBook(title, author, genre, publishedYear, ISBN, quantity);
		return apiUtils.BOOK_RESPONSES.CREATE_BOOK_SUCCESS(res, response);
	} catch (err) {
		next(err);
	}
}

export async function updateBookById(req: Request, res: Response, next: NextFunction) {
	req.action = 'updateBookById';
	try {
		const id = req.params.id;
		const {title, author, genre, publishedYear, ISBN, quantity} = req.body;
		const response = await bookSchema.updateBookById(id, {title, author, genre, publishedYear, ISBN, quantity});
		if (!response) {
			return apiUtils.BOOK_RESPONSES.BOOK_NOT_FOUND(res);
		}
		return apiUtils.BOOK_RESPONSES.UPDATE_BOOK_SUCCESS(res);

	} catch (err) {
		next(err);
	}
}

export async function deleteBookById(req: Request, res: Response, next: NextFunction) {
	req.action = 'deleteBookById';
	try {
		const id = req.params.id;
		const response = await bookSchema.deleteBookById(id);
		if (!response) {
			return apiUtils.BOOK_RESPONSES.BOOK_NOT_FOUND(res);
		}
		return apiUtils.BOOK_RESPONSES.BOOK_DELETE_SUCCESS(res);
	} catch (err) {
		next(err);
	}
}