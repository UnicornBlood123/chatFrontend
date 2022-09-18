import styled from "styled-components";
import { ChatButton } from "../ChatInput/ChatInput.styles";

export const ChatInputSmile = styled.div`
  position: relative;
  bottom: 3px;
  align-self: end;
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

export const ChatButtonSmile = styled(ChatButton)``;

export const Emoji = styled.div<{
  emojiPickerVisible: boolean;
}>`
  position: absolute;
  bottom: 70px;
  z-index: 1;
  display: ${(props): string => (props.emojiPickerVisible ? "" : "none")};

  .emoji-picker-react,
  .emoji-picker-react input.emoji-search,
  .emoji-picker-react .emoji-group:before {
    background: ${({ theme: { colors } }): string => colors.white};
  }
`;
