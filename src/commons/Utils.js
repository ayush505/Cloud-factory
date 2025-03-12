/* eslint-disable */
import moment from 'moment';

const authTokenKey = 'auth_token';
const jwtTokenEnabledKey = 'jwt_token_enabled';
const jwtTokenKey = 'jwt_token';

export const setToken = (authToken) => {
  localStorage.setItem(authTokenKey, authToken);
};

export const confirmLogin = (authToken) => {
  setToken(authToken);
};

export const getAuthToken = () => {
  return localStorage.getItem(authTokenKey);
};

export const parseDate = (date, format = 'MMM D, YYYY') => {
  if (!date) return moment(0).format(format);
  return moment(date).format(format);
};

export const isLoggedIn = () => {
  const authToken = getAuthToken();
  return !!authToken;
};

export const removeToken = () => {
  localStorage.removeItem(authTokenKey);
  localStorage.removeItem(jwtTokenEnabledKey);
};

export const setJwtToken = (jwtToken) => {
  localStorage.setItem(jwtTokenKey, jwtToken);
  var domain = window.location.hostname;
  var subdomain = domain.substr(domain.indexOf('.') + 1);
  document.cookie = `${jwtTokenKey}=${jwtToken};Domain=${subdomain};Path=/;Max-Age=2592000;secure=true;samesite=None;`;
  document.cookie = `source=PH;Domain=${subdomain};Path=/;Max-Age=2592000;secure=true;samesite=None;`;
};

export const getJwtToken = () => {
  return localStorage.getItem(jwtTokenKey);
};

export const setJwtTokenEnabled = () => {
  localStorage.setItem(jwtTokenEnabledKey, true);
};

export const removeUserDetails = () => {
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_full_name');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_id');
  localStorage.removeItem('company_id');
  localStorage.removeItem('jwt_token_enabled');
  localStorage.removeItem('jwt_token');
};
export const setUserDetails = (UserResponse) => {
  localStorage.setItem('user_name', UserResponse.first_name);
  localStorage.setItem('user_full_name', UserResponse.name);
  localStorage.setItem('user_email', UserResponse.email);
  localStorage.setItem('user_role', UserResponse.role);
  localStorage.setItem('user_id', UserResponse.id);
  localStorage.setItem('company_id', UserResponse.company_id);
};

export const getLocalStorageData = (itemKey) => {
  return localStorage.getItem(itemKey);
};

export const getCompanyId = () => {
  return localStorage.getItem('company_id');
};

export function parameterize(inputText) {
  return inputText.toLowerCase().replace(/ /g, '_');
}

export function humanize(inputText) {
  return inputText.replace('_', ' ').toUpperCase();
}

export function splitToWords(inputText) {
  return inputText.replace(/_/g, ' ');
}

export function CapitalizeAllWords(inputText) {
  let result = '';
  let parts = inputText.split(' ');
  result = CapitalizeFirstLetter(parts[0]);
  for (var i = 1; i < parts.length; i++) {
    result += ' ' + CapitalizeFirstLetter(parts[i]);
  }
  return result;
}

export function CapitalizeFirstLetter(inputText) {
  inputText = !!inputText ? inputText.toLowerCase() : null;
  return !!inputText ? inputText.charAt(0).toUpperCase() + inputText.slice(1) : null;
}

export function handleApiErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}

export function action(type, payload = {}) {
  return { type, ...payload };
}

export const rem = (pixels) => {
  return pixels / 16 + 'rem';
};

export const getCurrencyFormattedAmount = (
  amount,
  defaultEmptyText = 'NA',
  currency = 'INR',
  currencyDisplay = 'symbol',
  locale = 'en-IN'
) => {
  if (amount == '0') return defaultEmptyText;
  if (!!amount || amount == 0) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      currencyDisplay,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  }
  return defaultEmptyText;
};

export const getFormattedAmount = (amount, maximumFractionDigits = 6) => {
  if (amount !== undefined && amount !== null) {
    return `₹ ${Number(amount).toLocaleString('en-IN', {
      maximumFractionDigits: maximumFractionDigits
    })}`;
  }
  return '';
};

export const getUnique = (array) => [...new Set(array)];

export const capitalizeUnderscored = (str = '') => {
  var frags = str.split('_');
  for (let i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
};

export const mapTimelines = (timelines) => {
  timelines.map((timeline, index) => {
    if (timeline.timeline_type == 'raw_material') {
      timeline.visited_svg = { raw_material_timeline_done }.raw_material_timeline_done;
      timeline.default_svg = { raw_material };
      timeline.active_svg = { raw_material_timeline_active }.raw_material_timeline_active;
      timeline.text = 'Can the Raw Material be Procured on Time ? ';
    }
    if (timeline.timeline_type == 'production_start') {
      timeline.visited_svg = { production_timeline_done }.production_timeline_done;
      timeline.default_svg = { production_start_default }.production_start_default;
      timeline.active_svg = { production_timeline_active }.production_timeline_active;
      timeline.text = 'Will the Production start on Time  ? ';
    }
    if (timeline.timeline_type == 'quality') {
      timeline.visited_svg = { quality_check_timeline_done }.quality_check_timeline_done;
      timeline.default_svg = { quality_check_timeline_default }.quality_check_timeline_default;
      timeline.active_svg = { quality_check_timeline_active }.quality_check_timeline_active;
      timeline.text = 'Is Quality Check done ? ';
    }
    if (timeline.timeline_type == 'dispatch') {
      timeline.visited_svg = { dispatched_timeline_done }.dispatched_timeline_done;
      timeline.default_svg = { dispatched_timeline_default }.dispatched_timeline_default;
      timeline.active_svg = { dispatched_timeline_active }.dispatched_timeline_active;
      timeline.text = 'Will it be dispatched on time? ';
    }
    if (timeline.timeline_type == 'delivery') {
      timeline.visited_svg = { delivered_timeline_done }.delivered_timeline_done;
      timeline.default_svg = { delivered_timeline_default }.delivered_timeline_default;
      timeline.active_svg = { delivered_timeline_active }.delivered_timeline_active;
      timeline.text = 'Has it been delivered ? ';
    }
    if (timeline.timeline_type == 'production_done') {
      timelines.splice(index, 1);
    }
  });

  return timelines;
};

export const markTimelinesActiveOrVisited = (timelines, dispatchPlan) => {
  for (let index = 0; index < timelines.length; index++) {
    let timeline = timelines[index];
    let qcSkipForAllFlag = true;

    for (
      let dpirIndex = 0;
      dpirIndex < dispatchPlan.dispatch_plan_item_relations.length;
      dpirIndex++
    ) {
      if (
        ('qc_enabled' in dispatchPlan.dispatch_plan_item_relations[dpirIndex].product_details &&
          dispatchPlan.dispatch_plan_item_relations[dpirIndex].product_details.qc_enabled !==
            false) ||
        ('qc_enabled' in
          dispatchPlan.dispatch_plan_item_relations[dpirIndex].product_details
            .product_specifications &&
          dispatchPlan.dispatch_plan_item_relations[dpirIndex].product_details
            .product_specifications.qc_enabled !== false) ||
        (!('qc_enabled' in dispatchPlan.dispatch_plan_item_relations[dpirIndex].product_details) &&
          !(
            'qc_enabled' in
            dispatchPlan.dispatch_plan_item_relations[dpirIndex].product_details
              .product_specifications
          ))
      ) {
        qcSkipForAllFlag = false;
        break;
      }
    }

    if (timeline.timeline_type == 'quality' && index != 0 && timelines[index - 1].visited) {
      if (
        timeline.quality_check_status == 'approved' ||
        timeline.quality_check_status == 'not_required' ||
        qcSkipForAllFlag
      ) {
        timeline.visited = true;
        if (qcSkipForAllFlag) {
          timeline.quality_check_status = 'not_required';
          timeline['qc_skip_for_all'] = true;
        }
      } else {
        timeline.active = true;
        break;
      }
    } else if (timeline.timeline_type == 'quality' && index == 0) {
      if (
        timeline.quality_check_status == 'approved' ||
        timeline.quality_check_status == 'not_required' ||
        qcSkipForAllFlag
      ) {
        timeline.visited = true;
        if (qcSkipForAllFlag) {
          timeline.quality_check_status = 'not_required';
          timeline['qc_skip_for_all'] = true;
        }
      } else {
        timeline.active = true;
        break;
      }
    }

    if (
      timeline.timeline_type == 'dispatch' &&
      index != 0 &&
      timelines[index - 1].visited &&
      dispatchPlan.shipment
    ) {
      timeline.visited = true;
      timeline.active = false;
    } else if (
      timeline.timeline_type == 'dispatch' &&
      index != 0 &&
      timelines[index - 1].visited &&
      !dispatchPlan.shipment
    ) {
      timeline.active = true;
      break;
    }
    if (timeline.status == 'done' && timeline.timeline_type != 'quality') {
      timeline.visited = true;
      timeline.active = false;
    } else if (
      timeline.status == 'open' &&
      timeline.timeline_type != 'quality' &&
      timeline.timeline_type != 'dispatch'
    ) {
      timeline.active = true;
      break;
    } else if (timeline.status == 'expired' && timeline.timeline_type != 'quality') {
      timeline.visited = true;
    }
  }

  return timelines;
};

export const stopPropagation = (event) => (callback) => {
  event.persist();
  event.stopPropagation();
  if (typeof callback === 'function') {
    callback();
  }
};

export const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
};

export const JSONToQueryStringForOldRuby = (obj, prefix) => {
  let str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + '[]' : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === 'object'
          ? JSONToQueryStringForOldRuby(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      );
    }
  }
  return str.join('&');
};

export const JSONToQueryString = (obj, prefix) => {
  let str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + '[' + p + ']' : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === 'object'
          ? JSONToQueryString(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      );
    }
  }
  return str.join('&');
};

export const queryStringToJSON = (qs) => {
  let pairs = qs.split('&');
  let result = {};
  pairs.forEach(function (p) {
    let pair = p.split('=');
    let key = pair[0];
    let value = decodeURIComponent(pair[1] || '');

    if (result[key]) {
      if (Object.prototype.toString.call(result[key]) === '[object Array]') {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  });

  return JSON.parse(JSON.stringify(result));
};

export const formatCurrency = (amount, currency = 'INR', adjustDecimal = false) => {
  if (adjustDecimal) {
    return `${currency} ${amount.toFixed(2) || 0}`;
  }
  return `${currency} ${amount || 0}`;
};

export const floorFigureAmount = (figure, decimals) => {
  if (!decimals) decimals = 2;
  var d = Math.pow(10, decimals);
  return (parseInt(figure * d) / d).toFixed(decimals);
};

export const prettifyCamelCase = (value = '') => {
  let output = '';
  let len = value.length;
  let char;
  let previousChar;
  for (let i = 0; i < len; i++) {
    char = value.charAt(i);
    previousChar = i > 0 ? value.charAt(i - 1) : null;
    if (i == 0) {
      output += char.toUpperCase();
    } else if (
      char !== char.toLowerCase() &&
      char === char.toUpperCase() &&
      previousChar == previousChar.toLowerCase()
    ) {
      output += ' ' + char;
    } else if (char == '-' || char == '_') {
      output += ' ';
    } else {
      output += output[i - 1] == ' ' ? char.toUpperCase() : char;
    }
  }
  return output;
};

export const getFormatedDate = (value) => {
  const date = new Date(value);
  return date;
};

export const dateDifferenceDays = (startDate, endDate) => {
  var now = moment(startDate);
  var end = moment(endDate);
  var duration = moment.duration(now.diff(end));
  var days = duration.asDays();
  console.log(days);
  return days;
};

export const NOTE_TYPE = {
  CREDIT_NOTE: 1,
  DEBIT_NOTE: 2
};

export const NOTE_SUB_TYPE = {
  RATE_CHANGE: 1,
  TAX_CHANGE: 2,
  FREIGHT_CHANGE: 3,
  QUANTITY_CHANGE: 4,
  DISCOUNT_OR_COMPENSATORY_AMOUNT: 5
};

export const dispatch_mode_enum = {
  seller_to_warehouse: 'S - W',
  seller_to_buyer: 'S - B',
  buyer_to_warehouse: 'B - W',
  buyer_to_seller: 'B - S',
  warehouse_to_buyer: 'W - B',
  warehouse_to_seller: 'W - S',
  warehouse_to_warehouse: 'W - W'
};

export const dispatchModesOptions = [
  { label: 'Partner to Buyer (P-B)', value: 'seller_to_buyer' },
  { label: 'Partner to Warehouse (P-W)', value: 'seller_to_warehouse' }
];

export const transporterTypeOptions = [
  { label: 'Seller', value: 'seller' },
  { label: 'Bizongo', value: 'bizongo' }
];

export const regionOptions = [
  { label: 'North', value: 'North' },
  { label: 'South', value: 'South' },
  { label: 'West', value: 'West' }
];

export const po_status_colors = {
  pending: '#0486FF',
  completed: '#0BA968',
  cancelled: '#E7384C',
  short_closed: '#E7384C',
  closed: '#E7384C',
  excess: '#0486FF',
  accepted: '#0BA968',
  rejected: '#E7384C'
};

export const EWAY_BILL_CONFIG = {
  'Andhra Pradesh': { InterState: 50000, IntraState: 50000 },
  'Arunachal Pradesh': { InterState: 50000, IntraState: 50000 },
  Assam: { InterState: 50000, IntraState: 50000 },
  'Andaman u0026 Nicobar Islands': { InterState: 50000, IntraState: 50000 },
  Bihar: { InterState: 50000, IntraState: 100000 },
  Chhattisgarh: { InterState: 50000, IntraState: 50000 },
  Delhi: { InterState: 50000, IntraState: 100000 },
  'New Delhi': { InterState: 50000, IntraState: 100000 },
  Goa: { InterState: 50000, IntraState: 50000 },
  Gujarat: { InterState: 50000, IntraState: 50000 },
  Haryana: { InterState: 50000, IntraState: 50000 },
  'Himachal Pradesh': { InterState: 50000, IntraState: 50000 },
  'Jammu and Kashmir': { InterState: 50000, IntraState: 50000 },
  'Jammu u0026 Kashmir': { InterState: 50000, IntraState: 50000 },
  Jharkhand: { InterState: 50000, IntraState: 50000 },
  Karnataka: { InterState: 50000, IntraState: 50000 },
  Kerala: { InterState: 50000, IntraState: 50000 },
  'Madhya Pradesh': { InterState: 50000, IntraState: 50000 },
  Maharashtra: { InterState: 50000, IntraState: 100000 },
  Manipur: { InterState: 50000, IntraState: 50000 },
  Meghalaya: { InterState: 50000, IntraState: 50000 },
  Mizoram: { InterState: 50000, IntraState: 50000 },
  Nagaland: { InterState: 50000, IntraState: 50000 },
  Odisha: { InterState: 50000, IntraState: 50000 },
  Punjab: { InterState: 50000, IntraState: 50000 },
  Rajasthan: { InterState: 50000, IntraState: 50000 },
  Sikkim: { InterState: 50000, IntraState: 50000 },
  'Tamil Nadu': { InterState: 50000, IntraState: 100000 },
  Telangana: { InterState: 50000, IntraState: 50000 },
  Tripura: { InterState: 50000, IntraState: 50000 },
  'Uttar Pradesh': { InterState: 50000, IntraState: 50000 },
  Uttarakhand: { InterState: 50000, IntraState: 50000 },
  'West Bengal': { InterState: 50000, IntraState: 100000 },
  'Daman & Diu': { InterState: 50000, IntraState: 50000 },
  'Dadra & Nagar Haveli': { InterState: 50000, IntraState: 50000 },
  'Dadra and Nagar Haveli and Daman and Diu': { InterState: 50000, IntraState: 50000 },
  Chandigarh: { InterState: 50000, IntraState: 50000 },
  Lakshdweep: { InterState: 50000, IntraState: 50000 },
  Puducherry: { InterState: 50000, IntraState: 50000 },
  Pondicherry: { InterState: 50000, IntraState: 50000 },
  'Other Territory': { InterState: 50000, IntraState: 50000 }
};

export const getCookie = (cname) => {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

// if you add any additional property please handle for null case else write new function
export const getCurrentData = () => {
  return moment();
};

export const getBeforeCurrentData = (days = 0, type = 'days') => {
  return moment().subtract(days, type);
};

export const getAfterCurrentData = (days = 0, type = 'days') => {
  return moment().add(days, type);
};

export const checkDateForDateRange = (selectedDate, startDate, endDate) => {
  return moment(selectedDate).isBetween(startDate, endDate, 'days', '[]');
};

export const filterDataForDateRange = ({ data = [], dateField = 'date', startDate, endDate }) => {
  const tempData = data.filter((obj) => checkDateForDateRange(obj[dateField], startDate, endDate));

  return tempData;
};

export const timeDifferenceCalculation = (creationTime) => {
  const now = moment();
  const diff = moment.duration(now.diff(moment(creationTime))).asMinutes();
  if (diff < 60) return `${Math.round(diff)} min${Math.round(diff) > 1 ? 's' : ''}`;
  if (diff > 60 && diff < 1440)
    return `${Math.round(diff / 60)} Hr${Math.round(diff / 60) > 1 ? 's' : ''}`;
  if (diff >= 1440 && diff < 1440 * 7) {
    const days = Math.round(diff / 1440);
    if (days < 1) return 'Today';
    if (days < 2) return 'Yesterday';
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  if (diff > 1440 * 7 && diff < 1440 * 30) {
    const weeks = Math.round(diff / (1440 * 7));
    if (weeks < 1) return 'This week';
    if (weeks > 1 < 2) return 'Last week';
    return `${weeks} week${weeks > 1 ? 's' : ''}`;
  }
  if (diff > 1440 * 30 && diff < 1440 * 365) {
    const months = Math.round(diff / (1440 * 30));
    if (months < 1) return 'This month';
    if (months > 1 < 2) return 'Last month';
    return `${months} month${months > 1 ? 's' : ''}`;
  }
  return `${Math.round(diff / (1440 * 365))} year${Math.round(diff / (1440 * 365)) > 1 ? 's' : ''}`;
};

export const getMonthsToYear = (months = 0, defaultEmptyText = 'NA') => {
  const year = Math.floor(months / 12);
  const month = months % 12;

  let returnVal = '';

  if (year) {
    returnVal += year + ' Year';
    if (year > 1) returnVal += 's';
  }
  if (returnVal) returnVal += ' ';
  if (month) {
    returnVal += month + ' Month';
    if (month > 1) returnVal += 's';
  }
  if (returnVal === '') returnVal = defaultEmptyText;
  return returnVal;
};
export const getDaysSuffix = (day = 0, defaultEmptyText = 'NA') => {
  console.log('ashis', day);
  let returnValue = '';
  if (!day) returnValue = defaultEmptyText;
  else {
    returnValue = day + ' day';
    if (day > 1) returnValue += 's';
  }
  return returnValue;
};
