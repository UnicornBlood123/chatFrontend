import React from "react";
import { useSelector } from "react-redux";
import { Status as BaseStatus } from "../../components";
import { IState } from "../../redux/interfaces/state.interfaces";
import { IUser } from "../../redux/interfaces/users.interfaces";
import { IDialogItems } from "../../redux/interfaces/dialogs.interfaces";
import { IStatusContainer } from "./Status.interfaces";

const Status = ({ user }: IStatusContainer) => {
  const dialogs = useSelector((state: IState) => state.dialogs);
  const currentDialogId = dialogs.currentDialogId;

  if (!currentDialogId || !dialogs.items.length) {
    return null;
  }

  let partner: IUser;

  const currentDialog: IDialogItems = dialogs.items.filter(
    (dialog: IDialogItems) => dialog._id === currentDialogId
  )[0];

  if (!currentDialog) {
    return null;
  }

  if (currentDialog?.author._id === user._id) {
    partner = currentDialog.partner;
  } else {
    partner = currentDialog.author;
  }
  return <BaseStatus online={partner.isOnline} fullname={partner.fullname} />;
};

export default Status;
