import { ReactElement } from "react";
import * as S from "./Status.styles";
import { IStatusComponent } from "./Status.interfaces";

const Status = ({ online, fullname }: IStatusComponent): ReactElement => {
  return (
    <S.ChatDialogHeader>
      <S.ChatDialogHeaderCenter>
        <S.UserName>{fullname}</S.UserName>
        <S.Status isOnline={online}>{online ? "онлайн" : "офлайн"}</S.Status>
      </S.ChatDialogHeaderCenter>
    </S.ChatDialogHeader>
  );
};

export default Status;
