import { FormikErrors, FormikTouched } from "formik/dist/types";
import { ILoginFormValues } from "../modules/LoginForm/components/LoginForm.interfaces";
import { IRegisterFormValues } from "../modules/RegisterForm/components/RegisterForm/RegisterForm.interfaces";

const validate = (
  key: string,
  touched: FormikTouched<ILoginFormValues | IRegisterFormValues>,
  errors: FormikErrors<ILoginFormValues | IRegisterFormValues>
): "error" | "success" | "" => {
  if (touched[key as keyof typeof touched]) {
    if (errors[key as keyof typeof errors]) {
      return "error";
    }
    return "success";
  }
  return "";
};

export default validate;
