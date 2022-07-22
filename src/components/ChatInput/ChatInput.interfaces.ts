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
  emojiButtonRef: RefObject<HTMLDivElement>;
  emojiRef: RefObject<HTMLDivElement>;
  haveCurrentDialog: boolean;
  emojiPickerVisible: boolean;
  setEmojiPickerVisible: (bool: boolean) => void;
  toggleEmojiPickerVisible: () => void;
  value: string;
  setValue: (value: string) => void;
  cursorPosition: number;
  setCursorPosition: (num: number) => void;
  attachments: IAttachment[];
  setAttachments: (attachments: IAttachment[]) => void;
  onSelectFiles: (files: any) => void;
  isRecording: boolean;
  onStopRecording: () => void;
  onRecord: () => void;
  isLoadingAudio: boolean;
}
