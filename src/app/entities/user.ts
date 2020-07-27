export class User
{
	id: number;
	username: string;
	password: string;
	logged: boolean;

	constructor()
	{
		this.logged = false;
	}
}
