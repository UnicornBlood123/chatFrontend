import { IMessageItems } from "../../redux/interfaces/messages.interfaces";
import { RefObject } from "react";
import { IUser } from "../../redux/interfaces/users.interfaces";

export interface IMessagesComponent {
  items: IMessageItems[] | null;
  blockRef: RefObject<HTMLDivElement> | null;
  isLoading: boolean;
  user: IUser;
  partner: IUser;
  onRemoveMessage: (id: string) => void;
  inputRef: RefObject<HTMLIFrameElement>;
  haveCurrentDialog: boolean;
  isTyping: boolean;
}
