import styled from "styled-components";
import { Link } from "react-router-dom";
import { Block } from "../../../components";

export const Register = styled(Link)`
  display: block;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.1px;
  color: ${({ theme: { colors } }) => colors.dark_grey};
`;

export const AuthBlock = styled(Block)`
  width: 430px;
`;

export const AuthTop = styled.div`
  text-align: center;
  margin-bottom: 50px;
  h2 {
    font-size: 28px;
    margin-bottom: 5px;
  }
  p {
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.1px;
    opacity: 0.5;
  }
`;
