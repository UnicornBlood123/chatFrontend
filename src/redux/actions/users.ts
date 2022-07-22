import { usersApi } from "../../api";
import openNotificationWithIcon from "../../utils/openNotification";
import Paths from "../../pages/routes";
import { Dispatch } from "redux";
import {IUser} from "../interfaces/users.interfaces";
import {ILoginFormValues} from "../../modules/LoginForm/components/LoginForm.interfaces";
import {IRegisterFormValues} from "../../modules/RegisterForm/components/RegisterForm/RegisterForm.interfaces";

interface IAction {
  type:string,
  payload:any
}

const actions = {
  setUserData: (data: IUser):IAction => ({
    type: "USER:SET_DATA",
    payload: data,
  }),

  setIsAuth: (bool: boolean):IAction => ({
    type: "USER:SET_IS_AUTH",
    payload: bool,
  }),

  setIsLoading: (bool: boolean):IAction => ({
    type: "USER:SET_IS_LOADING",
    payload: bool,
  }),

  fetchUserData: () => (dispatch: Dispatch):void => {
    dispatch(actions.setIsLoading(true));
    usersApi
      .getMe()
      .then(({ data }) => {
        dispatch(actions.setUserData(data));
      })
      .catch(() => {
        dispatch(actions.setIsAuth(false));
        dispatch(actions.setIsLoading(false));
        delete window.localStorage.token;
      });
  },

  fetchUserLogin: (postData: ILoginFormValues) => (dispatch: Dispatch<any>):Promise<void> => {
    return usersApi
      .login(postData)
      .then(({ data }) => {
        if (data.status === "success") {
          openNotificationWithIcon({
            text: "Авторизация прошла успешно",
            title: "Успех",
            type: data.status,
          });
        }
        window.location.href = Paths.HOME;
        window.axios.defaults.headers.common["token"] = data.token;
        window.localStorage["token"] = data.token;
        dispatch(actions.fetchUserData());
      })
      .catch(({ response }) => {
        if (response.data.status === "error") {
          openNotificationWithIcon({
            text: "Неверный логин или пароль",
            title: "Ошибка авторизации",
            type: response.data.status,
          });
        }
      });
  },

  fetchUserRegistration: (postData: IRegisterFormValues):Promise<void> => {
    return usersApi
      .registration(postData)
      .then(({ data }) => {
        if (data.status === "success") {
          openNotificationWithIcon({
            text: "Регистрация прошла успешно",
            title: "Успех",
            type: data.status,
          });
        }
        window.location.href = Paths.VERIFY;
      })
      .catch(({ response }) => {
        if (response.data.status === "error") {
          openNotificationWithIcon({
            text: `${response.data.message}`,
            title: "Ошибка регистрации",
            type: response.data.status,
          });
        }
      });
  },
};

export default actions;
