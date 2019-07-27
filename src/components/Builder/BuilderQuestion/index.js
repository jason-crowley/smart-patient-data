import React, { useContext } from 'react';
import { BuilderContext } from '../BuilderContext';
import './BuilderQuestion.css';

export default function BuilderQuestion(props) {
  const { linkId, prefix, text } = props;
  const dispatch = useContext(BuilderContext);

  return (
    <div className="BuilderQuestion">
      <div>
        <label>Question {' '}
        <input
          className="BuilderItem__prefix"
          type="text"
          value={prefix || linkId}
        />: {' '}
        </label>
        <input type="text" placeholder="Enter question name here" />
      </div>
      <textarea
        className="BuilderItem__text"
        value={text}
        placeholder="Enter text for question here"
      />
      <button type="button" onClick={() => dispatch({ type: 'remove', linkId })}>
        Remove Question
      </button>
    </div>
  );
};
