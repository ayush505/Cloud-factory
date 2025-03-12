import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import LoginPage from 'commons/LoginPage';
import loginImage from 'resources/images/login_image.svg';

export default function Login() {
  const authData = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();

  const login = (values) => {
    const userName = values['Email Id'];
    const password = values.Password;

    dispatch(actions.login(userName, password));
  };

  const data = {
    rightImage: loginImage,
    className: 'market-place-content',
    actionPending: authData?.requesting || false,
    onAction: login,
    errorMessages: authData?.error ? [authData.error] : []
  };
  return <LoginPage data={data} />;
}
