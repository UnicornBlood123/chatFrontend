import "antd/dist/antd.min.css";
import { createGlobalStyle } from "styled-components";
import { ITheme } from "./theme/theme.interfaces";

const GlobalStyle = createGlobalStyle`

body{
  background-color: ${({ theme: { colors } }: ITheme): string =>
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

::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
}

::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${({ theme: { colors } }: ITheme): string =>
      colors.dark_grey};
}

`;

export default GlobalStyle;
