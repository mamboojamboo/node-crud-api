import { ServerResponse, IncomingMessage } from 'http';
import { validate } from 'uuid';
import Users from '../models/usersModel';

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
