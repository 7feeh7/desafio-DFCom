import * as moment from 'moment';

export const setExpiresAt = () => {
  const now = moment();
  const newTime = now.add(60, 'minute');
  return newTime.toDate();
};

export const isExpired = (data: Date) => {
  const now = moment();
  return now.isAfter(moment(data));
};
