import styled, { css } from "styled-components";

export const Status = styled.span<{ isOnline: boolean }>`
  position: relative;
  display: inline-block;

  &::before {
    position: absolute;
    top: 5px;
    left: -11px;
    display: block;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 30px;
    background-color: ${({ theme: { colors } }) => colors.dark_grey};
  }
  ${({ isOnline }) =>
    isOnline &&
    css`
      &::before {
        background-color: ${({ theme: { colors } }: any) => colors.green};
      }
    `}
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
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.bright_grey};
`;

export const ChatDialogHeaderCenter = styled.div`
  text-align: center;
`;
