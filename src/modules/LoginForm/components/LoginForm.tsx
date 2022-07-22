import { ReactElement } from "react";
import { Form, Input } from "antd";
import * as S from "./LoginForm.styles";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";
import validateField from "../../../utils/validateField";
import { Button } from "../../../components";
import Paths from "../../../pages/routes";
import { FormikProps } from "formik";
import { ILoginFormValues } from "./LoginForm.interfaces";

const LoginForm = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}: FormikProps<ILoginFormValues>): ReactElement => {
  return (
    <>
      <S.AuthTop>
        <h2>Войти в аккаунт</h2>
        <p>Пожалуйста, войдите в свой аккаунт</p>
      </S.AuthTop>
      <S.AuthBlock>
        <Form
          onFinish={handleSubmit}
          name="normal_register"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="email"
            validateStatus={validateField("email", touched, errors)}
            help={!touched.email ? "" : errors.email}
            rules={[
              {
                required: true,
                message: "Введите email!",
              },
            ]}
          >
            <Input
              name="email"
              prefix={<MailOutlined />}
              size="large"
              type="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="E-Mail"
            />
          </Form.Item>

          <Form.Item
            name="password"
            help={!touched.password ? "" : errors.password}
            validateStatus={validateField("password", touched, errors)}
            rules={[
              {
                required: true,
                message: "Введите пароль!",
              },
            ]}
          >
            <Input.Password
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={handleSubmit}
              type="primary"
              htmlType="submit"
              size="large"
              disabled={isSubmitting}
            >
              Войти в аккаунт
            </Button>
          </Form.Item>
          <S.Register to={Paths.REGISTER}>Зарегистрироваться</S.Register>
        </Form>
      </S.AuthBlock>
    </>
  );
};

export default LoginForm;
