/* eslint-disable */
import ToastNotification from 'commons/ToastNotification';

export const ShowError = ({ id, errorCode, errorTexts, errorUrl, errorMethod }) => {
  // Network error toast expects array of strings
  const errorMessages = errorTexts.map((e) => (e.message ? e.message : e));
  const errors = [];
  errorMessages.map((error) => {
    const errorObj = {
      detail: error
    };
    errors.push(errorObj);
  });
  const errorResponse = {
    status: errorCode,
    errors
  };
  ToastNotification({ errorResponseProp: errorResponse });
};

export const ShowSuccess = ({ text, buttonProp }) => {
  ToastNotification({
    typeProp: 'SUCCESS',
    messageProp: 'Success',
    descriptionProp: text,
    buttonProp
  });
};

export const ShowNormalError = ({ text, buttonProp }) => {
  ToastNotification({ typeProp: 'ERROR', messageProp: 'Error', descriptionProp: text, buttonProp });
};
