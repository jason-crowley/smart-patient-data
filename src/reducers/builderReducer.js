function findAtPath(path, builderItem) {
  // Assign the 'item' array from the current builder item
  const { item } = builderItem;
  const _path = [...path];
  const key = _path.shift();
  if (key) {
    // Regex for testing if the last identifier matches the next key
    const regex = new RegExp('(^|\\.)' + key + '$');
    const nextBuilderItem = item.find(({ linkId }) => regex.test(linkId));
    if (!nextBuilderItem) throw new Error(`Could not find key '${key}' in array ${item}.`);
    return findAtPath(_path, nextBuilderItem);
  } else {
    return builderItem;
  }
}

export default function builderReducer(state, action) {
  const newState = { ...state };
  const { type, targetId } = action;
  const path = targetId.split('.');
  switch (type) {
    case 'add': {
      const builderItem = findAtPath(path, newState);
      let { linkId, item } = builderItem;
      linkId += (linkId && '.') + 'next'; // Doesn't modify builderItem
      item.push({ linkId, prefix: 'next', text: '', item: [] });
      return newState;
    }
    case 'change': {
      const { name, value } = action.payload;
      const builderItem = findAtPath(path, newState);
      builderItem[name] = value;
      return newState;
    }
    case 'remove': {
      // Remove the last identifier in the path
      const [last] = path.splice(path.length - 1);
      const { item } = findAtPath(path, newState);
      const regex = new RegExp('(^|\\.)' + last + '$');
      const index = item.findIndex(({ linkId }) => regex.test(linkId));
      if (index === -1) throw new Error(`Could not find key '${last}' in array ${item}.`);
      item.splice(index, 1);
      return newState;
    }
    default:
      throw new Error(`Could not perform action of type '${type}'.`);
  }
}
