import {IFirebaseAuthData} from '../../shared/models/main.interface';

interface ICustomJwt {
  uid: string; // "some-uid",
  iat: number; // 1500147255,
  exp: number; // 1500150855,
  aud: string; // "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
  iss: string; // "firebaseserviceaccount@YOUR_PROJECT_ID.iam.gserviceaccount.com",
  sub: string; // "firebaseserviceaccount@YOUR_PROJECT_ID.iam.gserviceaccount.com"
}

export function createJWT(authData: IFirebaseAuthData): ICustomJwt {
  const objToJWT: ICustomJwt = {
    uid: '',
    iat: 0,
    exp: 0,
    aud: '',
    iss: '',
    sub: ''
  }
  return objToJWT;
}
