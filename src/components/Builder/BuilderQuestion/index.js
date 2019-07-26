import React from 'react';

export default function BuilderQuestion(props) {
  const { linkId, prefix, description, dispatch } = props;
  return (
    <div className="Question">
      <div>
        <label>Question {' '}
          <input className="Item__prefix" type="text" value={prefix || linkId} />: {' '}
        </label>
        <input type="text" placeholder="Enter question name here" />
      </div>
      <textarea value={description} placeholder="Enter text for question here" />
    </div>
  );
};
