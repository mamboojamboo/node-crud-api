import { ServerResponse, IncomingMessage } from 'http';
import { validate } from 'uuid';
import Users from '../models/usersModel';
import getPostData from '../utils';

// @desc	Gets All Users
// @route	GET /api/users
export const getAllUsers = async (req: IncomingMessage, res: ServerResponse) => {
	try {
		const users = await Users.getAll();
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(users));
	} catch (error) {
		console.error(error);
	}
};

// @desc	Gets Current User
// @route	GET /api/users/:id
export const getUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
	try {
		const user = await Users.getById(id);

		if (!validate(id)) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'User id is invalid' }));
		} else if (!user) {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'User does not exist' }));
		} else {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(user));
		}
	} catch (error) {
		console.error(error);
	}
};

// @desc	Create User
// @route	POST /api/users
export const createProduct = async (req: IncomingMessage, res: ServerResponse) => {
	try {
		const body = await getPostData(req);
		const { userName, age, hobbies = [] } = body;
		const user = {
			userName,
			age,
			hobbies
		};

		if (!userName || !age || typeof userName !== 'string' || typeof age !== 'number') {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Body does not contain required fileds or there is type error' }));
		} else {
			const newUser = await Users.create(user);
			res.writeHead(201, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(newUser));
		}
	} catch (error) {
		console.error(error);
	}
};
