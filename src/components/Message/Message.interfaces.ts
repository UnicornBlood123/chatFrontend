import { IUser } from "../../redux/interfaces/users.interfaces";
import { IAttachment } from "../../redux/interfaces/messages.interfaces";

export interface IMessageComponent {
  _id: string;
  text: string;
  createdAt?: Date | number;
  user: IUser;
  isMe: boolean;
  isRead: boolean;
  attachments: IAttachment[];
  isTyping: boolean;
  onRemoveMessage?: () => void;
}
