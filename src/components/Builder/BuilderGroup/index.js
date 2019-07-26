import React from 'react';
import BuilderQuestion from '../BuilderQuestion';
import './BuilderGroup.css';

export default function BuilderGroup(props) {
  const { linkId, prefix, description, dispatch, children } = props;

  return (
    <div className="Group">
      <div>
        <label>Group {' '}
          <input className="Item__prefix" type="text" value={prefix || linkId} />: {' '}
        </label>
        <input type="text" placeholder="Enter group name here" />
      </div>
      <textarea
        value={description}
        placeholder="Enter text for group description here"
      />
      {children.map(question => {
        return (
          <BuilderQuestion
            key={question.id}
            linkId={question.id}
            prefix={question.prefix}
            description={question.description}
            dispatch={dispatch}
          />
        );
      })}
      <button
        type="button"
        onClick={() => dispatch({ itemType: 'question', type: 'add', groupId: linkId, })}
      >
        + Question
      </button>
    </div>
  );
};
