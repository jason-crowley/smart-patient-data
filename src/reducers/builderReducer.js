export default function builderReducer(state, action) {
  const path = action.targetId.split('.');
  // Reverse path array to serve as a stack instead of more inefficient queue
  return pathReducer(state, action, path.reverse());
}

// Find the first survey item in the 'items' array with the given key
// as the whole itemId or as the itemId's suffix (after the '.').
// NOTE: Assumes survey items can be nested no more than one level deep
// (i.e. assumes the form 'key' or 'root.key' for itemId).
function findIndex(key, items) {
  const regex = new RegExp('(^|\\.)' + key + '$');
  return items.findIndex(({ itemId }) => regex.test(itemId));
}

function pathReducer(surveyItem, action, path) {
  const { items } = surveyItem;
  const key = path.pop();
  if (key) {
    const index = findIndex(key, items);
    if (index === -1)
      throw new Error(
        `Could not find item with key '${key}' in array ${JSON.stringify(items)}.`
      );
    const newSurveyItem = pathReducer(items[index], action, path);
    const left = items.slice(0, index);
    const right = items.slice(index + 1);
    // Include newSurveyItem in new items array if not null
    const newItem = (newSurveyItem)
      ? [...left, newSurveyItem, ...right]
      : [...left, ...right];
    return {
      ...surveyItem,
      items: newItem,
    };
  } else {
    return actionReducer(surveyItem, action);
  }
}

function actionReducer(surveyItem, action) {
  const { type } = action;
  switch (type) {
    case 'add':
      // In the case that surveyItem === state,
      // itemId should default to ''
      let { itemId = '', items } = surveyItem;
      itemId += (itemId && '.') + 'next' // Doesn't modify surveyItem
      const newSurveyItem = { itemId, label: 'next', text: '', items: [] };
      return {
        ...surveyItem,
        items: [...items, newSurveyItem],
      };
    case 'change':
      const { name, value } = action.payload;
      return {
        ...surveyItem,
        [name]: value,
      };
    case 'remove':
      return null;
    default:
      throw new Error(
        `Could not perform action of type '${type}' on ${JSON.stringify(surveyItem)}.`
      );
  }
}
