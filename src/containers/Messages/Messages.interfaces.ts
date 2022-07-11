import { IUser } from "../../redux/interfaces/users.interfaces";
import { RefObject } from "react";

export interface IMessagesContainer {
  user: IUser;
  inputRef: RefObject<HTMLIFrameElement>;
}
