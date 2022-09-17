import {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  KeyboardEvent,
} from "react";
import * as S from "./ChatInput.styles";
import {
  SmileOutlined,
  AudioOutlined,
  SendOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons/lib/icons";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";
// @ts-expect-error" @types/navjobs отсутсвует
import { UploadField } from "@navjobs/upload";
import { TextAreaRef } from "antd/es/input/TextArea";
import UploadFiles from "../UploadFiles/UploadFiles";
import socket from "../../core/socket";
import { IChatInputComponent } from "./ChatInput.interfaces";

const ChatInput = ({
  user,
  onSendMessage,
  dialogId,
  inputBlockRef,
  emojiButtonRef,
  emojiRef,
  haveCurrentDialog,
  emojiPickerVisible,
  setEmojiPickerVisible,
  toggleEmojiPickerVisible,
  value,
  setValue,
  cursorPosition,
  setCursorPosition,
  attachments,
  setAttachments,
  onSelectFiles,
  isRecording,
  onStopRecording,
  onRecord,
  isLoadingAudio,
}: IChatInputComponent): ReactElement => {
  const inputRef = useRef<TextAreaRef>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent): void => {
      if (
        emojiRef.current &&
        emojiButtonRef.current &&
        !inputRef.current?.resizableTextArea?.textArea.contains(
          e.target as Node
        ) &&
        !emojiButtonRef.current?.contains(e.target as Node) &&
        !emojiRef.current?.contains(e.target as Node)
      ) {
        setEmojiPickerVisible(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

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

  const handleButtonSendMessage = (): void => {
    onSendMessage(value, dialogId, attachments);
  };

  const selectFiles = (files: File): void => {
    onSelectFiles(files);
  };

  const sendMessage = (): void => {
    onSendMessage(value, dialogId, attachments);
  };

  const onEmojiClick = (
    event: React.MouseEvent,
    { emoji }: IEmojiData
  ): void => {
    if (inputRef.current) {
      inputRef.current.focus();
      const start = value.substring(
        0,
        Number(inputRef.current?.resizableTextArea?.textArea.selectionStart)
      );
      const end = value.substring(
        Number(inputRef.current?.resizableTextArea?.textArea.selectionStart)
      );
      setValue((start + emoji + end).trim());
      setCursorPosition(start.length + String(emoji).length);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.resizableTextArea?.textArea.setSelectionRange(
        cursorPosition,
        cursorPosition
      );
    }
  }, [cursorPosition]);

  useEffect(() => {
    if (inputRef.current && emojiPickerVisible) {
      inputRef.current.focus();
    }
  }, [emojiPickerVisible]);

  return (
    <S.ChatInputWithFiles>
      <S.iframeStyled ref={inputBlockRef} />
      {haveCurrentDialog && (
        <>
          <S.ChatInput>
            {!isRecording && !(isLoadingAudio && !isRecording) ? (
              <>
                <S.ChatInputSmile ref={emojiButtonRef}>
                  <S.Emoji
                    ref={emojiRef}
                    emojiPickerVisible={emojiPickerVisible}
                  >
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </S.Emoji>
                  <S.ChatButtonSmile
                    onClick={toggleEmojiPickerVisible}
                    icon={<SmileOutlined />}
                  />
                </S.ChatInputSmile>
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
                <S.ChatInputActions>
                  <S.UploadFiles>
                    <UploadField
                      onFiles={selectFiles}
                      uploadProps={{
                        accept: ".jpg,.png,.gif,.jpeg,.bmp",
                        multiple: "multiple",
                      }}
                    >
                      <S.CameraOutlinedStyled />
                    </UploadField>
                  </S.UploadFiles>
                  <S.ChatInputSend>
                    {value || attachments.length > 0 ? (
                      <S.ChatButton
                        icon={<SendOutlined />}
                        onClick={handleButtonSendMessage}
                      />
                    ) : (
                      <S.ChatButton
                        onClick={onRecord}
                        icon={<AudioOutlined />}
                      />
                    )}
                  </S.ChatInputSend>
                </S.ChatInputActions>
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
