import { memo, ReactElement, useEffect, useState } from "react";
import { ChatInput as BasicChatInput } from "../../components";
import { messagesActions } from "../../redux/actions";
import { useSelector } from "react-redux";
import { IState } from "../../redux/interfaces/state.interfaces";
import { filesApi } from "../../api";
import { IAttachment } from "../../redux/interfaces/messages.interfaces";
import { IChatInputContainer } from "./ChatInput.interfaces";
import { AxiosResponse } from "axios";

const ChatInput = ({ inputRef, user }: IChatInputContainer): ReactElement => {
  const dialogs = useSelector((state: IState) => state.dialogs);
  const [value, setValue] = useState<string>("");
  const [attachments, setAttachments] = useState<IAttachment[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [isLoadingAudio, setLoadingAudio] = useState<boolean>(false);
  const [currentDialogId, setCurrentDialogId] = useState(
    dialogs.currentDialogId
  );

  useEffect(() => {
    setCurrentDialogId(dialogs.currentDialogId);
  }, [dialogs.currentDialogId]);

  const onError = (err: string): void => {
    alert(`Произошла следующая ошибка: ${err}`);
  };

  const onHideRecording = (): void => {
    setIsRecording(false);
  };

  const sendAudio = (file: IAttachment): Promise<AxiosResponse> => {
    return messagesActions.fetchSendMessage("", currentDialogId, [
      {
        _id: file._id,
        filename: file.filename,
        status: "done",
        size: file.size,
        url: file.url,
        user: file.user,
        ext: file.ext,
      },
    ]);
  };

  const onRecording = (stream: MediaStream): void => {
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = (): void => {
      setIsRecording(true);
    };

    recorder.onstop = (): void => {
      setIsRecording(false);
    };

    recorder.ondataavailable = (e): void => {
      const file = new File([e.data], "audio.webm");
      setLoadingAudio(true);
      filesApi.upload(file).then(({ data }) => {
        sendAudio(data.file).then(() => {
          setLoadingAudio(false);
        });
      });
    };
  };

  const onRecord = (): void => {
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(onRecording, onError);
    }
  };

  const onUploadFile = (file: File, uid: number | string): void => {
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

  const onSelectFiles = (files: File[]): void => {
    Array.from(files).forEach((file: File) => {
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
    });
  };

  const onSendMessage = (
    value: string,
    dialogId: string | null,
    attachments: IAttachment[]
  ): void => {
    if (isRecording) {
      mediaRecorder?.stop();
    } else if (
      (value.trim().length > 0 && attachments.length === 0) ||
      (attachments.length > 0 &&
        attachments.every((item: IAttachment) => item.status === "done"))
    ) {
      messagesActions.fetchSendMessage(value, dialogId, attachments);
      setValue("");
      setAttachments([]);
    }
  };

  return (
    <BasicChatInput
      user={user}
      haveCurrentDialog={Boolean(currentDialogId)}
      onSendMessage={onSendMessage}
      dialogId={currentDialogId}
      inputBlockRef={inputRef}
      value={value}
      setValue={setValue}
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

export default memo(ChatInput);
