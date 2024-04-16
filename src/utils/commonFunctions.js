import moment from 'moment';

export const scoreColor = (value) => {
    if (value < 1) {
      return 'bg-red-400';
    } else if (value >= 1 && value < 2) {
      return 'bg-red-300';
    } else if (value >= 2 && value < 3) {
      return 'bg-green-400';
    } else if (value >= 3 && value < 4) {
      return 'bg-green-500';
    } else if (value >= 4 && value < 5) {
      return 'bg-green-600';
    } else if (value >= 5) {
      return 'bg-green-600';
    } else {
      return '';
    }
};

export const debounce = (func, delay) => {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export const convertUTCToLocal = (utcDate) => {
  const utcDateObj = new Date(utcDate);
  const localTimeMillis = utcDateObj.getTime() + utcDateObj.getTimezoneOffset() * 60 * 1000;
  const localDateObj = new Date(localTimeMillis);
  return moment(localDateObj).format('DD-MM-YYYY')
}

export  const convertToString = (value) =>{
 
  return String(value);
}