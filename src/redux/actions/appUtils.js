import { ShowNormalError } from 'commons/Notifications/Errors';

export const showErrorForAction = (error) => {
  ShowNormalError({
    text: error.message
  });
};
