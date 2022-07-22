import {ReactElement} from "react";
import * as S from "./Auth.styles";
import { Route, Routes } from "react-router";
import RegisterForm from "../../modules/RegisterForm";
import LoginForm from "../../modules/LoginForm";
import Paths from "../routes";
import CheckEmailInfo from "../../modules/RegisterForm/components/CheckEmailInfo/CheckEmailInfo";
import { Result } from "antd";

const Auth = () :ReactElement => {
  return (
    <S.AuthSection>
      <div>
        <Routes>
          <Route path={Paths.EMPTY} element={<LoginForm />} />
          <Route path={Paths.LOGIN} element={<LoginForm />} />
          <Route path={Paths.REGISTER} element={<RegisterForm />} />
          <Route path={Paths.VERIFY} element={<CheckEmailInfo />} />
          <Route
            path={Paths.OTHER}
            element={
              <Result status="404" title="404" subTitle="Страница не найдена" />
            }
          />
        </Routes>
      </div>
    </S.AuthSection>
  );
};

export default Auth;
