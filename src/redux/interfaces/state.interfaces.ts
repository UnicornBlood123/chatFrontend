import { IDialogs } from "./dialogs.interfaces";
import { IMessages } from "./messages.interfaces";
import { IUserLogin } from "./users.interfaces";

export interface IState {
  dialogs: IDialogs;
  messages: IMessages;
  user: IUserLogin;
}
