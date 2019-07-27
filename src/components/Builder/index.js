import React, { useReducer } from 'react';
import builderReducer from 'reducers/builderReducer';
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

export default function Builder(props) {
  const [builderState, dispatch] = useReducer(builderReducer, initialState);

  const handleAddGroup = () => dispatch({ type: 'add', linkId: '' });
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
          <button type="button" onClick={handleAddGroup}>
            Add Group
          </button>
          <button>Submit</button>
        </form>
      </div>
    </BuilderContext.Provider>
  );
};
