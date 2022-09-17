import "antd/dist/antd.min.css";
import styled from "styled-components";
import "reset-css";

export const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
  color: ${({ theme: { colors } }): string => colors.black};
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-variant: tabular-nums;
`;
