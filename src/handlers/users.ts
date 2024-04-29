import { NextFunction, Request, Response } from "express";
import * as apiUtils from '../apiUtils';
import * as userSchema from '../schemas/users';
import * as utils from '../utils';

export async function getUsers(req: Request, res: Response, next: NextFunction) {
	req.action = 'getUsers';
	try {

		const response = await userSchema.getAllUsers();

		return apiUtils.USER_RESPONSES.ALL_USERS_SUCCESS(res, response);

	} catch (err) {
		next(err);
	}
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
	req.action = 'getUserById';
	try {
		const id = req.params.id;
		const response = await userSchema.findUserById(id);
		if (!response) {
			return apiUtils.USER_RESPONSES.USER_NOT_FOUND(res);
		}
		return apiUtils.USER_RESPONSES.USER_BY_ID_SUCCESS(res, response);
	} catch (err) {
		next(err);
	}
}


export async function createUser(req: Request, res: Response, next: NextFunction) {
	req.action = 'createUser';
	try {
		const {name, email, password, role} = req.body;

		const response = await userSchema.createUser(name, email, utils.hashPassword(password), role);

		return apiUtils.USER_RESPONSES.USER_CREATED(res, {id: response._id, name: response.name, email: response.email, role: response.role});

	} catch (err) {
		next(err);
	}

}


export async function updateUserById(req: Request, res: Response, next: NextFunction) {
	req.action = 'updateUserById';
	try {
		const {name, email} = req.body;
		const id = req.params.id;
		const response = await userSchema.updateUserById(id, {name, email});
		if (!response) {
			return apiUtils.USER_RESPONSES.USER_NOT_FOUND(res);
		}
		return apiUtils.USER_RESPONSES.USER_UPDATE_SUCCESS(res);

	} catch (err) {
		next(err);
	}
}

export async function deleteUserById(req: Request, res: Response, next: NextFunction) {
	req.action = 'deleteUserById';
	try {
		const id = req.params.id;
		const response = await userSchema.deleteUserById(id);
		if (!response) {
			return apiUtils.USER_RESPONSES.USER_NOT_FOUND(res);
		}

		return apiUtils.USER_RESPONSES.USER_DELETE_SUCCESS(res);

	} catch (err) {
		next(err);
	}
}