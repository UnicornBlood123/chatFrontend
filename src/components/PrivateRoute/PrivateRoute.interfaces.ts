import { IUser, IUserLogin } from "../../redux/interfaces/users.interfaces";
import { ComponentType } from "react";

export interface IPrivateRouteComponent {
  component: ComponentType<{ user: IUser | null }>;
  user: IUserLogin;
}
