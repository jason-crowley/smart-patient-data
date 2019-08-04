import { pipe, path, groupBy } from 'ramda';

const getCodeKey = pipe(
  path(['code', 'coding']),
  codings => codings[0],
  coding => coding.system + '|' + coding.code,
);

export default groupBy(getCodeKey);
