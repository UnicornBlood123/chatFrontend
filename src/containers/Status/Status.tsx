import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Status as BaseStatus } from "../../components";
import { IState } from "../../redux/interfaces/state.interfaces";
import { IUser } from "../../redux/interfaces/users.interfaces";
import { IDialogItems } from "../../redux/interfaces/dialogs.interfaces";
import { IStatusContainer } from "./Status.interfaces";

const Status = ({ user }: IStatusContainer): ReactElement => {
  const dialogs = useSelector((state: IState) => state.dialogs);
  const { currentDialogId } = dialogs;

  const [currentDialog] = dialogs.items.filter(
    (dialog: IDialogItems) => dialog._id === currentDialogId
  );

  const getPartner = (): IUser => {
    return currentDialog
      ? user._id === currentDialog.partner._id
        ? currentDialog.author
        : currentDialog.partner
      : user;
  };

  return (
    currentDialog && (
      <BaseStatus
        online={getPartner().isOnline}
        fullname={getPartner().fullname}
      />
    )
  );
};

export default Status;
