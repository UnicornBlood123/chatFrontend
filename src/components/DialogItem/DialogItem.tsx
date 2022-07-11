import React from "react";
import * as S from "./DialogItem.styles";
import isToday from "date-fns/isToday";
import format from "date-fns/format";
import { Avatar, IconRead } from "../index";
import { IDialogItemComponent } from "./DialogItem.interfaces";
import Paths from "../../pages/routes";
import emoji from "react-easy-emoji";

const time = (date: Date) => {
  if (isToday(date)) {
    return format(date, "HH:mm");
  } else {
    return format(date, "dd.MM.yyyy");
  }
};

const DialogItem = ({
  _id,
  user,
  isMe,
  message,
  selectDialog,
  unread,
}: IDialogItemComponent) => {
  const getAudio = () => {
    return message.attachments.filter((el) => el.ext === "webm")[0];
  };

  return (
    <S.LinkStyled to={Paths.DIALOG + _id}>
      <S.DialogItem isSelected={_id === selectDialog}>
        <S.DialogItemAvatar isOnline={user.isOnline}>
          <Avatar user={user} />
        </S.DialogItemAvatar>
        <S.DialogItemInfo>
          <S.DialogItemInfoTop>
            <b>{user.fullname}</b>
            <span>{time(new Date(message.createdAt))}</span>
          </S.DialogItemInfoTop>
          <S.DialogItemInfoBottom>
            <S.MessageAvatar>
              {isMe ? <span>Я:</span> : <Avatar user={message.user} />}
            </S.MessageAvatar>
            <S.MessageText>
              <p>
                {emoji(message.text, {
                  baseUrl: "https://twemoji.maxcdn.com/2/svg/",
                  ext: ".svg",
                  size: "",
                })}
                {!message.text &&
                  (message.attachments.length === 1 && getAudio()
                    ? "Аудиосообщение"
                    : "Фотография")}
              </p>
            </S.MessageText>
            {isMe && <IconRead isRead={!message.unread} />}
            {unread > 0 && (
              <S.DialogItemMessageUnreadCount>
                {unread > 9 ? "+9" : unread}
              </S.DialogItemMessageUnreadCount>
            )}
          </S.DialogItemInfoBottom>
        </S.DialogItemInfo>
      </S.DialogItem>
    </S.LinkStyled>
  );
};

export default DialogItem;
