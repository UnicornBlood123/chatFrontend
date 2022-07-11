import { axios } from "../../core";

const getAxios = {
  login: (postData: any) => axios.post("./user/login", postData),
  registration: (postData: any) => axios.post("./user/registration", postData),
  verifyHash: (hash: string) =>
    axios.get("./user/registration/verify?hash=" + hash),
  getMe: () => axios.get("./user/me"),
  findUsers: (query: string) => axios.get("./user/find?query=" + query),
};

export default getAxios;
