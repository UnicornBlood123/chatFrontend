import React, { ChangeEvent } from "react";
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
  onRemoveDialog,
}: IDialogsComponent) => {
  const search = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <>
      <S.DialogsSearch placeholder="Поиск среди контактов" onChange={search} />
      <S.Dialogs>
        {isLoading && !items.length ? (
          <S.DownloadDialogs size={"large"} tip="Загрузка диалогов..." />
        ) : items.length ? (
          orderBy(items, ["created_at"], ["desc"]).map(
            (item: IDialogItems, i) => (
              <DialogItem
                onRemoveDialog={onRemoveDialog}
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
