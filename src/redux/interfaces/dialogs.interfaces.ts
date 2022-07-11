import { IUser } from "./users.interfaces";
import { IMessageItems } from "./messages.interfaces";

export interface IDialogs {
  items: IDialogItems[];
  currentDialogId: null | string;
  isLoading: boolean;
}

export interface IDialogItems {
  _id: string;
  text: string;
  author: IUser;
  partner: IUser;
  lastMessage: IMessageItems;
  createdAt: string;
  updatedAt: string;
}
