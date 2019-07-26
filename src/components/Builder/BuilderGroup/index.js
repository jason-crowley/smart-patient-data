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
        return (
          <BuilderQuestion
            key={question.linkId}
            linkId={question.linkId}
            groupId={linkId}
            prefix={question.prefix}
            text={question.text}
            handleDelete={() =>
              dispatch({
                itemType: 'question',
                type: 'remove',
                groupId: linkId,
                id: question.linkId
              })
            }
          />
        );
      })}
      <button
        type="button"
        onClick={() => dispatch({ itemType: 'question', type: 'add', groupId: linkId, })}
      >
        Add Question
      </button>
      <button
        type="button"
        onClick={() => dispatch({ itemType: 'group', type: 'remove', id: linkId })}
      >
        Remove Group
      </button>
    </div>
  );
};
