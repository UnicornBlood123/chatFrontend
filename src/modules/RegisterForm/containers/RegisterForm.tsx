import RegisterForm from "../components/RegisterForm/RegisterForm";
import { withFormik } from "formik";
import validateForm from "../../../utils/validate";
import { usersActions } from "../../../redux/actions";
import store from "../../../redux/store";

export default withFormik({
  mapPropsToValues: () => ({
    email: "",
    fullname: "",
    password: "",
    password2: "",
  }),
  validate: (values) => {
    const errors = {};

    validateForm({ isAuth: false, errors, values });

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    store
      .dispatch(usersActions.fetchUserRegistration(values) as any)
      .then(() => {
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  },

  displayName: "RegisterForm",
})(RegisterForm);
