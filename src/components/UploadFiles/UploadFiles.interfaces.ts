import { IAttachment } from "../../redux/interfaces/messages.interfaces";

export interface IUploadFilesComponent {
  attachments: IAttachment[];
  setAttachments: (attachments: IAttachment[]) => void;
}
