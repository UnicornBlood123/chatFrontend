import styled from "styled-components";
import { ChatButton } from "../../components/ChatInput/ChatInput.styles";

export const ChatSidebarButton = styled(ChatButton)`
  position: relative;
  left: 5px;
`;

export const Chat = styled.div`
  display: flex;
  height: 100%;
  width: 1140px;
  margin: 0 auto;
  background-color: ${({ theme: { colors } }) => colors.white};
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04204);
`;

export const ChatDialog = styled.div`
  flex: 1;
`;
