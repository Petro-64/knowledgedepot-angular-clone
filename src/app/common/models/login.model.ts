import { Password }  from './passsword.model';
import { Email }  from './email.model';

export interface Login {
    password: Password;
    email: Email;
  }