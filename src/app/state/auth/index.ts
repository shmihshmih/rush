export const authFeatureKey = 'authFeature';

export interface State {
  isAuth: boolean;
  user: UserState;
}

export interface UserState {
  email: string;
  displayName: string;
  refreshToken: string;
  uid: string;
}
