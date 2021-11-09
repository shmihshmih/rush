import {createReducer, on} from '@ngrx/store';
import {State, UserState} from './index';
import {
  checkAuthFail,
  checkAuthSuccess,
  logoutFail,
  logoutSuccess,
  makeAuthorizationFail,
  makeAuthorizationSuccess,
  setAuthDataFromLocalStorage
} from './auth.actions';

export const initialAuthState: State = {
  isAuth: false,
  user: {email: '', displayName: '', refreshToken: '', uid: ''}
};

export const initialUserState: UserState = {
  email: '',
  displayName: '',
  refreshToken: '',
  uid: ''
};

export const createAuthReducer = createReducer(initialAuthState,
  on(makeAuthorizationSuccess, (state, {authData}) => {
    return {...state, user: authData, isAuth: true};
  }),
  on(makeAuthorizationFail, (state, {error}) => {
    return error;
  }),
  on(setAuthDataFromLocalStorage, (state, {authData}) => {
    if (authData?.email) {
      return {...state, user: {...authData}};
    } else {
      return state;
    }
  }),

  // логаут
  on(logoutSuccess, (state) => {
    localStorage.removeItem('authData');
    return {...state, isAuth: false, user: initialUserState};
  }),
  on(logoutFail, (state, {error}) => {
    return error;
  }),

  // проверка авторизации
  on(checkAuthSuccess, (state, {authData}) => {
    localStorage.setItem('authData', JSON.stringify(authData));
    if (authData.email) {
      return {...state, isAuth: true, user: {...authData}};
    } else {
      return {...state, isAuth: false, user: initialUserState};
    }
  }),
  on(checkAuthFail, (state, {error}) => {
    return error;
  }),
);

export function authReducer(state, action): State {
  return createAuthReducer(state, action);
}
