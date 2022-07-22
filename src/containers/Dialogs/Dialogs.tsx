import { ReactElement, useEffect, useState } from "react";
import { Dialogs as BasicDialogs } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { dialogsActions, messagesActions } from "../../redux/actions";
import { IState } from "../../redux/interfaces/state.interfaces";
import { IDialogItems } from "../../redux/interfaces/dialogs.interfaces";
import { socket } from "../../core";
import Paths from "../../pages/routes";
import { useNavigate } from "react-router";
import { IDialogsContainer } from "./Dialogs.interfaces";

const Dialogs = ({ user }: IDialogsContainer): ReactElement => {
  const dialogs = useSelector((state: IState) => state.dialogs);
  const [filtered, setFiltered] = useState<IDialogItems[]>([...dialogs.items]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRemoveDialog = (dialogId: string): void => {
    dispatch(dialogsActions.removeDialogById(dialogId) as any);
  };

  const search = (value: string): void => {
    if (dialogs.items.length) {
      setFiltered(
        dialogs.items.filter(
          (dialog: IDialogItems) =>
            dialog.author.fullname
              .toLowerCase()
              .includes(value.toLowerCase().trim()) ||
            dialog.partner.fullname
              .toLowerCase()
              .includes(value.toLowerCase().trim())
        )
      );
    }
  };

  useEffect(() => {
    dispatch(dialogsActions.fetchDialogs() as any);
  }, []);

  useEffect(() => {
    setFiltered(dialogs.items);
  }, [dialogs.items]);

  useEffect(() => {
    socket.on("SERVER:NEW_DIALOG", (dialog: IDialogItems) => {
      dispatch(dialogsActions.fetchDialogs() as any);
      dispatch(messagesActions.fetchMessages(dialog._id) as any);
      navigate(Paths.DIALOG + dialog._id);
    });
    socket.on("SERVER:DIALOG_DELETED", (dialogId) => {
      dispatch(dialogsActions.removeDialogFromState(dialogId));
      navigate(Paths.HOME);
    });
    return () => {
      socket.off("SERVER:NEW_DIALOG");
      socket.off("SERVER:DIALOG_DELETED");
    };
  }, []);

  return (
    <BasicDialogs
      onRemoveDialog={onRemoveDialog}
      isLoading={dialogs.isLoading}
      onSearch={search}
      items={filtered}
      user={user}
      selectDialog={dialogs.currentDialogId}
    />
  );
};

export default Dialogs;
