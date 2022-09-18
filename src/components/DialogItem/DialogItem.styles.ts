import styled, { css, FlattenInterpolation } from "styled-components";
import { ITheme } from "../../theme/theme.interfaces";
import { Link } from "react-router-dom";
import { Avatar } from "../Avatar/Avatar.styles";
import { ChatSidebarButton } from "../../pages/Home/Home.styles";

export const DialogActions = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 9px;
  right: 9px;
  .ant-btn-icon-only.ant-btn-sm {
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
`;

export const DialogActionsButton = styled(ChatSidebarButton)`
  display: block;
  transform: rotate(90deg);
  visibility: hidden;
  &:hover {
    background-color: ${({ theme: { colors } }): string => colors.gray};
  }
  background-color: ${({ theme: { colors } }): string => colors.gray};
`;

export const LinkStyled = styled(Link)`
  position: relative;
  color: ${({ theme: { colors } }: ITheme): string => colors.black};
  &:hover {
    color: ${({ theme: { colors } }: ITheme): string => colors.black};
  }
`;

export const MessageAvatar = styled.div`
  margin-right: 5px;
  img,
  ${Avatar} {
    border-radius: 50px;
    height: 20px;
    width: 20px;
  }

  ${Avatar} {
    font-size: 11px;
    line-height: 20px;
  }
`;

export const MessageText = styled.div`
  flex: 1;
  overflow: hidden;
  margin-right: 5px;
`;

export const DialogItemAvatar = styled.div<{
  isOnline: boolean;
}>`
  position: relative;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  ${({ isOnline }): FlattenInterpolation<any> =>
    isOnline
      ? css`
          &::before {
            display: block;
            position: absolute;
            right: 0;
            content: "";
            background-color: ${({ theme: { colors } }: ITheme): string =>
              colors.green};
            border-radius: 30px;
            width: 13px;
            height: 13px;
            border: 3px solid
              ${({ theme: { colors } }: ITheme): string => colors.white};
            bottom: -2px;
          }
        `
      : css``}
`;

export const DialogItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  margin-bottom: 0;
  padding: 10px 30px 10px 20px;

  &:hover {
    background-color: ${({ theme: { colors } }): string => colors.gray};
    cursor: pointer;
    ${DialogActionsButton} {
      visibility: visible;
      background: none;
    }
  }

  ${({ isSelected }): FlattenInterpolation<any> =>
    isSelected
      ? css`
          background-color: ${({ theme: { colors } }: ITheme): string =>
            colors.background_dialogItem_color};
        `
      : css``};
`;

export const DialogItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  width: 100%;
`;

export const DialogItemInfoTop = styled.div`
  display: flex;
  b {
    flex: 1;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 6px;
  }
  span {
    opacity: 0.5;
  }
`;

export const DialogItemInfoBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  p {
    overflow: hidden;
    opacity: 0.75;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const DialogItemMessageUnread = styled.div`
  background: ${({ theme: { colors } }): string => colors.red};
  font-weight: bold;
  color: ${({ theme: { colors } }): string => colors.white};
  border-radius: 30px;
  width: 11px;
  height: 11px;
  font-size: 11px;
  text-align: center;
  line-height: 17px;
`;
