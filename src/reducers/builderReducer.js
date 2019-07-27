export default function builderReducer(state, action) {
  const path = action.targetId.split('.');
  // Reverse path array to serve as a stack instead of more inefficient queue
  return pathReducer(state, action, path.reverse());
}

// Find the first survey item in the 'item' array with the given key
// as the whole linkId or as the linkId's suffix (after the '.').
// NOTE: Assumes survey items can be nested no more than one level deep
// (i.e. assumes the form 'key' or 'root.key' for linkId).
function findIndex(key, item) {
  const regex = new RegExp('(^|\\.)' + key + '$');
  return item.findIndex(({ linkId }) => regex.test(linkId));
}

function pathReducer(surveyItem, action, path) {
  const { item } = surveyItem;
  const key = path.pop();
  if (key) {
    const index = findIndex(key, item);
    if (index === -1)
      throw new Error(
        `Could not find item with key '${key}' in array ${JSON.stringify(item)}.`
      );
    const newSurveyItem = pathReducer(item[index], action, path);
    const left = item.slice(0, index);
    const right = item.slice(index + 1);
    // Include newSurveyItem in new item array if not null
    const newItem = (newSurveyItem)
      ? [...left, newSurveyItem, ...right]
      : [...left, ...right];
    return {
      ...surveyItem,
      item: newItem,
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
      // linkId should default to ''
      let { linkId = '', item } = surveyItem;
      linkId += (linkId && '.') + 'next' // Doesn't modify surveyItem
      const newSurveyItem = { linkId, prefix: 'next', text: '', item: [] };
      return {
        ...surveyItem,
        item: [...item, newSurveyItem],
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
