import React, { useContext } from 'react';
import { BuilderContext } from '../BuilderContext';
import './BuilderQuestion.css';

export default function BuilderQuestion(props) {
  const { linkId, prefix, text } = props;
  const dispatch = useContext(BuilderContext);

  const handleRemoveQuestion = () => dispatch({ type: 'remove', linkId });
  const handleChange = e => {
    const { name, value } = e.target;
    const payload = { name, value };
    dispatch({ type: 'change', linkId, payload });
  };

  return (
    <div className="BuilderQuestion">
      <div>
        <label>Question {' '}
        <input
          className="BuilderItem__prefix"
          type="text"
          name="prefix"
          value={prefix}
          placeholder={linkId}
          onChange={handleChange}
        />: {' '}
        </label>
        <input type="text" placeholder="Enter question name here" />
      </div>
      <textarea
        className="BuilderItem__text"
        name="text"
        value={text}
        placeholder="Enter text for question here"
        onChange={handleChange}
      />
      <button type="button" onClick={handleRemoveQuestion}>
        Remove Question
      </button>
    </div>
  );
};
