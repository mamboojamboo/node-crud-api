import http, { ServerResponse, IncomingMessage } from 'http';
import { getAllUsers, getUser } from './controllers/usersController';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
	console.log('Server req: ', req.url, req.method);

	if (req.url === '/api/users' && req.method === 'GET') {
		getAllUsers(req, res);
	} else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
		const id = req.url.split('/')[3];
		getUser(req, res, id);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route Not Found' }));
	}
});

export default server;
