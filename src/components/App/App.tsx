import React, { useEffect } from "react";
import * as S from "./App.styles";
import { Auth, Home } from "../../pages";
import { Route, Routes, useNavigate } from "react-router";
import Paths from "../../pages/routes";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/interfaces/state.interfaces";
import { dialogsActions, usersActions } from "../../redux/actions";
import { IUserLogin } from "../../redux/interfaces/users.interfaces";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const App = () => {
  const userLogin: IUserLogin = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(usersActions.fetchUserData() as any);
  }, []);

  useEffect(() => {
    if (userLogin.isAuth && window.location.pathname.includes(Paths.DIALOG)) {
      dispatch(
        dialogsActions.setCurrentDialogId(
          window.location.pathname.split("dialog/")[1]
        ) as any
      );
    } else if (
      (userLogin.isAuth && window.location.pathname === Paths.HOME) ||
      window.location.pathname === Paths.EMPTY
    ) {
      dispatch(dialogsActions.setCurrentDialogId("") as any);
    }
  }, [navigate]);

  return (
    <S.Wrapper>
      <Routes>
        <Route
          path={Paths.EMPTY}
          element={<PrivateRoute user={userLogin} component={Home} />}
        />
        <Route
          path={Paths.HOME}
          element={<PrivateRoute user={userLogin} component={Home} />}
        />
        <Route
          path={Paths.DIALOGID}
          element={<PrivateRoute user={userLogin} component={Home} />}
        />
        <Route path={Paths.OTHER} element={<Auth />} />
      </Routes>
    </S.Wrapper>
  );
};

export default App;
