import {UserState} from '../../state/auth';

export interface Main {
}

export interface IAuthData {
  authData: UserState;
  type: string;
}

export interface IUserAdmin {
  refreshToken: string;
  email: string;
  uid: string;
  displayName: string;
}
