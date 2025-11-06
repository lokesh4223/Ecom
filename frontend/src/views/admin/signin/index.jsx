import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { CustomInput } from '@/components/formik';
import { ADMIN_DASHBOARD, ADMIN_SIGNUP } from '@/constants/routes';
import { Field, Form, Formik } from 'formik';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import PropType from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticating, setAuthStatus } from '@/redux/actions/miscActions';
import { signIn } from '@/redux/actions/authActions';
import * as Yup from 'yup';

const AdminSignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid.')
    .required('Email is required.'),
  password: Yup.string()
    .required('Password is required.')
});

const AdminSignIn = ({ history }) => {
  const { isAuthenticating, authStatus } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus
  }));
  const dispatch = useDispatch();

  useScrollTop();
  useDocumentTitle('Admin Sign In | Ecom');

  useEffect(() => () => {
    dispatch(setAuthStatus(null));
    dispatch(setAuthenticating(false));
  }, []);

  const onSignUp = () => history.push(ADMIN_SIGNUP);

  const onSubmitForm = (form) => {
    dispatch(signIn(form.email, form.password, true)); // true indicates admin login
  };

  return (
    <div className="auth-content">
      {authStatus?.success && (
        <div className="loader">
          <h3 className="toast-success auth-success">
            {authStatus?.message}
            <LoadingOutlined />
          </h3>
        </div>
      )}
      {!authStatus?.success && (
        <>
          {authStatus?.message && (
            <h5 className={`text-center ${authStatus?.success ? 'toast-success' : 'toast-error'}`}>
              {authStatus?.message}
            </h5>
          )}
          <div className={`auth ${authStatus?.message && (!authStatus?.success && 'input-error')}`}>
            <div className="auth-main">
              <h3>Admin Sign In to Ecom</h3>
              <div className="auth-wrapper">
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  validateOnChange
                  validationSchema={AdminSignInSchema}
                  onSubmit={onSubmitForm}
                >
                  {() => (
                    <Form>
                      <div className="auth-field">
                        <Field
                          disabled={isAuthenticating}
                          name="email"
                          type="email"
                          label="Email"
                          placeholder="admin@example.com"
                          component={CustomInput}
                        />
                      </div>
                      <div className="auth-field">
                        <Field
                          disabled={isAuthenticating}
                          name="password"
                          type="password"
                          label="Password"
                          placeholder="Your Password"
                          component={CustomInput}
                        />
                      </div>
                      <br />
                      <div className="auth-field auth-action">
                        <button
                          className="button auth-button"
                          disabled={isAuthenticating}
                          type="submit"
                        >
                          {isAuthenticating ? 'Signing In' : 'Sign In'}
                          &nbsp;
                          {isAuthenticating ? <LoadingOutlined /> : <ArrowRightOutlined />}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="auth-message">
            <span className="auth-info">
              <strong>Don&apos;t have an admin account?</strong>
            </span>
            <button
              className="button button-small button-border button-border-gray button-icon"
              disabled={isAuthenticating}
              onClick={onSignUp}
              type="button"
            >
              Create Admin Account
            </button>
          </div>
        </>
      )}
    </div>
  );
};

AdminSignIn.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default AdminSignIn;