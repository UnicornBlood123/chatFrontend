import { IRegisterFormValues } from "../modules/RegisterForm/components/RegisterForm/RegisterForm.interfaces";

interface Interface {
  isAuth: boolean;
  errors: IRegisterFormValues;
  values: IRegisterFormValues;
}

const validate = ({ isAuth, errors, values }: Interface): void => {
  const rules = {
    email: (errors: IRegisterFormValues, value: string): void => {
      if (!isAuth && !value) {
        errors.email = "Введите email";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errors.email = "Неверный email";
      }
    },
    password: (errors: IRegisterFormValues, value: string): void => {
      if (!isAuth && !value) {
        errors.password = "Введите пароль";
      } else if (
        !isAuth &&
        !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{8,}/g.test(value)
      ) {
        errors.password = "Слишком лёгкий пароль";
      }
    },
    password2: (errors: IRegisterFormValues, value: string): void => {
      if (!isAuth && !value) {
        errors.password2 = "Введите пароль";
      } else if (!isAuth && value !== values.password) {
        errors.password2 = "Пароли не совпадают";
      }
    },
    fullname: (errors: IRegisterFormValues, value: string): void => {
      if (!isAuth && !value) {
        errors.fullname = "Введите имя и фамилию";
      }
    },
  };

  Object.keys(values).forEach(
    (key) =>
      rules[key as keyof typeof rules] &&
      rules[key as keyof typeof rules](
        errors,
        String(values[key as keyof IRegisterFormValues])
      )
  );
};

export default validate;
