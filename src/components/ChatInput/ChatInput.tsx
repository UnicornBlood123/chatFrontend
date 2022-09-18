import { ChangeEvent, ReactElement, useRef, KeyboardEvent } from "react";
import * as S from "./ChatInput.styles";
import {
  SendOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons/lib/icons";
import { TextAreaRef } from "antd/es/input/TextArea";
import UploadFiles from "../UploadFiles/UploadFiles";
import socket from "../../core/socket";
import { IChatInputComponent } from "./ChatInput.interfaces";
import ChatInputSmile from "../../containers/ChatInputSmiile/ChatInputSmile";
import ChatInputActions from "../ChatInputActions/ChatInputActionns";

const ChatInput = ({
  user,
  onSendMessage,
  dialogId,
  inputBlockRef,
  haveCurrentDialog,
  value,
  setValue,
  attachments,
  setAttachments,
  onSelectFiles,
  isRecording,
  onStopRecording,
  onRecord,
  isLoadingAudio,
}: IChatInputComponent): ReactElement => {
  const inputRef = useRef<TextAreaRef>(null);

  const handleSendMessage = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.keyCode === 13 && !e.shiftKey) {
      onSendMessage(value, dialogId, attachments);
      e.preventDefault();
    }
  };

  const handleInputMessage = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    socket.emit("DIALOGS:TYPING", { dialogId: dialogId, typingUser: user });
    setValue(e.target.value);
  };

  const sendMessage = (): void => {
    onSendMessage(value, dialogId, attachments);
  };

  return (
    <S.ChatInputWithFiles>
      <S.iframeStyled ref={inputBlockRef} />
      {haveCurrentDialog && (
        <>
          <S.ChatInput>
            {!isRecording && !(isLoadingAudio && !isRecording) ? (
              <>
                <ChatInputSmile
                  value={value}
                  setValue={setValue}
                  inputRef={inputRef}
                />
                <S.ChatInputText
                  ref={inputRef}
                  onChange={handleInputMessage}
                  onPressEnter={handleSendMessage}
                  rows={1}
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  placeholder="Введите текст..."
                  size="large"
                  value={value}
                />
                <ChatInputActions
                  value={value}
                  attachments={attachments}
                  dialogId={dialogId}
                  onRecord={onRecord}
                  onSelectFiles={onSelectFiles}
                  onSendMessage={onSendMessage}
                />
              </>
            ) : (
              <S.ChatInputRecording>
                <S.ChatButton
                  onClick={onStopRecording}
                  icon={<CloseOutlined />}
                />
                <S.ChatRecordStatus>
                  {isLoadingAudio ? (
                    <p>Отправка аудио...</p>
                  ) : (
                    <>
                      <p>Запись аудио</p>
                      <LoadingOutlined />
                    </>
                  )}
                </S.ChatRecordStatus>
                {isLoadingAudio ? (
                  <LoadingOutlined />
                ) : (
                  <S.ChatButton onClick={sendMessage} icon={<SendOutlined />} />
                )}
              </S.ChatInputRecording>
            )}
          </S.ChatInput>
          {attachments.length > 0 && (
            <UploadFiles
              setAttachments={setAttachments}
              attachments={attachments}
            />
          )}
        </>
      )}
    </S.ChatInputWithFiles>
  );
};

export default ChatInput;
