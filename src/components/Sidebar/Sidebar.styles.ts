import styled from "styled-components";
import { TeamOutlined } from "@ant-design/icons/lib/icons";
import { ChatButton } from "../ChatInput/ChatInput.styles";

import { Modal } from "antd";

export const ModalStyled = styled(Modal)`
  position: unset;
  padding: 0;

  .ant-modal-close-icon svg {
    fill: ${({ theme: { colors } }): string => colors.black};
  }

  .ant-modal-header {
    background-color: ${({ theme: { colors } }): string =>
      colors.background_modal_color};
    .ant-modal-title {
      color: ${({ theme: { colors } }): string => colors.black};
    }
  }
  .ant-modal-body {
    background-color: ${({ theme: { colors } }): string =>
      colors.background_modal_color};
    .ant-form-item-label label {
      color: ${({ theme: { colors } }): string => colors.black};
    }
  }
  .ant-modal-footer {
    background-color: ${({ theme: { colors } }): string =>
      colors.background_modal_color};
  }
`;

export const TeamOutlinedStyled = styled(TeamOutlined)`
  font-size: 18px;
`;

export const ChatSidebarButton = styled(ChatButton)`
  position: relative;
  left: 5px;
`;

export const ChatSidebar = styled.div`
  background-color: ${({ theme: { colors } }): string => colors.white};
  min-width: 230px;
  border-radius: 20px 0 0 20px;
  width: 30%;
  border-right: 1px solid
    ${({ theme: { colors } }): string => colors.bright_grey};
`;

export const ChatSidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
  height: 58px;
  border-bottom: 1px solid
    ${({ theme: { colors } }): string => colors.bright_grey};
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
