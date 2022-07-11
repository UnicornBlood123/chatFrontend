import React from "react";
import * as S from "./Button.styles";

const Button = (props: any) => {
  return props.size === "large" ? (
    <S.LargeButton {...props} />
  ) : (
    <S.BaseButton {...props} />
  );
};

export default Button;
