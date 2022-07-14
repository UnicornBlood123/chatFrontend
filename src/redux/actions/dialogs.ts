import { dialogsApi } from "../../utils/api";
import { IDialogItems } from "../interfaces/dialogs.interfaces";
import { IMessageItems } from "../interfaces/messages.interfaces";
import socket from "../../core/socket";
import { Dispatch } from "redux";

const actions = {
  setDialogs: (items: IDialogItems[]) => ({
    type: "DIALOGS:SET_ITEMS",
    payload: items,
  }),

  setLastMessage: (message: IMessageItems) => (dispatch: Dispatch) => {
    if (message) {
      dispatch({
        type: "DIALOGS:SET_LAST_MESSAGE",
        payload: message,
      });
    }
  },

  removeDialogById: (id: string) => (dispatch: Dispatch<any>) => {
    if (window.confirm("Вы действительно хотите удалить диалог?")) {
      dialogsApi.removeById(id).then(() => {
        dispatch(actions.removeDialogFromState(id));
      });
    }
  },

  setIsLoading: (bool: boolean) => ({
    type: "DIALOGS:SET_IS_LOADING",
    payload: bool,
  }),

  setCurrentDialogId: (id: string | null) => (dispatch: Dispatch) => {
    socket.emit("DIALOGS:JOIN", id);
    dispatch({
      type: "DIALOGS:SET_CURRENT_DIALOG_ID",
      payload: id,
    });
  },

  removeDialogFromState: (id: string) => ({
    type: "DIALOGS:REMOVE_DIALOG",
    payload: id,
  }),

  fetchDialogs: () => (dispatch: Dispatch) => {
    dispatch(actions.setIsLoading(true));
    dialogsApi
      .getAll()
      .then(({ data }) => {
        dispatch(actions.setDialogs(data));
      })
      .catch(() => dispatch(actions.setIsLoading(false)));
  },
};

export default actions;
