import {IUserAdmin} from '../../shared/models/main.interface';

export function setUserToLS(user: IUserAdmin): void {
  const rawUser = JSON.stringify(user);
  localStorage.setItem('alpha-systems-user', rawUser);
}

export function getUserFromLS(): IUserAdmin | undefined {
  const rawUser = localStorage.getItem('alpha-systems-user');
  if (rawUser) {
    return JSON.parse(rawUser);
  }
}

export function clearUserFromLS(): void {
  localStorage.removeItem('alpha-systems-user');
}
