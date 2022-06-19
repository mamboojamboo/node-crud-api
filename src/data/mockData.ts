type TUser = {
	id: string;
	userName: string;
	age: number;
	hobbies: string[] | [];
};

const usersMock: TUser[] = [
	{
		id: '123e4567-e89b-12d3-a456-426614174000',
		userName: 'Alex',
		age: 28,
		hobbies: []
	}
];

export default usersMock;
