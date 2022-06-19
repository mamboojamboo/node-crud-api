import dotenv from 'dotenv';
import server from './server';

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log('process.env.PORT: ', PORT);

type TypeAge = number;

export const age: TypeAge = 99;

export const b = {
	a: 4,
	b: 3
};

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Test comment

console.log(age);

console.log(b);
