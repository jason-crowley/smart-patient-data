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
      id: '1',
      prefix: '1',
      description: '',
      questions: [
      {
        id: '1.1',
        prefix: '1(b)',
        description: '',
      },
      {
        id: '1.2',
        prefix: '1(g)',
        description: '',
      },
      ],
    },
    {
      id: '2',
      prefix: '2A',
      description: '',
      questions: [],
    },
  ],
};

function reducer(state, action) {
  const items = state.item;
  switch (action.itemType) {
    case 'group': {
      const [newItems, newGroup] = itemReducer(items, action);
      if (newGroup) newGroup.questions = [];
      return { ...state, item: newItems };
    }
    case 'question': {
      const newItems = [...items];
      const group = newItems.find(group => group.id === action.groupId);
      const [newQuestions] = itemReducer(group.questions, action);
      group.questions = newQuestions;
      return { ...state, item: newItems };
    }
    default:
      throw new Error(
        `Could not perform action on item type '${action.itemType}'.`
      );
  }
}

// (items, action) => [newItems, newItem]
function itemReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const newItem = { id: 'next', prefix: 'next', description: '' };
      const newItems = [...items, newItem];
      return [newItems, newItem];
    }
    case 'remove': {
      const newItems = [...items];
      const index = newItems.findIndex(item => item.id === action.id);
      if (index !== -1) newItems.splice(index, 1);
      return [newItems];
    }
    default:
      throw new Error(`Could not perform action of type '${action.type}'.`);
  }
}

export default function Builder(props) {
  const [builderState, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = e => {
    e.preventDefault();
    alert(builderState);
  };

  return (
    <BuilderContext.Provider value={dispatch}>
      <div className="Builder">
        <h1>Builder</h1>
        <form className="BuilderForm" onSubmit={handleSubmit}>
          {builderState.item.map(group => {
            const { id, prefix, description, questions } = group;
            return (
              <BuilderGroup
                key={id}
                linkId={id}
                prefix={prefix}
                description={description}
              >
                {questions}
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
