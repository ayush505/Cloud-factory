export const ELEMENT_TYPE = {
  BUTTON: 'button',
  BUTTON_SUBTYPE_LINK: 'link',
  DROPDOWN: 'dropdown',
  LINK: 'link',
  INPUT: 'input',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  AUTOCOMPLETE: 'autocomplete',
  DATERANGE: 'daterange',
  TAG: 'tag',
  TEXT: 'text',
  NODE: 'node',
  KEYVALUE: 'keyvalue',
  MULTISELECT: 'multiselect',
  MIN_MAX: 'minmax',
  DATE_PICKER: 'datepicker'
};
export const errorMap = {
  400: {
    message: 'Error Found',
    description: 'Please rectify these to proceed.'
  },
  401: {
    message: 'Authorization Failed',
    description:
      "You don't have permission to view this page using the credentials you supplied. Please check it or contact your admin."
  },
  403: {
    message: 'Forbidden',
    description:
      'We are sorry, but you do not have the permission to access this on the server. Please contact your admin.'
  },
  404: {
    message: 'Not Found',
    description: 'Request data not found'
  },
  422: {
    message: 'Error Found',
    description: 'Please rectify these to proceed.'
  },
  500: {
    message: 'Something Went Wrong',
    description:
      'An unexpected error occurred. Please try again or feel free to contact support if problem persists.'
  },
  502: {
    message: 'An Error Occurred',
    description:
      'The server encountered a temporary error and could not complete your request. Please try again in 20 seconds.'
  },
  503: {
    message: 'Service Unavailable',
    description:
      'The server is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later.'
  },
  504: {
    message: 'An Error Occurred',
    description:
      'The server encountered a temporary error and could not complete your request. Please try again in 20 seconds.'
  }
};
