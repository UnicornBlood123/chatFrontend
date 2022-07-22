import { axios } from "../core";
import { IAttachment } from "../redux/interfaces/messages.interfaces";
import { AxiosResponse } from "axios";

const getAxios = {
  getAllByDialogId: (id: string | null): Promise<AxiosResponse> =>
    axios.get(`./messages?dialog=${id}`),
  send: (
    text: string,
    dialogId: string | null,
    attachments: IAttachment[]
  ): Promise<AxiosResponse> =>
    axios.post("./messages?dialog_id=", {
      dialog_id: dialogId,
      text: text,
      attachments: attachments,
    }),
  removeById: (id: string): Promise<AxiosResponse> =>
    axios.delete(`./messages/${id}`),
};

export default getAxios;
