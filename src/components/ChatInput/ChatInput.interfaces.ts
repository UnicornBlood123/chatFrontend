import { IUser } from "../../redux/interfaces/users.interfaces";
import { IAttachment } from "../../redux/interfaces/messages.interfaces";
import { RefObject } from "react";

export interface IChatInputComponent {
  user: IUser;
  onSendMessage: (
    value: string,
    dialogId: string | null,
    attachments: IAttachment[]
  ) => void;
  dialogId: string | null;
  inputBlockRef: RefObject<HTMLIFrameElement>;
  haveCurrentDialog: boolean;
  value: string;
  setValue: (value: string) => void;
  attachments: IAttachment[];
  setAttachments: (attachments: IAttachment[]) => void;
  onSelectFiles: (files: any) => void;
  isRecording: boolean;
  onStopRecording: () => void;
  onRecord: () => void;
  isLoadingAudio: boolean;
}
