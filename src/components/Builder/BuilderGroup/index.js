import React, { useContext } from 'react';
import { BuilderContext } from '../BuilderContext';
import BuilderQuestion from '../BuilderQuestion';
import './BuilderGroup.css';

export default function BuilderGroup(props) {
  const { linkId, prefix, text, item } = props;
  const dispatch = useContext(BuilderContext);

  const handleAddQuestion = () => dispatch({ type: 'add', targetId: linkId });
  const handleRemoveGroup = () => dispatch({ type: 'remove', targetId: linkId });
  const handleChange = e => {
    const { name, value } = e.target;
    const payload = { name, value };
    dispatch({ type: 'change', targetId: linkId, payload });
  };

  return (
    <div className="BuilderGroup">
      <div>
        <label>Group {' '}
        <input
          className="BuilderItem__prefix"
          type="text"
          name="prefix"
          value={prefix}
          placeholder={linkId}
          onChange={handleChange}
        />: {' '}
        </label>
        <input type="text" placeholder="Enter group name here" />
      </div>
      <textarea
        className="BuilderItem__text"
        name="text"
        value={text}
        placeholder="Enter text for group description here"
        onChange={handleChange}
      />
      {item.map(question => (
        <BuilderQuestion
          {...question}
          key={question.linkId}
        />
      ))}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button type="button" onClick={handleRemoveGroup}>
        Remove Group
      </button>
    </div>
  );
};
