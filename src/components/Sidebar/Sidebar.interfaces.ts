import { IUser } from "../../redux/interfaces/users.interfaces";
import { ChangeEvent } from "react";

export interface ISidebarComponents {
  user: IUser;
  users: IUser[];
  value: string;
  messageText: string;
  selectedUserId: string;
  isModalVisible: boolean;
  showModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
  isLoading: boolean;
  onChangeTextArea: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  onSelect: (value: string) => void;
}
