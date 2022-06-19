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
		if (!validate(id)) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'User id is invalid' }));
		} else {
			const user = await Users.getById(id);

			if (!user) {
				res.writeHead(404, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: 'User does not exist' }));
			} else {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(user));
			}
		}
	} catch (error) {
		console.error(error);
	}
};

// @desc	Create User
// @route	POST /api/users
export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
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

// @desc	Update User
// @route	PUT /api/users/:id
export const updateUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
	try {
		if (!validate(id)) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'User id is invalid' }));
		} else {
			const user = await Users.getById(id);

			if (!user) {
				res.writeHead(404, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: 'User does not exist' }));
			} else {
				const body = await getPostData(req);
				const { userName, age, hobbies = [] } = body;
				const userData = {
					userName: userName || user.userName,
					age: age || user.age,
					hobbies: hobbies || user.hobbies
				};

				if (!userName || !age || typeof userName !== 'string' || typeof age !== 'number') {
					res.writeHead(400, { 'Content-Type': 'application/json' });
					res.end(
						JSON.stringify({ message: 'Body does not contain required fileds or there is type error' })
					);
				} else {
					const updUser = await Users.update(id, userData);
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify(updUser));
				}
			}
		}
	} catch (error) {
		console.error(error);
	}
};

// @desc	Delete Current User
// @route	DELETE /api/users/:id
export const deleteUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
	try {
		if (!validate(id)) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'User id is invalid' }));
		} else {
			const user = await Users.getById(id);

			if (!user) {
				res.writeHead(404, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: 'User does not exist' }));
			} else {
				await Users.remove(id);
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: `User ${id} removed` }));
			}
		}
	} catch (error) {
		console.error(error);
	}
};
