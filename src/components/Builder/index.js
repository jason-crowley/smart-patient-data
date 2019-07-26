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

function reducer(state, action) {
  const items = state.item;
  switch (action.itemType) {
    case 'group': {
      const newGroups = itemReducer(items, action);
      return { ...state, item: newGroups };
    }
    case 'question': {
      const newItems = [...items];
      const group = newItems.find(group => group.linkId === action.groupId);
      const newQuestions = itemReducer(group.item, action);
      group.item = newQuestions;
      return { ...state, item: newItems };
    }
    default:
      throw new Error(
        `Could not perform action on item type '${action.itemType}'.`
      );
  }
}

// (items, action) => [newItems]
function itemReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const newItem = { linkId: 'next', prefix: 'next', text: '', item: [], };
      return [...items, newItem];
    }
    case 'remove': {
      const newItems = [...items];
      const index = newItems.findIndex(item => item.linkId === action.id);
      if (index !== -1) newItems.splice(index, 1);
      return newItems;
    }
    default:
      throw new Error(`Could not perform action of type '${action.type}'.`);
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
          <button
            type="button"
            onClick={() => dispatch({ itemType: 'group', type: 'add' })}
          >
            Add Group
          </button>
          <button>Submit</button>
        </form>
      </div>
    </BuilderContext.Provider>
  );
};
