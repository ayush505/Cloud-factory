/* eslint-disable */
import moment from 'moment';
import { dateDifferenceDays, getCurrentData, parseDate } from 'commons/Utils';

export const reminingTime = (deadline) => {
  const now = moment();
  const date = moment(deadline);
  now.startOf('day');
  const diff = moment.duration(date.diff(now)).asMinutes();
  return diff;
};

export const remainingDaysCheck = (date) => {
  const diff = reminingTime(date);
  const diffInDays = diff / 1440;
  return diffInDays;
};

export const remainingDaysCheckForDeadline = (deadline) => {
  const diff = reminingTime(deadline);
  if (diff < 0) return 'Expired';
  if (diff < 1440) return 'Today';
  if (diff <= 10 * 1440) return `${diff / 1440} Days Left`;
  return parseDate(deadline, 'DD/MM/yyyy');
};

export const isInXDays = (openDate, xDays = 1) => {
  const diff = reminingTime(openDate);

  if (diff < 1440 * xDays) return true;
  return false;
};
