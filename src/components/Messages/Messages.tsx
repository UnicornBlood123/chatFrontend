import { ReactElement, useEffect, useState } from "react";
import * as S from "./Messages.styles";
import Message from "../Message/Message";
import { IMessagesComponent } from "./Messages.interfaces";
import { IMessageItems } from "../../redux/interfaces/messages.interfaces";

const Messages = ({
  blockRef,
  isLoading,
  items,
  user,
  onRemoveMessage,
  inputRef,
  haveCurrentDialog,
  isTyping,
  partner,
}: IMessagesComponent): ReactElement => {
  const [inputSize, setInputSize] = useState<number>(0);
  useEffect((): (() => void) => {
    inputRef?.current?.contentWindow?.addEventListener("resize", (): void => {
      setInputSize(inputRef.current?.contentWindow?.innerHeight ?? 0);
    });

    return () => {
      inputRef?.current?.contentWindow?.removeEventListener("resize", () => {
        setInputSize(inputRef.current?.contentWindow?.innerHeight ?? 0);
      });
    };
  }, []);

  useEffect(() => {
    if (blockRef?.current) {
      blockRef?.current.scrollTo(0, blockRef.current.scrollHeight);
    }
  }, [inputSize]);

  return (
    <S.Messages ref={blockRef} inputSize={inputSize}>
      {isLoading ? (
        <S.DownloadMessages size={"large"} tip="Загрузка сообщений..." />
      ) : items && !isLoading && haveCurrentDialog ? (
        items.length > 0 ? (
          items.map((item: IMessageItems) => (
            <Message
              {...item}
              key={item._id}
              onRemoveMessage={onRemoveMessage.bind(this, item._id)}
              isRead={!item.unread}
              isMe={user._id === item.user._id}
            />
          ))
        ) : (
          <S.EmptyDialog description="Диалог пуст" />
        )
      ) : (
        <S.EmptyDialog description="Выберите диалог" />
      )}
      {isTyping && (
        <Message
          _id={"typing"}
          text={""}
          isRead={false}
          isMe={false}
          attachments={[]}
          isTyping={true}
          user={partner}
        />
      )}
    </S.Messages>
  );
};

export default Messages;
