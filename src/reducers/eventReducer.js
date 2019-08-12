export default function eventReducer(state, { key }) {
  const newState = new Set(state);
  if (state.has(key)) {
    newState.delete(key);
    return newState;
  } else {
    return newState.add(key);
  }
};
