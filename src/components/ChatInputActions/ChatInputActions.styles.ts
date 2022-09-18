import styled from "styled-components";
import { CameraOutlined } from "@ant-design/icons/lib/icons";
import { ChatButton } from "../ChatInput/ChatInput.styles";

export const ChatInputSend = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
`;

export const ChatActionButton = styled(ChatButton)``;

export const UploadFiles = styled.div`
  input[type="file"],
  input[type="file"]::-webkit-file-upload-button {
    cursor: pointer;
  }
  &:hover {
    span {
      opacity: 1;
      color: ${({ theme: { colors } }): string => colors.black};
    }
  }
`;

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
`;
