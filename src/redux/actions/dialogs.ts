import { dialogsApi } from "../../api";
import { IDialogItems } from "../interfaces/dialogs.interfaces";
import { IMessageItems } from "../interfaces/messages.interfaces";
import socket from "../../core/socket";
import { Dispatch } from "redux";

interface IAction {
  type: string;
  payload: any;
}

const actions = {
  setDialogs: (items: IDialogItems[]): IAction => ({
    type: "DIALOGS:SET_ITEMS",
    payload: items,
  }),

  setLastMessage:
    (message: IMessageItems) =>
    (dispatch: Dispatch): void => {
      if (message) {
        dispatch({
          type: "DIALOGS:SET_LAST_MESSAGE",
          payload: message,
        });
      }
    },

  removeDialogById:
    (id: string) =>
    (dispatch: Dispatch): void => {
      if (window.confirm("Вы действительно хотите удалить диалог?")) {
        dialogsApi.removeById(id);
        dispatch(actions.removeDialogFromState(id));
      }
    },

  setIsLoading: (bool: boolean): IAction => ({
    type: "DIALOGS:SET_IS_LOADING",
    payload: bool,
  }),

  setCurrentDialogId:
    (id: string | null) =>
    (dispatch: Dispatch): void => {
      socket.emit("DIALOGS:JOIN", id);
      dispatch({
        type: "DIALOGS:SET_CURRENT_DIALOG_ID",
        payload: id,
      });
    },

  removeDialogFromState: (id: string): IAction => ({
    type: "DIALOGS:REMOVE_DIALOG",
    payload: id,
  }),

  fetchDialogs:
    () =>
    (dispatch: Dispatch): void => {
      dispatch(actions.setIsLoading(true));
      dialogsApi
        .getAll()
        .then(({ data }) => {
          dispatch(actions.setDialogs(data));
          setTimeout(() => {
            dispatch(actions.setIsLoading(false));
          }, 0);
        })
        .catch(() => dispatch(actions.setIsLoading(false)));
    },
};

export default actions;
