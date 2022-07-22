import styled from "styled-components";

export const Avatar = styled.div<{ lightenColor: string; color: string }>`
  background: linear-gradient(
    135deg,
    ${(props): string => props.color} 0%,
    ${(props): string => props.lightenColor} 96.52%
  );
  border-radius: 50%;
  color: ${({ theme: { colors } }): string => colors.white};
  height: 100%;
  width: 100%;
  text-align: center;
  font-weight: 600;
  line-height: 38px;
  font-size: 18px;
`;
