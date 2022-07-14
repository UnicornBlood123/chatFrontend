import { axios } from "../../core";

const getAxios = {
  getAll: () => axios.get("./dialogs"),
  create: (partnerId: string, text: string) =>
    axios.post("./dialogs", {
      partner: partnerId,
      text: text,
    }),
  removeById: (id: string) => axios.delete("./dialogs/" + id),
};

export default getAxios;
