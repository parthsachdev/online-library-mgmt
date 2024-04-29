import { NextFunction, Request, Response } from "express";
import * as apiUtils from '../apiUtils';
import * as userSchema from '../schemas/users';
import * as utils from '../utils';

export async function login(req: Request, res: Response, next: NextFunction) {
	req.action = 'login';
	try {
		const { email, password }: {email: string, password: string} = req.body;

		if (!email || !password) {
			return apiUtils.USER_RESPONSES.INVALID_CREDENTIALS(res);
		}

		const users = await userSchema.findUserByEmail(email);
		if (users.length !== 1) {
			return apiUtils.USER_RESPONSES.INVALID_CREDENTIALS(res);
		}

		const user = users[0];

		const passhash = user.password ?? '';
		if (!utils.verifyPassword(password, passhash)) {
			return apiUtils.USER_RESPONSES.INVALID_CREDENTIALS(res);
		}

		// Generate JWT token
		const jwt = utils.generateJWT({user_id: `${user._id}`, name: `${user.name}`, email: `${user.email}`, role: `${user.role}`});

		return apiUtils.USER_RESPONSES.LOGIN_OK(res, {token: jwt.token, expiresIn: jwt.expiresIn});
	} catch (err) {
		next(err);
	}

}