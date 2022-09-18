import { ChangeEvent, memo, ReactElement, useState } from "react";
import { Sidebar as BasicSidebar } from "../../components";
import { IUser } from "../../redux/interfaces/users.interfaces";
import { dialogsApi, usersApi } from "../../api";
import { ISidebarContainer } from "./Sidebar.interfaces";

const Sidebar = ({ user }: ISidebarContainer): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
  };

  const onChange = (value: string): void => {
    setInputValue(value);
  };

  const onSearch = (value: string): void => {
    setIsLoading(true);
    usersApi
      .findUsers(value)
      .then(({ data }) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onSelect = (value: string): void => {
    setSelectedUserId(value);
  };

  const addDialog = (): void => {
    setIsLoading(true);
    dialogsApi
      .create(selectedUserId, messageText)
      .then(() => {
        setIsLoading(false);
        setMessageText("");
        setInputValue("");
        setIsModalVisible(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
        setIsLoading(false);
      });
  };

  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessageText(event.currentTarget.value);
  };

  return (
    <BasicSidebar
      user={user}
      users={users}
      value={inputValue}
      selectedUserId={selectedUserId}
      onChangeTextArea={onChangeTextArea}
      messageText={messageText}
      isModalVisible={isModalVisible}
      isLoading={isLoading}
      showModal={showModal}
      handleOk={addDialog}
      handleCancel={handleCancel}
      onChange={onChange}
      onSearch={onSearch}
      onSelect={onSelect}
    />
  );
};
export default memo(Sidebar);
