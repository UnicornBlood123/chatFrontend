import { ReactElement } from "react";
import * as S from "./Button.styles";

const Button = (props: any): ReactElement => {
  return props.size === "large" ? (
    <S.LargeButton {...props} />
  ) : (
    <S.BaseButton {...props} />
  );
};

export default Button;
