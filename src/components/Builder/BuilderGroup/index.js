import React, { useContext } from 'react';
import { BuilderContext } from '../BuilderContext';
import BuilderQuestion from '../BuilderQuestion';
import './BuilderGroup.css';

export default function BuilderGroup({ itemId, label, text, items }) {
  const dispatch = useContext(BuilderContext);

  const handleAddQuestion = () => dispatch({ type: 'add', targetId: itemId });
  const handleRemoveGroup = () => dispatch({ type: 'remove', targetId: itemId });
  const handleChange = e => {
    const { name, value } = e.target;
    const payload = { name, value };
    dispatch({ type: 'change', targetId: itemId, payload });
  };

  return (
    <div className="BuilderGroup">
      <div>
        <label>Group {' '}
          <input
            className="BuilderItem__label"
            type="text"
            name="label"
            value={label}
            placeholder={itemId}
            onChange={handleChange}
          />: {' '}
        </label>
      </div>
      <textarea
        className="BuilderItem__text"
        name="text"
        value={text}
        placeholder="Enter text for group name or description here"
        onChange={handleChange}
      />
      {items.map(question => (
        <BuilderQuestion
          {...question}
          key={question.itemId}
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
