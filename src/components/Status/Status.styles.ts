import styled, { css, FlattenInterpolation } from "styled-components";
import { ITheme } from "../../theme/theme.interfaces";

export const Status = styled.span<{ isOnline: boolean }>`
  position: relative;
  display: inline-block;
  margin-left: 6px;
  &::before {
    position: absolute;
    top: 5px;
    left: -11px;
    display: block;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 30px;
    background-color: ${({ theme: { colors } }): string => colors.dark_grey};
  }
  ${({ isOnline }): FlattenInterpolation<any> =>
    isOnline
      ? css`
          &::before {
            background-color: ${({ theme: { colors } }: ITheme): string =>
              colors.green};
          }
        `
      : css``}
`;

export const UserName = styled.b`
  font-weight: 500;
  display: block;
  margin-bottom: 5px;
`;

export const ChatDialogHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid
    ${({ theme: { colors } }): string => colors.bright_grey};
`;

export const ChatDialogHeaderCenter = styled.div`
  text-align: center;
`;
