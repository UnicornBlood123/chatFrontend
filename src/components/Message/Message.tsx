import { ReactElement, useState } from "react";
import * as S from "./Message.styles";
import { Time, IconRead, MessageAudio } from "../index";
import Avatar from "../Avatar/Avatar";
import { IMessageComponent } from "./Message.interfaces";
import { EllipsisOutlined } from "@ant-design/icons/lib/icons";
import { Button, Popover } from "antd";
import emoji from "react-easy-emoji";
import { IAttachment } from "../../redux/interfaces/messages.interfaces";

const Message = ({
  _id,
  text,
  createdAt,
  user,
  isMe,
  isRead,
  attachments,
  isTyping,
  onRemoveMessage,
}: IMessageComponent): ReactElement => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const onClickImage = (url: string): void => {
    setPreviewImage(url);
    setPreviewVisible(true);
  };

  const handleCancelImage = (): void => setPreviewVisible(false);

  const getAudio = (): IAttachment => {
    return attachments.filter((el) => el.ext === "webm")[0];
  };

  const clickImage = (item: IAttachment): void => {
    onClickImage(item.url);
  };

  return (
    <S.Message
      isMe={isMe}
      isTyping={isTyping}
      audio={Boolean(getAudio())}
      isImage={attachments && attachments.length === 1 && !getAudio() && !text}
    >
      <S.MessageContent>
        <S.MessageAvatar>
          <Avatar user={user} />
        </S.MessageAvatar>
        <S.MessageInfo>
          <S.MessageDiv>
            <S.MessageActionsInfo>
              {isMe && (
                <>
                  <S.MessageActions>
                    <Popover
                      content={
                        <Button onClick={onRemoveMessage}>удалить</Button>
                      }
                    >
                      <S.MessageActionsButton
                        size={"small"}
                        icon={<EllipsisOutlined />}
                      />
                    </Popover>
                  </S.MessageActions>
                  <S.MessageIconRead>
                    <IconRead isRead={isRead} />
                  </S.MessageIconRead>
                </>
              )}
            </S.MessageActionsInfo>
            <S.MessageDivReverse>
              {(getAudio() ||
                text ||
                (text && attachments.length === 1) ||
                isTyping) && (
                <S.MessageBubble>
                  {text && (
                    <S.MessageText>
                      {emoji(text, {
                        baseUrl: "https://twemoji.maxcdn.com/2/svg/",
                        ext: ".svg",
                        size: "",
                      })}
                    </S.MessageText>
                  )}
                  {isTyping && (
                    <S.MessageTyping>
                      <span />
                      <span />
                      <span />
                    </S.MessageTyping>
                  )}
                  {getAudio() && <MessageAudio audio={getAudio().url} />}
                </S.MessageBubble>
              )}
              {attachments && !getAudio() && (
                <S.MessageAttachments>
                  {attachments.map((item) => (
                    <S.MessageAttachmentsItem
                      key={item._id}
                      onClick={clickImage.bind(this, item)}
                    >
                      <img src={item.url} alt={item.filename} />
                    </S.MessageAttachmentsItem>
                  ))}
                </S.MessageAttachments>
              )}
            </S.MessageDivReverse>
          </S.MessageDiv>
          {createdAt && (
            <S.MessageDate>
              <Time date={createdAt} />
            </S.MessageDate>
          )}
          <S.ModalStyled
            visible={previewVisible}
            footer={null}
            onCancel={handleCancelImage}
          >
            <img alt="example" src={previewImage} />
          </S.ModalStyled>
        </S.MessageInfo>
      </S.MessageContent>
    </S.Message>
  );
};

export default Message;
