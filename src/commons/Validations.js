/* eslint-disable */
// import { isArray, isNumber } from 'util';

const MAX_SAFE_INTEGER = 9007199254740991;
const BODY_FONT = 12;

export function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

export function isEmpty(obj) {
  return !obj;
}

export function isEmptyObject(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function omit(obj, keys) {
  let newObj;
  for (const name in obj) {
    newObj[name] = obj[name];
  }
  if (isArray(keys)) {
    for (const key in keys) {
      if (newObj[key]) {
        delete newObj.key;
      }
    }
  } else {
    delete newObj.key;
  }

  return newObj;
}

export function get(object, keys, defaultVal) {
  keys = Array.isArray(keys) ? keys : keys.split('.');
  object = object[keys[0]];
  if (object && keys.length > 1) {
    return this.get(object, keys.slice(1));
  }
  return object === undefined ? defaultVal : object;
}

export function range(start, end) {
  const array = [];
  for (let i = start; i < end; i++) {
    array.push(i);
  }
  return array;
}

export function isLength(value) {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
}

export function isEmail(inputText) {
  const email =
    /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(cafe|aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|asia|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  return email.test(inputText);
}

export function isContactNumber(input) {
  const number = /^[789]\d{9}$/;
  return String(input).match(number);
}

// Array must be an array of Objects
// Returns an object of objects having it's key as the provided key.
// For reference, checkout keyBy from Lodash.
export function returnObjectWithSelectedKey(array, key) {
  const obj = {};
  array.forEach((el) => {
    if (el[key]) {
      obj[el[key]] = el;
    }
  });
  return obj;
}

export function inrSeparator(input, fixedPlaces) {
  return input
    ? `₹${parseFloat(input)
        .toFixed(fixedPlaces || 2)
        .replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')}`
    : parseInt(input) == 0
    ? 0
    : '-';
}

export function uppercase(input) {
  return typeof input === 'string' && !!input && input.toUpperCase();
}

export function underscoreless(input) {
  return !!input && input.replace(/_/g, ' ');
}

export function capitalize(input) {
  return typeof input === 'string' && !!input
    ? input.charAt(0).toUpperCase() + input.substr(1)
    : '';
}

export function pxToResponsive(input) {
  if (isNumber(input)) {
    const emInput = input / BODY_FONT;
    return `${emInput}em`;
  }
}

export function absolute(input) {
  if (isNumber(input)) {
    return Math.abs(input);
  }
  return null;
}

export const transformArrayToOptions = (array) => {
  const newarray = [];
  if (!array) {
    return newarray;
  }
  for (let i = 0; i < array.length; i++) {
    const val = array[i];
    newarray.push({
      value: val,
      label: val
    });
  }
  return newarray;
};

export function validateField(fieldName, value, length) {
  switch (fieldName) {
    case 'email':
      return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    case 'number':
      return isNumber(value);
    case 'contact_number':
      return isContactNumber(value);
    case 'fixed_length':
      return value.length === length;
    case 'min_length':
      return value.length > length;
    case 'max_length':
      return value.length < length;
    case 'value_exist':
      return !!value;
    default:
      return null;
  }
}

export function testGstin(input) {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return !!input && regex.test(input);
}

export function testPanNumber(input) {
  const regex = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
  return !!input && regex.test(input);
}

export function parametrizeUrlForArrayParam(key, value) {
  let newParamsString = '';
  if (!!key && !!value) {
    for (let i = 0; i < value.length; i++) {
      newParamsString += `${i === 0 ? '' : '&'}${key}=${value[i]}`;
    }
  }
  return newParamsString;
}

export function isObjectEqual(a, b) {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
}

export const allValueFilled = (capability_definitions) => {
  if (!capability_definitions) {
    return false;
  }
  for (let i = 0; i < capability_definitions.length; i++) {
    const capability_definition = capability_definitions[i];
    const { value } = capability_definition;
    if (capability_definition.units && capability_definition.units.length > 0) {
      const { unit } = capability_definition;
      if (!unit || unit === '') {
        return false;
      }
    }
    if (capability_definition.data_type === 'range') {
      if (!value || !value[0] || !value[1] || value[0] === '' || value[1] === '') {
        return false;
      }
    }
    if (capability_definition.data_type === 'multiple_select') {
      if (!value || !value[0] || value[0] === '') {
        return false;
      }
    }
  }
  return capability_definitions.length !== 0;
};

export const allValueNull = (capability_definitions) => {
  if (!capability_definitions) {
    return false;
  }
  for (let i = 0; i < capability_definitions.length; i++) {
    const capability_definition = capability_definitions[i];
    const { value, unit, units, data_type } = capability_definition;
    if (units && units.length > 0) {
      if (unit && unit !== '') {
        return false;
      }
    }
    if (data_type === 'range') {
      if (value) {
        if ((value[0] || value[1]) && (value[0] !== '' || value[1] !== '')) {
          return false;
        }
      }
    }
    if (data_type === 'multiple_select') {
      if (value && value[0] && value[0] !== '') {
        return false;
      }
    }
  }
  return true;
};
