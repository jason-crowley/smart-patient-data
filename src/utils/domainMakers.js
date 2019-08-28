import moment from 'moment';

// Make default domain around today's date
const makeDefaultDomain = () => ([
  moment().subtract(1, 'days').toDate(),
  new Date(),
]);

// Make domain around given single date
const makeSingleDateDomain = date => ([
  moment(date).subtract(0.5, 'days').toDate(),
  moment(date).add(0.5, 'days').toDate(),
]);

const makeMultipleDatesDomain = dates => {
  const times = dates.map(date => +date);
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  return [new Date(minTime), new Date(maxTime)];
};

const makeDomainFromDates = dates => {
  return (dates.length === 1)
    ? makeSingleDateDomain(dates[0])
    : (dates.length ? makeMultipleDatesDomain(dates) : makeDefaultDomain())
};

export {
  makeDefaultDomain,
  makeSingleDateDomain,
  makeMultipleDatesDomain,
  makeDomainFromDates,
};
