import { v4 as uuidv4 } from 'uuid';
import usersMock from '../data/mockData';
import { TUserCreateBodyReq } from '../types/index';

const getAll = () => {
	return new Promise(resolve => {
		resolve(usersMock);
	});
};

const getById = (id: string) => {
	return new Promise(resolve => {
		const user = usersMock.find(u => u.id === id);
		resolve(user);
	});
};

const create = (user: TUserCreateBodyReq) => {
	return new Promise(resolve => {
		const newUser = { id: uuidv4(), ...user };
		usersMock.push(newUser);
		resolve(newUser);
	});
};

export default { getAll, getById, create };
