import { Response } from './Response';
import { Notification} from './Notifications'


export interface HttpResponseFront {   
    successful : boolean,
    response : Response,
    notifications : Notification[]
}

