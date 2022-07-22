import { axios } from "../core";
import { AxiosResponse } from "axios";

const getAxios = {
  getAll: (): Promise<AxiosResponse> => axios.get("./dialogs"),
  create: (partnerId: string, text: string): Promise<AxiosResponse> =>
    axios.post("./dialogs", {
      partner: partnerId,
      text: text,
    }),
  removeById: (id: string): Promise<AxiosResponse> =>
    axios.delete(`./dialogs/${id}`),
};

export default getAxios;
