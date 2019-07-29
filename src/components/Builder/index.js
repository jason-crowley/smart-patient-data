import React, { useReducer } from 'react';
import builderReducer from 'reducers/builderReducer';
import { BuilderContext } from './BuilderContext';
import BuilderGroup from './BuilderGroup';
import Survey from 'models/Survey';
import SurveyItem from 'models/SurveyItem';
import './Builder.css';

const initialState = new Survey({
  items: [
    new SurveyItem({
      type: 'group',
      itemId: '1',
      label: '1',
      items: [
        new SurveyItem({
          type: 'question',
          itemId: '1.1',
          label: '1(b)',
        }),
        new SurveyItem({
          type: 'question',
          itemId: '1.2',
          label: '1(g)',
        }),
      ],
    }),
    new SurveyItem({
      type: 'group',
      itemId: '2',
      label: '2A',
      items: [
        new SurveyItem({
          type: 'display',
          itemId: '2.d1',
          text: 'This is just for display!',
        }),
      ],
    }),
  ],
});

export default function Builder(props) {
  const [builderState, dispatch] = useReducer(builderReducer, initialState);

  const handleAddGroup = () => dispatch({ type: 'add', targetId: '' });
  const handleSubmit = e => {
    e.preventDefault();
    alert(JSON.stringify(builderState.toFhir(), null, 2));
  };

  return (
    <BuilderContext.Provider value={dispatch}>
      <div className="Builder">
        <h1>Builder</h1>
        <form className="BuilderForm" onSubmit={handleSubmit}>
          {builderState.items.map(group => (
            <BuilderGroup
              {...group}
              key={group.itemId}
            />
          ))}
          <button type="button" onClick={handleAddGroup}>
            Add Group
          </button>
          <button>Submit</button>
        </form>
      </div>
    </BuilderContext.Provider>
  );
};
