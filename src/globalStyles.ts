import "antd/dist/antd.min.css";
import { createGlobalStyle } from "styled-components";
import { ITheme } from "./theme/theme.interfaces";

const GlobalStyle = createGlobalStyle`

body{
  background-color: ${({ theme: { colors } }: ITheme) =>
    colors.background_color};
}

html, body, #root {
    height:100%;
    
  .ant-modal-wrap {
    display: flex;
  }
  .ant-modal {
    align-self: center;
  }
}

* {
    outline: none;
}
`;

export default GlobalStyle;
