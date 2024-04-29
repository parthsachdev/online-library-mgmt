import { NextFunction, Request, Response } from "express";
import * as apiUtils from '../apiUtils';
import * as bookSchema from '../schemas/books';
import * as borrowingHistorySchema from '../schemas/borrowing_history';

export async function quantityLessThan(req: Request, res: Response, next: NextFunction) {
	req.action = 'quantityLessThan';
	try {
		const quantity = +req.params.quantity;
		const data = await bookSchema.booksWithQuantityLessThan(quantity);
		return apiUtils.ADV_QUERY.SUCCESS_RESULT(res, data);
	} catch (err) {
		next(err);
	}
}


export async function borrowedBookMoreThan(req: Request, res: Response, next: NextFunction) {
	req.action = 'borrowedBookMoreThan';
	try {
		const noOfTimes = +req.params.noOfTimes;
		const data = await borrowingHistorySchema.borrowedBookMoreThan(noOfTimes);
		return apiUtils.ADV_QUERY.SUCCESS_RESULT(res, data);
	} catch (err) {
		next(err);
	}
}


export async function totalBorrowedBooksPerUser(req: Request, res: Response, next: NextFunction) {
	req.action = 'totalBorrowedBooksPerUser';
	try {
		const data = await borrowingHistorySchema.totalBorrowedBooksPerUser();
		return apiUtils.ADV_QUERY.SUCCESS_RESULT(res, data);
	} catch (err) {
		next(err);
	}
}