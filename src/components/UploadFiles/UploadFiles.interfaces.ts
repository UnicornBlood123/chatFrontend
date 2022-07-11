import { IAttachment } from "../../redux/interfaces/messages.interfaces";
import { UploadFile } from "antd/es/upload/interface";

export interface IUploadFilesComponent {
  attachments: IAttachment[];
  setAttachments: (attachments: IAttachment[]) => void;
}
