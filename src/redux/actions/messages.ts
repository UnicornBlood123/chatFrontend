import { messagesApi } from "../../utils/api";
import { IAttachment, IMessageItems } from "../interfaces/messages.interfaces";
import { Dispatch } from "redux";
import { IState } from "../interfaces/state.interfaces";
import { dialogsActions } from "./index";

const actions = {
  setMessages: (items: IMessageItems[]) => ({
    type: "MESSAGES:SET_ITEMS",
    payload: items,
  }),

  removeMessageById: (id: string) => (dispatch: Dispatch<any>) => {
    if (window.confirm("Вы действительно хотите удалить сообщение?")) {
      messagesApi.removeById(id).then(({ data }) => {
        dispatch(actions.removeMessageFromState(id));
        dispatch(dialogsActions.setLastMessage(data.lastMessage));
      });
    }
  },

  removeMessageFromState: (id: string) => ({
    type: "MESSAGES:REMOVE_MESSAGE",
    payload: id,
  }),

  addMessage:
    (message: IMessageItems) =>
    (dispatch: Dispatch, getState: () => IState) => {
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
  ) => {
    return messagesApi.send(text, dialog_id, attachments);
  },

  setIsLoading: (bool: boolean) => ({
    type: "MESSAGES:SET_IS_LOADING",
    payload: bool,
  }),

  fetchMessages: (dialogId: null | string) => (dispatch: Dispatch) => {
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
