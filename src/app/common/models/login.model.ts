import { Password }  from './passsword.model';
import { Email }  from './email.model';

export interface RootForm {
    password: Password;
    email: Email;
  }