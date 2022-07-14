import React, { useRef, useState } from "react";
import { ChatInput as BasicChatInput } from "../../components";
import { messagesActions } from "../../redux/actions";
import { useSelector } from "react-redux";
import { IState } from "../../redux/interfaces/state.interfaces";
import { IDialogItems } from "../../redux/interfaces/dialogs.interfaces";
import { filesApi } from "../../utils/api";
import { IAttachment } from "../../redux/interfaces/messages.interfaces";
import { IChatInputContainer } from "./ChatInput.interfaces";

const ChatInput = ({ inputRef, user }: IChatInputContainer) => {
  const dialogs = useSelector((state: IState) => state.dialogs);
  const currentDialogId = dialogs.currentDialogId;
  const emojiButtonRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [value, setValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [attachments, setAttachments] = useState<IAttachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [isLoadingAudio, setLoadingAudio] = useState(false);

  const currentDialog: IDialogItems = dialogs.items.filter(
    (dialog: IDialogItems) => dialog._id === currentDialogId
  )[0];

  const onRecord = () => {
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(onRecording, onError);
    }
  };

  const onError = (err: any) => {
    console.log("The following error occured: " + err);
  };

  const onHideRecording = () => {
    setIsRecording(false);
  };

  const sendAudio = (data: any) => {
    return messagesActions.fetchSendMessage("", currentDialog._id, [
      {
        _id: data.file._id,
        filename: data.file.filename,
        status: "done",
        size: data.file.size,
        url: data.file.url,
        user: data.file.user,
        ext: data.file.ext,
      },
    ]);
  };

  const onRecording = (stream: MediaStream) => {
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setIsRecording(true);
    };

    recorder.onstop = () => {
      setIsRecording(false);
    };

    recorder.ondataavailable = (e) => {
      const file = new File([e.data], "audio.webm");
      setLoadingAudio(true);
      filesApi.upload(file).then(({ data }) => {
        sendAudio(data).then(() => {
          setLoadingAudio(false);
        });
      });
    };
  };

  const toggleEmojiPickerVisible = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  const onUploadFile = (file: any, uid: number | string) => {
    filesApi.upload(file).then(({ data }) => {
      setAttachments((prevState) => {
        return prevState.map((item: IAttachment) => {
          if (item._id === uid) {
            return {
              _id: data.file._id,
              filename: data.file.filename,
              status: "done",
              url: data.file.url,
              user: data.file.user,
              ext: data.file.ext,
              size: data.file.size,
            };
          }
          return item;
        });
      });
    });
  };

  const onSelectFiles = (files: any) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uid = Math.round(Math.random() * 10000).toString();
      setAttachments((prevState) => {
        return [
          ...prevState,
          {
            _id: uid,
            filename: file.name,
            status: "uploading",
            ext: file.type,
            size: file.size,
            url: "",
            user: null,
          },
        ];
      });
      onUploadFile(file, uid);
    }
  };

  const onSendMessage = (
    value: string,
    dialogId: string | null,
    attachments: IAttachment[]
  ) => {
    if (isRecording) {
      mediaRecorder?.stop();
    } else if (
      (value.trim().length > 0 && attachments.length === 0) ||
      (attachments.length > 0 &&
        attachments.every((item: IAttachment) => item.status === "done"))
    ) {
      messagesActions.fetchSendMessage(value, dialogId, attachments);
      setValue("");
      setEmojiPickerVisible(false);
      setAttachments([]);
    }
  };

  return (
    <BasicChatInput
      user={user}
      haveCurrentDialog={!!currentDialog}
      onSendMessage={onSendMessage}
      dialogId={currentDialogId}
      inputBlockRef={inputRef}
      emojiButtonRef={emojiButtonRef}
      emojiRef={emojiRef}
      emojiPickerVisible={emojiPickerVisible}
      setEmojiPickerVisible={setEmojiPickerVisible}
      toggleEmojiPickerVisible={toggleEmojiPickerVisible}
      value={value}
      setValue={setValue}
      cursorPosition={cursorPosition}
      setCursorPosition={setCursorPosition}
      attachments={attachments}
      setAttachments={setAttachments}
      onSelectFiles={onSelectFiles}
      isRecording={isRecording}
      onRecord={onRecord}
      onStopRecording={onHideRecording}
      isLoadingAudio={isLoadingAudio}
    />
  );
};

export default ChatInput;
