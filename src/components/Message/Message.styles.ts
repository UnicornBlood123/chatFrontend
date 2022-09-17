import styled, { css, FlattenInterpolation } from "styled-components";
import { Avatar } from "../Avatar/Avatar.styles";
import { ITheme } from "../../theme/theme.interfaces";
import { ChatSidebarButton } from "../../pages/Home/Home.styles";
import { Modal } from "antd";

export const MessageBubble = styled.span`
  display: inline-block;
  white-space: normal;
  word-wrap: break-word;
  max-width: 400px;
  background: ${({ theme: { colors } }): string => colors.blue};
  box-shadow: 0 2px 2px
    ${({ theme: { colors } }): string => colors.bubble_color};
  border-radius: 12px 12px 12px 0;
  padding: 15px;
  margin-bottom: 8px;
`;

export const MessageActionsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MessageActions = styled.div`
  margin-bottom: 8px;
  margin-right: 6px;
`;

export const MessageActionsButton = styled(ChatSidebarButton)`
  visibility: hidden;
  background: none;
  transform: rotate(90deg);
  span {
    font-size: 14px;
  }
`;

export const MessageDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MessageIconRead = styled.div`
  margin-bottom: 8px;
  margin-right: 6px;
`;

export const MessageTyping = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: ${({ theme: { colors } }): string => colors.bright_blue};
    margin: 3px;
    animation: typing 1000ms ease-in-out infinite;
    animation-delay: 3600ms;
  }
  span:nth-child(1) {
    animation-delay: 0ms;
  }
  span:nth-child(2) {
    animation-delay: 333ms;
  }
  span:nth-child(3) {
    animation-delay: 666ms;
  }

  @keyframes typing {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const MessageAttachments = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 8px;
`;

export const ModalStyled = styled(Modal)`
  position: unset;
  padding: 0;
  img {
    width: 100%;
  }
`;

export const MessageAttachmentsItem = styled.div`
  cursor: pointer;
  margin-left: 5px;
  img {
    width: 45px;
    height: 45px;
    border-radius: 8px;
  }
`;

export const MessageText = styled.p`
  line-height: 20px;
  color: ${({ theme: { colors } }): string => colors.white};
`;

export const MessageAvatar = styled.div`
  display: flex;
  flex-direction: column-reverse;

  img,
  ${Avatar} {
    border-radius: 50px;
    height: 33px;
    width: 33px;
    margin-right: 13px;
    margin-bottom: 5px;
  }

  ${Avatar} {
    font-size: 14px;
    line-height: 31px;
  }
`;

export const MessageContent = styled.div`
  display: flex;
  margin-bottom: 20px;
  position: relative;
  &:hover {
    ${MessageActionsButton} {
      visibility: visible;
    }
  }
`;

export const MessageInfo = styled.div``;
export const MessageDivReverse = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MessageDate = styled.span`
  font-size: 12px;
  opacity: 0.4;
`;

export const Message = styled.div<{
  isMe: boolean;
  isTyping: boolean;
  audio: boolean;
  isImage: boolean;
}>`
  padding: 20px;
  padding-bottom: 0;

  ${({ isMe, audio }): FlattenInterpolation<any> =>
    isMe
      ? css`
          display: flex;
          flex-direction: row-reverse;
          ${MessageBubble} {
            background: ${({ theme: { colors } }: ITheme): string =>
              audio ? colors.blue : colors.white};
            border: 1px solid #ececec;
            box-shadow: 0 4px 4px
              ${({ theme: { colors } }: ITheme): string => colors.gray};
            border-radius: 12px 12px 0 12px;
            ${MessageText} {
              color: ${({ theme: { colors } }: ITheme): string => colors.black};
            }
          }
          ${MessageContent} {
            margin-bottom: 0;
            flex-direction: row-reverse;
          }
          ${MessageDivReverse} {
            flex-direction: row-reverse;
          }
          ${MessageDiv} {
            justify-content: right;
          }
          ${MessageAvatar} {
            margin-right: 0;
            margin-left: 13px;
          }
          ${MessageInfo} {
            text-align: right;
          }
          ${MessageAttachmentsItem} {
            margin-left: 0;
            margin-right: 5px;
          }
        `
      : css``}

  ${({ isTyping }): FlattenInterpolation<any> =>
    isTyping
      ? css`
          ${MessageBubble} {
            background-color: ${({ theme: { colors } }: ITheme): string =>
              colors.typing_bubble_color};
          }
        `
      : css``}
      
    ${({ isImage }): FlattenInterpolation<any> =>
    isImage
      ? css`
          ${MessageAttachmentsItem} {
            img {
              width: 150px;
              height: 150px;
              border-radius: 12px;
            }
          }
        `
      : css``}
            
     ${({ audio }): FlattenInterpolation<any> =>
    audio
      ? css`
          ${MessageBubble} {
            width: 280px;
            position: relative;
            overflow: hidden;
          }
        `
      : css``}
`;
