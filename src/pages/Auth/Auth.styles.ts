import styled from "styled-components";

export const AuthSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  button {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: ${({ theme: { colors } }) => colors.white};
    width: 100%;
  }
`;
