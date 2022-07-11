import { usersApi } from "../../utils/api";
import openNotificationWithIcon from "../../utils/helpers/openNotification";
import Paths from "../../pages/routes";
import { AnyAction, Dispatch } from "redux";

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
          window.location.href = Paths.HOME;
          openNotificationWithIcon({
            text: "Авторизация прошла успешно",
            title: "Успех",
            type: data.status,
          });
        }
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

  fetchUserRegistration: (postData: any) => (dispatch: Dispatch) => {
    return usersApi
      .registration(postData)
      .then(({ data }: any) => {
        window.location.href = Paths.VERIFY;
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  },
};

export default actions;
