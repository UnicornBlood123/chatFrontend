import React from "react";
import * as S from "./RegisterForm.styles";
import { Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import { validateField } from "../../../../utils/helpers";
import { Button } from "../../../../components";
import Paths from "../../../../pages/routes";
import { FormikProps } from "formik";
import { FormValues } from "./RegisterForm.interfaces";

const RegisterForm = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}: FormikProps<FormValues>) => {
  return (
    <>
      <S.RegisterTop>
        <h2>Регистрация</h2>
        <p>Для входа в чат, вам нужно зарегистрироваться</p>
      </S.RegisterTop>
      <S.RegisterBlock>
        <Form
          onFinish={handleSubmit}
          name="normal_register"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="email"
            validateStatus={validateField("email", touched, errors)}
            help={!touched.email ? "" : errors.email}
            hasFeedback
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
            name="fullname"
            help={!touched.fullname ? "" : errors.fullname}
            validateStatus={validateField("fullname", touched, errors)}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              name="fullname"
              prefix={<UserOutlined className="site-form-item-icon" />}
              size="large"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Ваше имя"
            />
          </Form.Item>

          <Form.Item
            name="password"
            help={!touched.password ? "" : errors.password}
            validateStatus={validateField("password", touched, errors)}
            hasFeedback
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
          <Form.Item
            name="password2"
            help={!touched.password2 ? "" : errors.password2}
            validateStatus={validateField("password2", touched, errors)}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Введите пароль!",
              },
            ]}
          >
            <Input.Password
              name="password2"
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Повторите пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={handleSubmit}
              type="primary"
              htmlType="submit"
              size="large"
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
          <S.Login to={Paths.LOGIN}>Войти в аккаунт</S.Login>
        </Form>
      </S.RegisterBlock>
    </>
  );
};

export default RegisterForm;
