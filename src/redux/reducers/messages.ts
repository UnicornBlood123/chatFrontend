import { IMessageItems, IMessages } from "../interfaces/messages.interfaces";

const initialState: IMessages = {
  items: null,
  isLoading: false,
};

const messages = (
  state: IMessages = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "MESSAGES:SET_ITEMS":
      return { ...state, items: action.payload, isLoading: false };
    case "MESSAGES:REMOVE_MESSAGE":
      return {
        ...state,
        items: state.items?.filter(
          (message: IMessageItems) => message._id !== action.payload
        ),
      };
    case "MESSAGES:ADD_MESSAGE":
      return {
        ...state,
        items: [...(state.items as IMessageItems[]), action.payload],
      };
    case "MESSAGES:SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default messages;
