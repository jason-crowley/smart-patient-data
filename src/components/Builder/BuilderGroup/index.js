import React, { useContext } from 'react';
import { BuilderContext } from '../BuilderContext';
import BuilderQuestion from '../BuilderQuestion';
import './BuilderGroup.css';

export default function BuilderGroup(props) {
  const { linkId, prefix, text, children } = props;
  const dispatch = useContext(BuilderContext);

  return (
    <div className="BuilderGroup">
      <div>
        <label>Group {' '}
          <input
            className="BuilderItem__prefix"
            type="text"
            value={prefix || linkId}
          />: {' '}
        </label>
        <input type="text" placeholder="Enter group name here" />
      </div>
      <textarea
        className="BuilderItem__text"
        value={text}
        placeholder="Enter text for group description here"
      />
      {children.map(question => {
        const { linkId, prefix, text } = question;
        return (
          <BuilderQuestion
            key={linkId}
            linkId={linkId}
            prefix={prefix}
            text={text}
          />
        );
      })}
      <button type="button" onClick={() => dispatch({ type: 'add', linkId })}>
        Add Question
      </button>
      <button type="button" onClick={() => dispatch({ type: 'remove', linkId })}>
        Remove Group
      </button>
    </div>
  );
};
