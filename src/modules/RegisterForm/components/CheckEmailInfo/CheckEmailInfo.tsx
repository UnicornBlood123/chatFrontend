import { ReactElement, useEffect, useState } from "react";
import * as S from "./CheckEmailInfo.styles";
import { usersApi } from "../../../../api";
import { Button } from "../../../../components";
import Paths from "../../../../pages/routes";
import { useNavigate } from "react-router";
import { ITextInfo, IVerifyStatus } from "./CheckEmailInfo.interfaces";

const renderTextInfo = ({ verified, checking }: IVerifyStatus): ITextInfo => {
  return checking
    ? verified
      ? {
          status: "success",
          title: "Готово!",
          message: "Аккаунт успешно подтвержден!",
        }
      : {
          status: "error",
          title: "Ошибка",
          message: "Вы указали несуществующий или неверный хеш",
        }
    : {
        status: "info",
        title: "Подтвердите почту",
        message: "Ссылка с подтверждением аккаунта отправлена на E-Mail",
      };
};

const CheckEmailInfo = (): ReactElement => {
  const navigate = useNavigate();
  const [, hash] = window.location.search.split("?hash=");
  const [verified, setVerified] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(Boolean(hash));
  const [info, setInfo] = useState(
    renderTextInfo({ hash, checking, verified })
  );

  const setStatus = ({ checking, verified }: IVerifyStatus): void => {
    setInfo(renderTextInfo({ hash, checking, verified }));
    setVerified(verified);
    setChecking(checking);
  };

  const navigateToLogin = (): void => {
    navigate(Paths.LOGIN);
  };

  useEffect(() => {
    if (hash) {
      usersApi
        .verifyHash(hash)
        .then(() => {
          setStatus({ verified: true, checking: true });
        })
        .catch(() => {
          setStatus({ verified: false, checking: true });
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
            <S.InfoCircleTwoToneStyled />
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
