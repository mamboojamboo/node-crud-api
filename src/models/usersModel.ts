import { v4 as uuidv4 } from 'uuid';
import usersMock from '../data/mockData';
import { TUserCreateBodyReq, TUser } from '../types/index';

const getAll = () => {
	return new Promise(resolve => {
		resolve(usersMock);
	});
};

const getById = (id: string) => {
	return new Promise<TUser | undefined>(resolve => {
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

const update = (id: string, user: TUserCreateBodyReq) => {
	return new Promise(resolve => {
		const index = usersMock.findIndex(u => u.id === id);
		usersMock[index] = { id, ...user };
		resolve(usersMock[index]);
	});
};

const remove = (id: string) => {
	return new Promise<void>(resolve => {
		const index = usersMock.findIndex(u => u.id === id);
		usersMock.splice(index, 1);
		resolve();
	});
};

export default { getAll, getById, create, update, remove };
