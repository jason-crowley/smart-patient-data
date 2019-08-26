import moment from 'moment';

const RESOURCE_TYPES = [
  'Observation',
  'MedicationRequest',
  'Condition',
  'Encounter',
];

const DEFAULT_TIME_DOMAIN = [moment().subtract(1, 'days').toDate(), new Date()];

export {
  RESOURCE_TYPES,
  DEFAULT_TIME_DOMAIN,
};
