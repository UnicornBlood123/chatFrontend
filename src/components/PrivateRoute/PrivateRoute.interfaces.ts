import { IUser, IUserLogin } from "../../redux/interfaces/users.interfaces";

export interface IPrivateRouteComponent {
  component: React.ComponentType<{ user: IUser }>;
  user: IUserLogin;
}
