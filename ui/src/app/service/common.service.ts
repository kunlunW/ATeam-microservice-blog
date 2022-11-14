import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class CommonService {

	public postAdded_Observable = new Subject();

	constructor(){

	}

	notifyPostAddition(){
    // TODO: fix .next()
		// this.postAdded_Observable.next();
	}

}
