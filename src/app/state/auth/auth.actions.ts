import {createAction, props} from '@ngrx/store';

enum AuthActionsTypes {
  makeAuthorization = `[AUTH] try to make Authorization`,
  makeAuthorizationSuccess = `[AUTH] Authorization success`,
  makeAuthorizationFail = `[AUTH] Authorization fail`,
  setAuthDataFromLocalStorage = `[AUTH] set user from localStorage`,

  logout = `[AUTH] logout clear auth`,
  logoutSuccess = `[AUTH] logout clear auth success`,
  logoutFail = `[AUTH] logout clear auth fail`,

  checkAuth = `[AUTH] check auth`,
  checkAuthSuccess = `[AUTH] check auth success`,
  checkAuthFail = `[AUTH] check auth fail`,
}

export const makeAuthorization = createAction(AuthActionsTypes.makeAuthorization, props<{ email, password }>()); // effect
export const makeAuthorizationSuccess = createAction(AuthActionsTypes.makeAuthorizationSuccess, props<{ authData }>());
export const makeAuthorizationFail = createAction(AuthActionsTypes.makeAuthorizationFail, props<{ error }>());
export const setAuthDataFromLocalStorage = createAction(AuthActionsTypes.setAuthDataFromLocalStorage, props<{ authData }>());

/** logout */
export const logout = createAction(AuthActionsTypes.logout); // effect
export const logoutSuccess = createAction(AuthActionsTypes.logoutSuccess);
export const logoutFail = createAction(AuthActionsTypes.logoutFail, props<{ error }>());

/** Проверка авторизации */
export const checkAuth = createAction(AuthActionsTypes.checkAuth); // effect
export const checkAuthSuccess = createAction(AuthActionsTypes.checkAuthSuccess, props<{ authData }>());
export const checkAuthFail = createAction(AuthActionsTypes.checkAuthFail, props<{ error }>());
