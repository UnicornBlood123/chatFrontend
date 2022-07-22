import { axios } from "../core";
import { AxiosResponse } from "axios";

const getAxios = {
  upload: (file: any): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post("./files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default getAxios;
