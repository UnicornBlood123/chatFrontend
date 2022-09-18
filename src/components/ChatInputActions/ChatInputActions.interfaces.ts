import { IAttachment } from "../../redux/interfaces/messages.interfaces";

export interface IChatInputComponent {
  onSendMessage: (
    value: string,
    dialogId: string | null,
    attachments: IAttachment[]
  ) => void;
  dialogId: string | null;
  value: string;
  attachments: IAttachment[];
  onSelectFiles: (files: any) => void;
  onRecord: () => void;
}
