import { IUser } from "./users.interfaces";
import { IDialogItems } from "./dialogs.interfaces";

export interface IMessages {
  items: IMessageItems[] | null;
  isLoading: boolean;
}

export interface IMessageItems {
  _id: string;
  text: string;
  createdAt: Date | number;
  updatedAt: Date | number;
  user: IUser;
  dialog: IDialogItems;
  audio: string;
  unread: boolean;
  attachments: IAttachment[];
  isTyping: boolean;
}

export interface IAttachment {
  _id: string;
  filename: string;
  user: IUser | null;
  url: string;
  size: number;
  ext: string;
  status: string;
}
