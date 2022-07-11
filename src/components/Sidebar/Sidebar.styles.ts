import styled from "styled-components";
import { TeamOutlined } from "@ant-design/icons/lib/icons";
import { ChatButton } from "../ChatInput/ChatInput.styles";

import { Modal } from "antd";

export const ModalStyled = styled(Modal)`
  position: unset;
  padding: 0;
`;

export const TeamOutlinedStyled = styled(TeamOutlined)`
  font-size: 18px;
`;

export const ChatSidebarButton = styled(ChatButton)`
  position: relative;
  left: 5px;
`;

export const ChatSidebar = styled.div`
  width: 320px;
  border-right: 1px solid ${({ theme: { colors } }) => colors.bright_grey};
`;

export const ChatSidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
  height: 58px;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.bright_grey};
  div {
    span {
      display: inline-block;
      margin-right: 5px;
    }
  }
`;

export const ChatSidebarDialogs = styled.div`
  height: 100%;
  padding-bottom: 20px;
`;
