import React from 'react';

export default function BuilderQuestion(props) {
  const { linkId, prefix, description, handleDelete } = props;
  return (
    <div className="Question">
      <div>
        <label>Question {' '}
          <input className="Item__prefix" type="text" value={prefix || linkId} />: {' '}
        </label>
        <input type="text" placeholder="Enter question name here" />
      </div>
      <textarea value={description} placeholder="Enter text for question here" />
      <button type="button" onClick={handleDelete}>
        Remove Question
      </button>
    </div>
  );
};
