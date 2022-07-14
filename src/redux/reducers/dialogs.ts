import { IDialogItems, IDialogs } from "../interfaces/dialogs.interfaces";

const initialState: IDialogs = {
  items: [],
  currentDialogId: window.location.pathname.split("dialog/")[1],
  isLoading: false,
};

const dialogs = (
  state: IDialogs = initialState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case "DIALOGS:SET_LAST_MESSAGE":
      return {
        ...state,
        items: state.items.map((dialog: IDialogItems) => {
          if (
            dialog._id === action.payload.dialog?._id ||
            dialog._id === action.payload.dialog.toString()
          )
            return {
              ...dialog,
              lastMessage: action.payload,
            };
          return dialog;
        }),
      };
    case "DIALOGS:REMOVE_DIALOG":
      return {
        ...state,
        items: state.items?.filter(
          (dialog: IDialogItems) => dialog._id !== action.payload
        ),
      };
    case "DIALOGS:SET_ITEMS":
      return { ...state, items: action.payload, isLoading: false };
    case "DIALOGS:SET_CURRENT_DIALOG_ID":
      return { ...state, currentDialogId: action.payload };
    case "DIALOGS:SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default dialogs;
