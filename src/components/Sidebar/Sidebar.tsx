import React from "react";
import { FormOutlined } from "@ant-design/icons/lib/icons";
import { IUser } from "../../redux/interfaces/users.interfaces";
import * as S from "./Sidebar.styles";
import { Dialogs } from "../../containers";
import { Select, Input, Button, Form } from "antd";
import { ISidebarComponents } from "./Sidebar.interfaces";

const { Option } = Select;
const { TextArea } = Input;

const Sidebar = ({
  user,
  users,
  value,
  selectedUserId,
  messageText,
  isModalVisible,
  onChangeTextArea,
  isLoading,
  showModal,
  handleOk,
  handleCancel,
  onChange,
  onSearch,
  onSelect,
}: ISidebarComponents) => {
  return (
    <S.ChatSidebar>
      <S.ChatSidebarDialogs>
        <S.ChatSidebarHeader>
          <div>
            <S.TeamOutlinedStyled />
            <span>Список диалогов</span>
          </div>
          <S.ChatSidebarButton onClick={showModal} icon={<FormOutlined />} />
        </S.ChatSidebarHeader>
        <Dialogs user={user} />
      </S.ChatSidebarDialogs>
      <S.ModalStyled
        title="Создать диалог"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Закрыть
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={messageText.length === 0 || selectedUserId.length === 0}
            loading={isLoading}
            onClick={handleOk}
          >
            Создать
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Введите имя пользователя или email">
            <Select
              showSearch
              value={value}
              placeholder="Имя пользователя или почта"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              onSelect={onSelect}
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {users.map((user: IUser) => (
                <Option key={user._id} value={user._id}>
                  {user.fullname}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {selectedUserId && (
            <Form.Item label="Введите ваше сообщение">
              <TextArea
                onChange={onChangeTextArea}
                value={messageText}
                autoSize={{ minRows: 3, maxRows: 3 }}
              />
            </Form.Item>
          )}
        </Form>
      </S.ModalStyled>
    </S.ChatSidebar>
  );
};

export default Sidebar;
