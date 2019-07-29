import Survey from 'models/Survey';
import SurveyItem from 'models/SurveyItem';

export default function builderReducer(state, action) {
  const path = action.targetId.split('.');
  // Reverse path array to serve as a stack instead of more inefficient queue
  return pathReducer(state, action, path.reverse(), Survey);
}

// Find the first survey item in the 'items' array with the given key
// as the whole itemId or as the itemId's suffix (after the '.').
// NOTE: Assumes survey items can be nested no more than one level deep
// (i.e. assumes the form 'key' or 'root.key' for itemId).
function findIndex(key, items) {
  const regex = new RegExp('(^|\\.)' + key + '$');
  return items.findIndex(({ itemId }) => regex.test(itemId));
}

// (item, action, path, constructor) => item (of type constructor.name)
function pathReducer(surveyItem, action, path, constructor) {
  const { items } = surveyItem;
  const key = path.pop();
  if (key) {
    const index = findIndex(key, items);
    if (index === -1)
      throw new Error(
        `Could not find item with key '${key}' in array ${JSON.stringify(items)}.`
      );
    const newSurveyItem = pathReducer(items[index], action, path, SurveyItem);
    const left = items.slice(0, index);
    const right = items.slice(index + 1);
    // Include newSurveyItem in new items array if not null
    const newItems = (newSurveyItem)
      ? [...left, newSurveyItem, ...right]
      : [...left, ...right];
    return new constructor({ ...surveyItem, items: newItems });
    // if (surveyItem.constructor.name === 'Survey') {
    //   return new Survey({ ...surveyItem, items: newItems });
    // } else {
    //   return new SurveyItem({ ...surveyItem, items: newItems });
    // }
  } else {
    return actionReducer(surveyItem, action, constructor);
  }
}

// (item, action, constructor) => item (of type constructor.name)
function actionReducer(surveyItem, action, constructor) {
  const { type } = action;
  switch (type) {
    case 'add':
      // In the case that surveyItem === state,
      // itemId should default to ''
      let { itemId = '', items } = surveyItem;
      itemId += (itemId && '.') + 'next' // Doesn't modify surveyItem
      return new constructor({
        ...surveyItem,
        items: [...items, new SurveyItem({ type: 'question', itemId, label: 'next' })],
      });
    case 'change':
      const { name, value } = action.payload;
      return new constructor({ ...surveyItem, [name]: value });
    case 'remove':
      return null;
    default:
      throw new Error(
        `Could not perform action of type '${type}' on ${JSON.stringify(surveyItem)}.`
      );
  }
}
