import { Response } from "express";

class BaseResponse {
	message: string;
	data?: Object | null;
	constructor(message: string, data?: Object | null) {
		this.message = message;
		this.data = data ?? null;
	}
}

export const USER_RESPONSES = {
	INVALID_CREDENTIALS: (res: Response, data?: Object) => {
		return res.status(404).json(new BaseResponse('Invalid Credentials', data))
	},
	LOGIN_OK: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('Login ok!', data));
	},
	USER_CREATED: (res: Response, data?: Object) => {
		return res.status(201).json(new BaseResponse('User Created Successfully!', data));
	},
	ALL_USERS_SUCCESS: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('Fetched all users successfully', data));
	},
	USER_NOT_FOUND: (res: Response, data?: Object) => {
		return res.status(404).json(new BaseResponse('User not found', data));
	},
	USER_BY_ID_SUCCESS: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('User fetched successfully', data));
	},
	USER_UPDATE_SUCCESS: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('User details updated successfully', data));
	},
	USER_DELETE_SUCCESS: (res: Response, data?: Object) => {
		return res.status(204).json(new BaseResponse('Deleted user successfully', data));
	}

}

export const BOOK_RESPONSES = {
	ALL_BOOKS_SUCCESS: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('Fetched all books successfully', data));
	},
	CREATE_BOOK_SUCCESS: (res: Response, data?: Object) => {
		return res.status(201).json(new BaseResponse('book created successfully', data));
	},
	GET_BOOK_BY_ID_SUCCESS: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('Book fetched successfully', data));
	},
	BOOK_NOT_FOUND: (res: Response, data?: Object) => {
		return res.status(404).json(new BaseResponse('Book Not found', null));
	},
	UPDATE_BOOK_SUCCESS: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('Book updated successfully', null));
	},
	BOOK_DELETE_SUCCESS: (res: Response, data?: Object) => {
		return res.status(204).json(new BaseResponse('Book deleted successfully', null));
	}
}

export const BORROWING_HISTORY = {
	ALL_HISTORY_SUCCESS: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('Successfully fetched all borrowing history', data));
	},
	HISTORY_NOT_FOUND: (res: Response, data?: Object) => {
		return res.status(404).json(new BaseResponse('Borrowing History not found'));
	},
	HISTORY_BY_ID_SUCCESS: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('Successfully fetched borrowing history entry'));
	},
	INVENTORY_SHORT: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('Not enough inventory for the requested book'));
	},
	BOOK_ALREADY_BORROWED: (res: Response, data?: Object) => {
		return res.status(400).json(new BaseResponse('Book already with the user'));
	},
	BORROW_BOOK_SUCCESS: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('Book successfully borrowed'));
	},
	BOOK_NOT_ISSUED: (res: Response, data?: Object) => {
		return res.status(400).json(new BaseResponse('Book not issued'));
	},
	BOOK_RETURN_SUCCESS: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('Book returned successfully'));
	}
};

export const ADV_QUERY = {
	SUCCESS_RESULT: (res: Response, data?: Object) => {
		return res.status(200).json(new BaseResponse('Success', data));
	}
}