const gstinregex =
  /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;
const panregex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const cinregex = /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;

export const isValidGstin = (val) => {
  return val && gstinregex.test(val);
};

export const isValidPan = (val) => {
  return val && panregex.test(val);
};

export const isValidCin = (val) => {
  return val && cinregex.test(val);
};

export const validate = (values) => {
  const errors = {};
  if (!values.gstin) {
    errors.gstin = 'Enter GSTIN';
  } else if (!gstinregex.test(values.gstin)) {
    errors.gstin = 'Enter the valid GSTIN';
  }
  if (values.cinNumber && !isValidCin(values.cinNumber)) {
    errors.cinNumber = 'Enter Valid CIN';
  }
  return errors;
};
