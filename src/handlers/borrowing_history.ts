import { NextFunction, Request, Response } from "express";
import * as borrowingHistorySchema from '../schemas/borrowing_history';
import * as apiUtils from '../apiUtils';
import * as bookSchema from '../schemas/books';

export async function getBorrowingHistroyEntries(req: Request, res: Response, next: NextFunction) {
	req.action = 'getBorrowingHistroyEntries';
	try {
		const response = await borrowingHistorySchema.getBorrowingHistroyEntries();
		return apiUtils.BORROWING_HISTORY.ALL_HISTORY_SUCCESS(res, response);
	} catch (err) {
		next(err);
	}
}

export async function getBorrowingHistoryById(req: Request, res: Response, next: NextFunction) {
	req.action = 'getBorrowingHistoryById';
	try {
		const id = req.params.id;
		const response = await borrowingHistorySchema.getBorrowingHistroyEntriesById(id);
		if (!response) {
			return apiUtils.BORROWING_HISTORY.HISTORY_NOT_FOUND(res);
		}
		return apiUtils.BORROWING_HISTORY.HISTORY_BY_ID_SUCCESS(res, response);
	} catch (err) {
		next(err);
	}
}

export async function borrowBook(req: Request, res: Response, next: NextFunction) {
	req.action = 'borrowBook';
	try {
		const userId = req.body.userId;
		const bookId = req.body.bookId;
		const borrowingHistoryEntry = await borrowingHistorySchema.getBorrowingHistroyEntriesByUserIdBookId(userId, bookId);
		if (borrowingHistoryEntry?.status === 'BORROWED') {
			return apiUtils.BORROWING_HISTORY.BOOK_ALREADY_BORROWED(res);
		}
		const book = await bookSchema.getBookById(bookId);
		const currQuantity = +(book?.quantity || 0);
		if (currQuantity <= 0) {
			return apiUtils.BORROWING_HISTORY.INVENTORY_SHORT(res);
		}
		await bookSchema.decreaseBookQuantity(bookId);
		await borrowingHistorySchema.addEntryToBorrowingHistory(bookId, userId);
		return apiUtils.BORROWING_HISTORY.BORROW_BOOK_SUCCESS(res);
	} catch (err) {
		next(err);
	}
}

export async function returnBook(req: Request, res: Response, next: NextFunction) {
	req.action = 'returnBook';
	try {
		const borrowingHistoryId = req.params.id;
		const existingHistory = await borrowingHistorySchema.getBorrowingHistroyEntriesById(borrowingHistoryId);
		if (existingHistory?.status !== 'BORROWED') {
			return apiUtils.BORROWING_HISTORY.BOOK_NOT_ISSUED(res);
		}
		await borrowingHistorySchema.updateBorrowingHistoryStatusById(borrowingHistoryId);
		await bookSchema.addBookToInventory(`${existingHistory.bookId}`);
		return apiUtils.BORROWING_HISTORY.BOOK_RETURN_SUCCESS(res);
	} catch (err) {
		next(err);
	}
}