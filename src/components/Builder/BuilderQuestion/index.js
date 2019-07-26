import React from 'react';
import './BuilderQuestion.css';

export default function BuilderQuestion(props) {
  const { linkId, prefix, text, handleDelete } = props;
  return (
    <div className="BuilderQuestion">
      <div>
        <label>Question {' '}
          <input className="BuilderItem__prefix" type="text" value={prefix || linkId} />: {' '}
        </label>
        <input type="text" placeholder="Enter question name here" />
      </div>
      <textarea
        className="BuilderItem__text"
        value={text}
        placeholder="Enter text for question here"
      />
      <button type="button" onClick={handleDelete}>
        Remove Question
      </button>
    </div>
  );
};
