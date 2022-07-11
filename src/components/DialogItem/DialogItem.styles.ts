import styled, { css } from "styled-components";

import {
  IconMessageNoRead,
  IconMessageRead,
} from "../IconRead/IconRead.styles";
import { ITheme } from "../../theme/theme.interfaces";
import { Link } from "react-router-dom";
import { Avatar } from "../Avatar/Avatar.styles";

export const LinkStyled = styled(Link)`
  color: ${({ theme: { colors } }: ITheme) => colors.black};
  &:hover {
    color: ${({ theme: { colors } }: ITheme) => colors.black};
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
  display: flex;
  flex-direction: column;
  justify-content: end;
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
  ${({ isOnline }) =>
    isOnline &&
    css`
      &::before {
        display: block;
        position: absolute;
        right: 0;
        content: "";
        background-color: ${({ theme: { colors } }: ITheme) => colors.green};
        border-radius: 30px;
        width: 13px;
        height: 13px;
        border: 3px solid ${({ theme: { colors } }: ITheme) => colors.white};
        bottom: -2px;
      }
    `}
`;

export const DialogItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  margin-bottom: 0;
  padding: 10px 20px;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.gray};
    cursor: pointer;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${({ theme: { colors } }: ITheme) =>
        colors.background_color};
    `};
`;

export const DialogItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DialogItemInfoTop = styled.div`
  display: flex;
  b {
    font-weight: 500;
    font-size: 14px;
    flex: 1;
    margin-bottom: 6px;
  }
  span {
    opacity: 0.5;
  }
`;

export const DialogItemInfoBottom = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  p {
    opacity: 0.75;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 180px;
    height: 1.08em;
    white-space: nowrap;
  }
`;

export const DialogItemMessageUnreadCount = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  background: ${({ theme: { colors } }) => colors.red};
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.white};
  border-radius: 30px;
  width: 100%;
  min-width: 18px;
  max-width: 25px;
  height: 18px;
  font-size: 11px;
  text-align: center;
  line-height: 17px;
  box-shadow: 0 0 0 3px ${({ theme: { colors } }) => colors.white};
`;
