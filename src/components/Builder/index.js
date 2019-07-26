import React, { useReducer } from 'react';
import BuilderGroup from './BuilderGroup';
import './Builder.css';

const initialState = [
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
];

function reducer(state, action) {
  switch (action.itemType) {
    case 'group': {
      const [newState, newGroup] = itemReducer(state, action);
      if (newGroup) newGroup.questions = [];
      return newState;
    }
    case 'question': {
      const newState = [...state];
      const group = newState.find(group => group.id === action.groupId);
      const [newQuestions] = itemReducer(group.questions, action);
      group.questions = newQuestions;
      return newState;
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
  const [formState, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = e => {
    e.preventDefault();
    alert(formState);
  };

  return (
    <div className="Builder">
      <h1>Builder</h1>
      <form className="BuilderForm" onSubmit={handleSubmit}>
        {formState.map(group => {
          const { id, prefix, description, questions } = group;
          return (
            <BuilderGroup
              key={id}
              linkId={id}
              prefix={prefix}
              description={description}
              dispatch={dispatch}
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
  );
};
