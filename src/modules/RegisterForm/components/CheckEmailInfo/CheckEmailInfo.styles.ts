import styled from "styled-components";
import {
  AuthBlock,
  AuthTop,
} from "../../../LoginForm/components/LoginForm.styles";
import InfoCircleTwoTone from "@ant-design/icons/lib/icons/InfoCircleTwoTone";

export const SuccessBlock = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 400px;
  h2 {
    font-size: 22px;
    margin-top: 10px;
    line-height: 25px;
  }
  p {
    line-height: 26px;
    margin-top: 14px;
    padding-bottom: 25px;
    color: ${({ theme: { colors } }): string => colors.dark_grey};
  }
`;

export const InfoCircleTwoToneStyled = styled(InfoCircleTwoTone)`
  font-size: 48px;
`;

export const RegisterBlock = styled(AuthBlock)``;

export const RegisterTop = styled(AuthTop)``;
