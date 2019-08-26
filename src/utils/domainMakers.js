import moment from 'moment';

// Make default domain around today's date
const makeDefaultDomain = () => ([
  moment().subtract(1, 'days').toDate(),
  new Date(),
]);

// Make domain around given single date
const makeSingleDateDomain = datePoint => ([
  moment(datePoint).subtract(0.5, 'days').toDate(),
  moment(datePoint).add(0.5, 'days').toDate(),
]);

export {
  makeDefaultDomain,
  makeSingleDateDomain,
};
