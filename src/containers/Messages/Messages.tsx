import { memo, ReactElement, useEffect, useRef, useState } from "react";
import { Messages as BasicMessages } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { dialogsActions, messagesActions } from "../../redux/actions";
import { IState } from "../../redux/interfaces/state.interfaces";
import { socket } from "../../core";
import { IUser } from "../../redux/interfaces/users.interfaces";
import { IMessageItems } from "../../redux/interfaces/messages.interfaces";
import { IDialogItems } from "../../redux/interfaces/dialogs.interfaces";
import { IMessagesContainer } from "./Messages.interfaces";

const Messages = ({ user, inputRef }: IMessagesContainer): ReactElement => {
  const dispatch = useDispatch();
  const messages = useSelector((state: IState) => state.messages);
  const dialogs = useSelector((state: IState) => state.dialogs);
  const [currentDialogsId, setCurrentDialogsId] = useState(
    dialogs.currentDialogId
  );
  const [currentDialog, setCurrentDialog] = useState(
    dialogs.items.find(
      (dialog: IDialogItems) => dialog._id === currentDialogsId
    )
  );
  const messagesRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  let interval: ReturnType<typeof setTimeout>;

  useEffect(() => {
    setCurrentDialogsId(dialogs.currentDialogId);
    setCurrentDialog(
      dialogs.items.find(
        (dialog: IDialogItems) => dialog._id === currentDialogsId
      )
    );
  }, [dialogs.currentDialogId]);

  const getPartner = (): IUser => {
    return currentDialog
      ? user._id === currentDialog.partner._id
        ? currentDialog.author
        : currentDialog.partner
      : user;
  };

  const toggleIsTyping = ({
    typingUser,
    dialogId,
  }: {
    typingUser: IUser;
    dialogId: string;
  }): void => {
    if (user._id !== typingUser._id && currentDialogsId === dialogId) {
      setIsTyping(true);
      clearTimeout(interval);
      interval = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (currentDialogsId) {
      dispatch(messagesActions.fetchMessages(currentDialogsId) as any);
    }
    socket.on("DIALOGS:TYPING", toggleIsTyping);
    return () => {
      socket.off("DIALOGS:TYPING", toggleIsTyping);
    };
  }, [currentDialogsId]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    socket.on("SERVER:NEW_MESSAGE", (data) => {
      dispatch(messagesActions.addMessage(data) as any);
      dispatch(dialogsActions.setLastMessage(data) as any);
    });
    socket.on(
      "SERVER:MESSAGE_DELETED",
      ({
        authorId,
        messageId,
        lastMessage,
      }: {
        authorId: string;
        messageId: string;
        lastMessage: IMessageItems;
      }) => {
        if (authorId !== user._id) {
          dispatch(messagesActions.removeMessageFromState(messageId));
          dispatch(dialogsActions.setLastMessage(lastMessage) as any);
        }
      }
    );
    return () => {
      socket.off("SERVER:NEW_MESSAGE");
      socket.off("SERVER:MESSAGE_DELETED");
    };
  }, []);

  const onRemoveMessageById = (messageId: string): void => {
    dispatch(messagesActions.removeMessageById(messageId) as any);
  };

  return (
    <BasicMessages
      haveCurrentDialog={Boolean(currentDialogsId)}
      items={messages.items}
      isLoading={messages.isLoading}
      blockRef={messagesRef}
      user={user}
      onRemoveMessage={onRemoveMessageById}
      inputRef={inputRef}
      isTyping={isTyping}
      partner={getPartner()}
    />
  );
};

export default memo(Messages);
