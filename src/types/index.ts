export type TUser = {
	id: string;
	userName: string;
	age: number;
	hobbies: string[] | [];
};

export type TUserCreateBodyReq = {
	userName: string;
	age: number;
	hobbies: string[] | [];
};
