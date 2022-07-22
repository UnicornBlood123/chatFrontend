export interface IUser {
  _id: string;
  email: string;
  password: string;
  fullname: string;
  avatar: string | null;
  isOnline: boolean;
  last_seen: string;
  confirmed: boolean;
}

export interface IUserLogin {
  data: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  token: string;
}
