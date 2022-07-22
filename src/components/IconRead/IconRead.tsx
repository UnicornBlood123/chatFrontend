import { ReactElement } from "react";
import * as S from "./IconRead.styles";
import readSvg from "../../assets/img/Checked.svg";
import noReadSvg from "../../assets/img/Check.svg";
import { IIconReadComponent } from "./IconRead.interfaces";

const IconRead = ({ isRead }: IIconReadComponent): ReactElement => {
  return isRead ? (
    <S.IconMessageRead src={readSvg} alt="Read icon" />
  ) : (
    <S.IconMessageNoRead src={noReadSvg} alt="No read icon" />
  );
};

export default IconRead;
