import { Navigate } from "react-router";
import Paths from "../../pages/routes";
import * as S from "./PrivateRoute.styles";
import { IPrivateRouteComponent } from "./PrivateRoute.interfaces";
import { ReactElement } from "react";

const PrivateRoute = ({
  component: Component,
  user,
}: IPrivateRouteComponent): ReactElement => {
  return user.isLoading ? (
    <S.DownloadUserData size="large" />
  ) : user.isAuth ? (
    <Component user={user.data} />
  ) : (
    <Navigate to={Paths.LOGIN} />
  );
};

export default PrivateRoute;
