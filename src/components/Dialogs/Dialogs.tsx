import React from "react";
import * as S from "./Dialogs.styles";
import { DialogItem } from "../index";
import { orderBy } from "lodash";
import Empty from "antd/es/empty";
import { IDialogsComponent } from "./Dialogs.interfaces";
import { IDialogItems } from "../../redux/interfaces/dialogs.interfaces";

const Dialogs = ({
  items,
  user,
  onSearch,
  isLoading,
  selectDialog,
}: IDialogsComponent) => {
  return (
    <>
      <S.DialogsSearch
        placeholder="Поиск среди контактов"
        onChange={(e) => onSearch(e.target.value)}
      />
      <S.Dialogs>
        {isLoading && !items.length ? (
          <S.DownloadDialogs size={"large"} tip="Загрузка диалогов..." />
        ) : items.length ? (
          orderBy(items, ["created_at"], ["desc"]).map(
            (item: IDialogItems, i) => (
              <DialogItem
                selectDialog={selectDialog}
                key={i}
                isMe={item.lastMessage.user._id === user._id}
                unread={0}
                message={item.lastMessage}
                user={
                  item.partner._id === user._id ? item.author : item.partner
                }
                {...item}
              />
            )
          )
        ) : (
          <Empty
            description="Диалог не найден"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </S.Dialogs>
    </>
  );
};

export default Dialogs;
