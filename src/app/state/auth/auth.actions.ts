import {createAction, props} from '@ngrx/store';

enum AuthActionsTypes {
  makeAuthorization = `[AUTH] try to make Authorization`,
  makeAuthorizationSuccess = `[AUTH] Authorization success`,
  makeAuthorizationFail = `[AUTH] Authorization fail`,
  setAuthDataFromLocalStorage = `[AUTH] set user from localStorage`
}

export const makeAuthorization = createAction(AuthActionsTypes.makeAuthorization); // effect
export const makeAuthorizationSuccess = createAction(AuthActionsTypes.makeAuthorizationSuccess, props<{ authData }>());
export const makeAuthorizationFail = createAction(AuthActionsTypes.makeAuthorizationFail, props<{ error }>());
export const setAuthDataFromLocalStorage = createAction(AuthActionsTypes.setAuthDataFromLocalStorage, props<{ authData }>());
