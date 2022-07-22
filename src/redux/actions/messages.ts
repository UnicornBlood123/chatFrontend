import { messagesApi } from "../../api";
import { IAttachment, IMessageItems } from "../interfaces/messages.interfaces";
import { Dispatch } from "redux";
import { IState } from "../interfaces/state.interfaces";
import { dialogsActions } from "./index";
import {AxiosResponse} from "axios";

interface IAction {
  type:string,
  payload:any
}

const actions = {
  setMessages: (items: IMessageItems[]):IAction => ({
    type: "MESSAGES:SET_ITEMS",
    payload: items,
  }),

  removeMessageById: (id: string) => (dispatch: Dispatch<any>):void => {
    if (window.confirm("Вы действительно хотите удалить сообщение?")) {
      messagesApi.removeById(id).then(({ data }) => {
        dispatch(actions.removeMessageFromState(id));
        dispatch(dialogsActions.setLastMessage(data.lastMessage));
      });
    }
  },

  removeMessageFromState: (id: string):IAction => ({
    type: "MESSAGES:REMOVE_MESSAGE",
    payload: id,
  }),

  addMessage:
    (message: IMessageItems) =>
    (dispatch: Dispatch, getState: () => IState):void => {
      const { dialogs } = getState();
      const { currentDialogId } = dialogs;
      if (currentDialogId === message.dialog._id) {
        dispatch({
          type: "MESSAGES:ADD_MESSAGE",
          payload: message,
        });
      }
    },

  fetchSendMessage: (
    text: string,
    dialog_id: string | null,
    attachments: IAttachment[]
  ):Promise<AxiosResponse> => {
    return messagesApi.send(text, dialog_id, attachments);
  },

  setIsLoading: (bool: boolean):IAction => ({
    type: "MESSAGES:SET_IS_LOADING",
    payload: bool,
  }),

  fetchMessages: (dialogId: null | string) => (dispatch: Dispatch):void => {
    dispatch(actions.setIsLoading(true));
    messagesApi
      .getAllByDialogId(dialogId)
      .then(({ data }) => {
        dispatch(actions.setMessages(data));
      })
      .catch(() => dispatch(actions.setIsLoading(false)));
  },
};

export default actions;
