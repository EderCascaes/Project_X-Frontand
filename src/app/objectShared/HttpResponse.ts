import { Response } from './Response';
import { Notification} from './Notifications'


export interface HttpResponse {   
    successful : boolean,
    response : Response,
    notifications : Notification[]
}

