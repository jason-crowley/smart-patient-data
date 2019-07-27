import React, { useReducer } from 'react';
import { BuilderContext } from './BuilderContext';
import BuilderGroup from './BuilderGroup';
import './Builder.css';

const initialState = {
  title: '',
  status: 'unknown',
  experimental: false,
  date: new Date().toISOString(),
  publisher: '',
  item: [
    {
      linkId: '1',
      prefix: '1',
      text: '',
      item: [
        {
          linkId: '1.1',
          prefix: '1(b)',
          text: '',
          item: [],
        },
        {
          linkId: '1.2',
          prefix: '1(g)',
          text: '',
          item: [],
        },
      ],
    },
    {
      linkId: '2',
      prefix: '2A',
      text: '',
      item: [],
    },
  ],
};

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

function reducer(state, action) {
  const newState = { ...state };
  const { type, linkId = '' } = action;
  const path = linkId.split('.');
  switch (type) {
    case 'add': {
      const builderItem = findAtPath(path, newState);
      const { linkId: itemId, item } = builderItem;
      item.push({ linkId: `${itemId}.next`, prefix: 'next', text: '', item: [] });
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
      const index = item.findIndex(({ linkId: itemId }) => regex.test(itemId));
      if (index === -1) throw new Error(`Could not find key '${last}' in array ${item}.`);
      item.splice(index, 1);
      return newState;
    }
    default:
      throw new Error(`Could not perform action of type '${type}'.`);
  }
}

export default function Builder(props) {
  const [builderState, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = e => {
    e.preventDefault();
    alert(JSON.stringify(builderState, null, 2));
  };

  return (
    <BuilderContext.Provider value={dispatch}>
      <div className="Builder">
        <h1>Builder</h1>
        <form className="BuilderForm" onSubmit={handleSubmit}>
          {builderState.item.map(group => {
            const { linkId, prefix, text, item } = group;
            return (
              <BuilderGroup
                key={linkId}
                linkId={linkId}
                prefix={prefix}
                text={text}
              >
                {item}
              </BuilderGroup>
            );
          })}
          <button type="button" onClick={() => dispatch({ type: 'add', linkId: '', })}>
            Add Group
          </button>
          <button>Submit</button>
        </form>
      </div>
    </BuilderContext.Provider>
  );
};
