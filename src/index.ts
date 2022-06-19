import dotenv from 'dotenv';

dotenv.config();

type TypeAge = number;

export const age: TypeAge = 99;

export const b = {
	a: 4,
	b: 3,
};

// Test comment

console.log(age);

console.log(b);

console.log(process.env.PORT);
