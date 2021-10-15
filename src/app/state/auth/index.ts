export const authFeatureKey = 'authFeature';

export interface State {
  isAuth: boolean;
  user: {
    email: string;
    password: string;
  };
}
