import usersMock from '../data/mockData';

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

export default { getAll, getById };
