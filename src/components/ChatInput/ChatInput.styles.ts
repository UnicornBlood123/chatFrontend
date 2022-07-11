import styled from "styled-components";
import { Button, Input } from "antd/lib";
import { CameraOutlined } from "@ant-design/icons/lib/icons";

export const ChatInputRecording = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;

export const ChatRecordStatus = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const ChatButton = styled(Button)`
  border: 0;
  box-shadow: none;
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
    color: ${({ theme: { colors } }) => colors.black};
  }
  span {
    font-size: 20px;
  }
`;

export const ChatInputSend = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  width: 20px;
`;

export const ChatInputSmile = styled.div`
  position: relative;
  bottom: 3px;
  align-self: end;
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

export const ChatButtonSmile = styled(Button)`
  width: 20px;
  border: 0;
  box-shadow: none;
  opacity: 0.6;
  transition: opacity 0.15s ease-in-out;
  &:after {
    display: none;
  }
  &:hover,
  &:focus,
  &:active {
    opacity: 1;
    color: ${({ theme: { colors } }) => colors.black};
  }
  span {
    font-size: 20px;
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

export const UploadFiels = styled.div`
  input[type="file"],
  input[type="file"]::-webkit-file-upload-button {
    cursor: pointer;
  }
  &:hover {
    span {
      opacity: 1;
      color: ${({ theme: { colors } }) => colors.black};
    }
  }
`;

export const ChatInputText = styled(Input.TextArea)``;

export const CameraOutlinedStyled = styled(CameraOutlined)`
  opacity: 0.6;
  font-size: 20px;
`;

export const ChatInputActions = styled.div`
  position: relative;
  bottom: 3px;
  align-self: end;
  display: flex;
  align-items: center;
  margin-left: 15px;
  justify-content: space-between;
  width: 60px;
  }
`;

export const Emoji = styled.div<{
  emojiPickerVisible: boolean;
}>`
  position: absolute;
  bottom: 70px;
  z-index: 1;
  display: ${(props) => (props.emojiPickerVisible ? "" : "none")};
`;

export const iframeStyled = styled.iframe`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
`;
