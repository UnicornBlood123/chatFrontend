import React, { useEffect, useState } from "react";
import * as S from "./CheckEmailInfo.styles";
import InfoCircleTwoTone from "@ant-design/icons/lib/icons/InfoCircleTwoTone";
import { usersApi } from "../../../../utils/api";
import { Button } from "../../../../components";
import Paths from "../../../../pages/routes";
import { useNavigate } from "react-router";

const renderTextInfo = ({ hash, verified }: any) => {
  if (hash) {
    if (verified) {
      return {
        status: "success",
        title: "Готово!",
        message: "Аккаунт успешно подтвержден!",
      };
    } else {
      return {
        status: "error",
        title: "Ошибка",
        message: "Вы указали несуществующий или неверный хеш",
      };
    }
  } else {
    return {
      status: "info",
      title: "Подтвердите почту",
      message: "Ссылка с подтверждением аккаунта отправлена на E-Mail",
    };
  }
};

const CheckEmailInfo = () => {
  const navigate = useNavigate();
  const hash = window.location.search.split("?hash=")[1];
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(!!hash);
  const [info, setInfo] = useState(
    renderTextInfo({ hash, checking, verified })
  );

  const setStatus = ({ checking, verified }: any) => {
    setInfo(renderTextInfo({ hash, checking, verified }));
    setVerified(verified);
    setChecking(checking);
  };

  const navigateToLogin = () => {
    navigate(Paths.LOGIN);
  };

  useEffect(() => {
    if (hash) {
      usersApi
        .verifyHash(hash)
        .then(() => {
          setStatus({ verified: true, checking: false });
        })
        .catch(() => {
          setStatus({ verified: false, checking: false });
        });
    }
  }, []);

  return (
    <>
      <S.RegisterTop>
        <h2>Регистрация</h2>
        <p>Для входа в чат, вам нужно зарегистрироваться</p>
      </S.RegisterTop>
      <S.RegisterBlock>
        <S.SuccessBlock>
          <div>
            <InfoCircleTwoTone style={{ fontSize: "48px" }} />
          </div>
          {!verified && info.status !== "error" ? (
            <>
              <h2>Подтвердите свой аккаунт</h2>
              <p>
                На Вашу почту отправлено письмо с ссылкой на подтверждение
                аккаунта.
              </p>
            </>
          ) : info.status === "error" ? (
            <>
              <h2>{info.title}</h2>
              <p>{info.message}</p>
            </>
          ) : (
            <>
              <h2>{info.title}</h2>
              <p>{info.message}</p>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={navigateToLogin}
              >
                Войти
              </Button>
            </>
          )}
        </S.SuccessBlock>
      </S.RegisterBlock>
    </>
  );
};

export default CheckEmailInfo;
