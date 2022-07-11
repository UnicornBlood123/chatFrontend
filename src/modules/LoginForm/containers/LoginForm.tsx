import LoginForm from "../components/LoginForm";
import { withFormik } from "formik";
import validateForm from "../../../utils/validate";
import { usersActions } from "../../../redux/actions";
import store from "../../../redux/store";

export default withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),

  validate: (values) => {
    const errors = {};

    validateForm({ isAuth: true, errors, values });

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    store
      .dispatch(usersActions.fetchUserLogin(values) as any)
      .then(() => {
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  },

  displayName: "LoginForm",
})(LoginForm);
