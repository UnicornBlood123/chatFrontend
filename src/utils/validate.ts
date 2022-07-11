import { FormValues } from "../modules/RegisterForm/components/RegisterForm/RegisterForm.interfaces";

interface Interface {
  isAuth: boolean;
  errors: FormValues;
  values: FormValues;
}

const validate = ({ isAuth, errors, values }: Interface) => {
  const rules = {
    email: (errors: FormValues, value: string) => {
      if (!isAuth && !value) {
        errors.email = "Введите email";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errors.email = "Неверный email";
      }
    },
    password: (errors: FormValues, value: string) => {
      if (!isAuth && !value) {
        errors.password = "Введите пароль";
      } else if (
        !isAuth &&
        !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{8,}/g.test(value)
      ) {
        errors.password = "Слишком лёгкий пароль";
      }
    },
    password2: (errors: FormValues, value: string) => {
      if (!isAuth && !value) {
        errors.password2 = "Введите пароль";
      } else if (!isAuth && value !== values.password) {
        errors.password2 = "Пароли не совпадают";
      }
    },
    fullname: (errors: FormValues, value: string) => {
      if (!isAuth && !value) {
        errors.fullname = "Введите имя и фамилию";
      }
    },
  };

  Object.keys(values).forEach(
    (key) =>
      (rules as any)[key] && (rules as any)[key](errors, (values as any)[key])
  );
};

export default validate;
