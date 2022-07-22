import { ReactElement } from "react";
import * as S from "./DialogItem.styles";
import isToday from "date-fns/isToday";
import format from "date-fns/format";
import { Avatar, IconRead } from "../index";
import { IDialogItemComponent } from "./DialogItem.interfaces";
import Paths from "../../pages/routes";
import emoji from "react-easy-emoji";
import { Button, Popover } from "antd";
import { EllipsisOutlined } from "@ant-design/icons/lib/icons";
import { IAttachment } from "../../redux/interfaces/messages.interfaces";

const time = (date: Date): string => {
  if (isToday(date)) {
    return format(date, "HH:mm");
  }
  return format(date, "dd.MM.yyyy");
};

const DialogItem = ({
  _id,
  user,
  isMe,
  message,
  selectDialog,
  unread,
  onRemoveDialog,
}: IDialogItemComponent): ReactElement => {
  const getAudio = (): IAttachment => {
    return message.attachments.filter((el) => el.ext === "webm")[0];
  };

  const removeDialog = (): void => {
    onRemoveDialog(_id);
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
            <S.DialogActions>
              <Popover
                content={<Button onClick={removeDialog}>удалить</Button>}
              >
                <S.DialogActionsButton
                  size={"small"}
                  icon={<EllipsisOutlined />}
                />
              </Popover>
            </S.DialogActions>
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
