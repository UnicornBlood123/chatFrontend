import React, { ChangeEvent, useState } from "react";
import { Sidebar as BasicSidebar } from "../../components";
import { IUser } from "../../redux/interfaces/users.interfaces";
import { dialogsApi, usersApi } from "../../utils/api";
import { ISidebarContainer } from "./Sidebar.interfaces";

const Sidebar = ({ user }: ISidebarContainer) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (value: string) => {
    setInputValue(value);
  };

  const onSearch = (value: string) => {
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

  const onSelect = (value: string) => {
    setSelectedUserId(value);
  };

  const addDialog = () => {
    setIsLoading(true);
    dialogsApi
      .create(selectedUserId, messageText)
      .then(() => {
        setIsLoading(false);
        setIsModalVisible(false);
        setMessageText("");
        setInputValue("");
      })
      .catch((err) => {
        alert(err.response.data.message);
        setIsLoading(false);
      });
  };

  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
export default Sidebar;
