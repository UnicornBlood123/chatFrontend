import { IDialogItems } from "../../redux/interfaces/dialogs.interfaces";
import { IUser } from "../../redux/interfaces/users.interfaces";

export interface IDialogsComponent {
  items: IDialogItems[];
  user: IUser;
  onSearch: (value: string) => void;
  isLoading: boolean;
  selectDialog: null | string;
}
