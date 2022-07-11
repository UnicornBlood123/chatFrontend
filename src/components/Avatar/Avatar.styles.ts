import styled from "styled-components";

export const Avatar = styled.div<{ lightenColor: string; color: string }>`
  background: linear-gradient(
    135deg,
    ${(props) => props.color} 0%,
    ${(props) => props.lightenColor} 96.52%
  );
  border-radius: 50%;
  color: ${({ theme: { colors } }) => colors.white};
  height: 100%;
  width: 100%;
  text-align: center;
  font-weight: 600;
  line-height: 38px;
  font-size: 18px;
`;
