import { memo, ReactElement } from "react";
import * as S from "./SwitchTheme.styles";

const SwitchTheme = ({
  isDarkTheme,
  lightTheme,
  darkTheme,
  setTheme,
}: any): ReactElement => {
  const onChange = (checked: boolean): void => {
    if (checked) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  return <S.SwitchStyled defaultChecked={isDarkTheme} onChange={onChange} />;
};

export default memo(SwitchTheme);
