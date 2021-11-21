import {UserState} from '../../state/auth';

export interface Main {
}

export interface IAuthData {
  authData: UserState;
  type: string;
}
