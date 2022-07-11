import styled from "styled-components";
import { Empty } from "antd";
import { Spin } from "antd";

export const Messages = styled.div<{ inputSize: any }>`
  position: relative;
  height: calc(100% - 138px + 80px - ${(props) => props.inputSize}px);
  overflow: auto;
`;

export const EmptyDialog = styled(Empty)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const DownloadMessages = styled(Spin)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
