import moment from "moment";

export const getDates = (selectedDate) => {
  const endDate = moment().format("yyyy-MM-DD");
  let startDate = moment();

  switch (selectedDate) {
    case "1 week":
      startDate = moment(startDate).subtract(7, "days").format("yyyy-MM-DD");
      break;
    case "1 month":
      startDate = moment(startDate).subtract(1, "months").format("yyyy-MM-DD");
      break;
    case "3 months":
      startDate = moment(startDate).subtract(3, "months").format("yyyy-MM-DD");
      break;
    case "1 year":
      startDate = moment(startDate).subtract(1, "years").format("yyyy-MM-DD");
      break;
  }
  return [startDate, endDate];
};

export const composeUrl = (url, startDate, endDate) => {
  return `${url}${startDate}/${endDate}.json`;
};

//fills array with days between startDate and endDate
export const enumerateDates = (startDate, endDate) => {
  const now = moment(startDate);
  const dates = [];
  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format("yyyy-MM-DD"));
    now.add(1, "days");
  }
  return dates;
};

export const getAverage = (data, roundToDecimal = false) => {
  let sum = 0;
  let average = null;
  if (data.length) {
    data.forEach((el) => (sum += el));
    average = roundToDecimal
      ? (sum / data.length).toFixed(1)
      : (sum / data.length).toFixed(0);
  }
  return average;
};

//Generates header title based on text and date selection
export const generateTitleText = (baseText, selectedDate) => {
  if (selectedDate === "1 week") return `${baseText} the last 7 days`;
  if (selectedDate === "1 month") return `${baseText} the last 30 days`;
  if (selectedDate === "3 months") return `${baseText} the last 3 months`;
  if (selectedDate === "1 year") return `${baseText} the last year`;
  else return `${baseText} on ${selectedDate}`;
  return baseText;
};

export const formatDataset = (labels, data, callback) => {
  const array = [];
  labels.forEach((label) => {
    let value = null;
    data.find((object) => {
      //
      value = callback(object, label);
      // if (value === 0) value = null;
      if (value !== null) return true;
      return false;
    });
    array.push(value);
  });
  return array;
};

export const getDataset = (data, startNode) => {
  const array = data[startNode];

  const getData = (callback) => {
    return callback(array);
  };
  return getData;
};
