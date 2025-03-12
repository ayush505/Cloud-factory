import React from 'react';
import BlurLoginForm from './BlurLoginForm';
import BlurContent from './BlurContent';
import BlurLoginText from './BlurLoginText';

function BlurContentWrapper(props) {
  const {
    showLoginForm = false,
    showLoginPopup = false,
    type = '',
    hideFirstColOfTable = true,
    isLoggedInUser,
    loginAction
  } = props;
  if (!isLoggedInUser && showLoginForm) {
    return <BlurLoginForm {...props} isLoggedInUser={isLoggedInUser} loginAction={loginAction} />;
  }

  return (
    <>
      <BlurContent {...props} isLoggedIn={isLoggedInUser} />
      {!isLoggedInUser && showLoginPopup && (
        <BlurLoginText
          top={type === 'table' ? '75%' : '50%'}
          left={type === 'table' && !hideFirstColOfTable ? '65%' : '50%'}
        />
      )}
    </>
  );
}

export default BlurContentWrapper;
