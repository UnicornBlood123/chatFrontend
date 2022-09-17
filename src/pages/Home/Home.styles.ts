import styled from "styled-components";
import { ChatButton } from "../../components/ChatInput/ChatInput.styles";

export const ChatSidebarButton = styled(ChatButton)`
  position: relative;
  left: 5px;
`;

export const Chat = styled.div`
  display: flex;
  height: 100%;
  min-height: 300px;
  padding: 20px 0;
  min-width: fit-content;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 1230px) {
    margin: 0 20px 0;
  }
`;

export const ChatDialog = styled.div`
  position: relative;
  background-color: ${({ theme: { colors } }): string => colors.white};
  border-radius: 0 20px 20px 0;
  display: flex;
  flex-direction: column;
  min-width: 480px;
  width: 100%;
`;
