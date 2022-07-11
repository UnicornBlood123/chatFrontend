const initialState = {
  items: [],
};

const attachments = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case "ATTACHMENTS:ADD_FILE":
      return { ...state, items: [...state.items, action.payload] };
    case "ATTACHMENTS:REMOVE_FILE":
      return {
        ...state,
        items: state.items.filter((file: any) => file.id !== action.payload),
      };
    default:
      return state;
  }
};

export default attachments;
