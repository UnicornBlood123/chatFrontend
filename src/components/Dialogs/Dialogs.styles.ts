import styled from "styled-components";
import Search from "antd/es/input/Search";
import { Spin } from "antd";

export const Dialogs = styled.div`
  height: calc(100% - 138px);
  overflow: auto;
  position: relative;
  padding-bottom: 10px;
`;

export const DialogsSearch = styled(Search)`
  padding: 22px 20px 20px 20px;
  input {
    background-color: ${({ theme: { colors } }) => colors.bright_grey};
    border: 0;
    height: 38px;
    padding: 4px 11px 6px;
  }
  button {
    display: none;
  }
`;

export const DownloadDialogs = styled(Spin)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
