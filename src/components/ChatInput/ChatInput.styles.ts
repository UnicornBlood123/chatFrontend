import styled from "styled-components";
import { Button, Input } from "antd/lib";

export const ChatInputRecording = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`;

export const ChatRecordStatus = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const ChatButton = styled(Button)`
  border: 0;
  box-shadow: none;
  background: none;
  width: 20px;
  opacity: 0.6;
  transition: opacity 0.15s ease-in-out;
  &:after {
    display: none;
  }
  &:hover,
  &:focus,
  &:active {
    opacity: 1;
    background: none;
    color: ${({ theme: { colors } }): string => colors.black};
  }
  span {
    font-size: 20px;
  }
  span > svg {
    fill: ${({ theme: { colors } }): string => colors.black};
  }
`;

export const ChatInput = styled.div`
  display: flex;
  margin: 20px;
`;

export const ChatInputWithFiles = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

export const ChatInputText = styled(Input.TextArea)`
  background: ${({ theme: { colors } }): string => colors.white};
  color: ${({ theme: { colors } }): string => colors.black};
`;

export const iframeStyled = styled.iframe`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
`;
