import http, { ServerResponse, IncomingMessage } from 'http';
import { getAllUsers, getUser, createUser, updateUser } from './controllers/usersController';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
	console.log('Server req: ', req.url, req.method);

	if (req.url === '/api/users' && req.method === 'GET') {
		getAllUsers(req, res);
	} else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
		const id = req.url.split('/')[3];
		getUser(req, res, id);
	} else if (req.url === '/api/users' && req.method === 'POST') {
		createUser(req, res);
	} else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT') {
		const id = req.url.split('/')[3];
		updateUser(req, res, id);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Requests to non-existing endpoint' }));
	}
});

export default server;
