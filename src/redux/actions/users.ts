import { usersApi } from "../../utils/api";
import openNotificationWithIcon from "../../utils/helpers/openNotification";
import Paths from "../../pages/routes";
import { Dispatch } from "redux";

const actions = {
  setUserData: (data: any) => ({
    type: "USER:SET_DATA",
    payload: data,
  }),

  setIsAuth: (bool: boolean) => ({
    type: "USER:SET_IS_AUTH",
    payload: bool,
  }),

  setIsLoading: (bool: boolean) => ({
    type: "USER:SET_IS_LOADING",
    payload: bool,
  }),

  fetchUserData: () => (dispatch: Dispatch) => {
    dispatch(actions.setIsLoading(true));
    usersApi
      .getMe()
      .then(({ data }) => {
        dispatch(actions.setUserData(data));
      })
      .catch((err) => {
        dispatch(actions.setIsAuth(false));
        dispatch(actions.setIsLoading(false));
        delete window.localStorage.token;
      });
  },

  fetchUserLogin: (postData: any) => (dispatch: Dispatch<any>) => {
    return usersApi
      .login(postData)
      .then(({ data }: any) => {
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

  fetchUserRegistration: (postData: any) => {
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
