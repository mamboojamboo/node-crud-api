import { IncomingMessage } from 'http';
import { TUserCreateBodyReq } from './types/index';

const getPostData = (req: IncomingMessage) => {
	return new Promise<TUserCreateBodyReq>((resolve, reject) => {
		try {
			let body = '';

			req.on('data', (chunk: object) => {
				body += chunk.toString();
			});

			req.on('end', () => {
				resolve(JSON.parse(body));
			});
		} catch (error) {
			reject(error);
		}
	});
};

export default getPostData;
