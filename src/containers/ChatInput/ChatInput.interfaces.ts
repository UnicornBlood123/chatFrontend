import { IUser } from "../../redux/interfaces/users.interfaces";
import { RefObject } from "react";

export interface IChatInputContainer {
  user: IUser;
  inputRef: RefObject<HTMLIFrameElement>;
}
