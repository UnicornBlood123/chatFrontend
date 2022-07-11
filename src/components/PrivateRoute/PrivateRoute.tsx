import { Navigate } from "react-router";
import Paths from "../../pages/routes";
import * as S from "./PrivateRoute.styles";
import React from "react";
import { IPrivateRouteComponent } from "./PrivateRoute.interfaces";

const PrivateRoute = ({
  component: Component,
  user,
}: IPrivateRouteComponent) => {
  return user.isLoading ? (
    <S.DownloadUserData size="large" />
  ) : user.isAuth ? (
    <Component user={user.data} />
  ) : (
    <Navigate to={Paths.LOGIN} />
  );
};

export default PrivateRoute;
