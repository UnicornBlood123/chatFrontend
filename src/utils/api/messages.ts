import { axios } from "../../core";
import { IAttachment } from "../../redux/interfaces/messages.interfaces";

const getAxios = {
  getAllByDialogId: (id: string | null) => axios.get("./messages?dialog=" + id),
  send: (text: string, dialogId: string | null, attachments: IAttachment[]) =>
    axios.post("./messages?dialog_id=", {
      dialog_id: dialogId,
      text: text,
      attachments: attachments,
    }),
  removeById: (id: string) => axios.delete("./messages/" + id),
};

export default getAxios;
