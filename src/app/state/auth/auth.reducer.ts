import {createReducer, on} from '@ngrx/store';
import {State} from './index';
import {logout, makeAuthorizationFail, makeAuthorizationSuccess, setAuthDataFromLocalStorage} from './auth.actions';

export const initialAuthState: State = {
  isAuth: false,
  user: {email: '', password: ''}
};

export const createAuthReducer = createReducer(initialAuthState,
  on(makeAuthorizationSuccess, (state, {authData}) => {
    return {...state, user: authData, isAuth: true};
  }),
  on(makeAuthorizationFail, (state, {error}) => {
    return error;
  }),
  on(setAuthDataFromLocalStorage, (state, {authData}) => {
    if (authData.email && authData.password) {
      return {...state, user: authData};
    } else {
      return state;
    }
  }),
  on(logout, (state) => {
    localStorage.removeItem('token');
    return {...state, isAuth: false};
  }));

export function authReducer(state, action): State {
  return createAuthReducer(state, action);
}
