import { pipe, path, groupBy, curry, values, mapObjIndexed, compose } from 'ramda';

// Get code key of a resource in the format 'system|code'
const getCodeKey = pipe(
  path(['code', 'coding']),
  codings => codings[0],
  coding => coding.system + '|' + coding.code,
);

const byCodeKey = groupBy(getCodeKey);

const listFromGrouping = curry(
  // Don't use assoc, deliberately control the order.
  compose(values, mapObjIndexed((v, k) => ({ key: k, grouping: v })))
);

export default compose(listFromGrouping, byCodeKey);
