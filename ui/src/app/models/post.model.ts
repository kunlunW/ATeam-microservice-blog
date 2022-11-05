import * as myGlobals from 'globals';

export class Post {
	constructor(){
		this.id = '';
		this.title = '';
		this.description = '';
		this.unique_user_id = myGlobals.UNIQUE_USER_ID
	}
	public id;
	public title;
	public description;
	public unique_user_id;
}