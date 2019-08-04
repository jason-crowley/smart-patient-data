import { pipe, path, groupBy } from 'ramda';

const getKey = pipe(
  path(['code', 'coding']),
  codings => codings[0],
  coding => coding.system + '|' + coding.code,
);

const groupByKey = groupBy(getKey);

export default groupByKey;
