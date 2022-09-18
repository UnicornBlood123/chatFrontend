import { IUser } from "../../redux/interfaces/users.interfaces";
import { IMessageItems } from "../../redux/interfaces/messages.interfaces";

export interface IDialogItemComponent {
  _id: string;
  user: IUser;
  message: IMessageItems;
  selectDialog: null | string;
  isMe: boolean;
  text: string;
  unread: boolean;
  onRemoveDialog: (id: string) => void;
}
