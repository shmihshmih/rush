export interface IUserAdmin {
  refreshToken: string;
  email: string;
  uid: string;
  displayName: string;
}

export interface IFirebaseAuthData {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}
