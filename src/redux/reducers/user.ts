import {IUserLogin} from "../interfaces/users.interfaces";

const initialState = {
  data: null,
  isAuth: Boolean(window.localStorage.token),
  token: window.localStorage.token,
  isLoading: false,
};

const user = (state = initialState, action: { type: string; payload: any }):IUserLogin => {
  switch (action.type) {
    case "USER:SET_DATA":
      return {
        ...state,
        data: action.payload,
        isAuth: true,
        token: window.localStorage.token,
        isLoading: false,
      };
    case "USER:SET_IS_AUTH":
      return {
        ...state,
        isAuth: action.payload,
      };
    case "USER:SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default user;
