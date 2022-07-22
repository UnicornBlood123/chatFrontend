import { axios } from "../core";
import { ILoginFormValues } from "../modules/LoginForm/components/LoginForm.interfaces";
import { IRegisterFormValues } from "../modules/RegisterForm/components/RegisterForm/RegisterForm.interfaces";
import { AxiosResponse } from "axios";

const getAxios = {
  login: (postData: ILoginFormValues): Promise<AxiosResponse> =>
    axios.post("./user/login", postData),
  registration: (postData: IRegisterFormValues): Promise<AxiosResponse> =>
    axios.post("./user/registration", postData),
  verifyHash: (hash: string): Promise<AxiosResponse> =>
    axios.get(`./user/registration/verify?hash=${hash}`),
  getMe: (): Promise<AxiosResponse> => axios.get("./user/me"),
  findUsers: (query: string): Promise<AxiosResponse> =>
    axios.get(`./user/find?query=${query}`),
};

export default getAxios;
