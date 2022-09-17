import { ReactElement, useContext } from "react";
import * as S from "./SwitchTheme.styles";
import { ThemeContext } from "../../theme/theme";

const SwitchTheme = (): ReactElement => {
  const { isDarkTheme, lightTheme, darkTheme, setTheme }: any =
    useContext(ThemeContext);

  const onChange = (checked: boolean): void => {
    if (checked) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  return <S.SwitchStyled defaultChecked={isDarkTheme} onChange={onChange} />;
};

export default SwitchTheme;
