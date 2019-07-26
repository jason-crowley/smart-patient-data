import React, { useContext } from 'react';
import { BuilderContext } from '../BuilderContext';
import BuilderQuestion from '../BuilderQuestion';
import './BuilderGroup.css';

export default function BuilderGroup(props) {
  const { linkId, prefix, description, children } = props;
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
        value={description}
        placeholder="Enter text for group description here"
      />
      {children.map(question => {
        return (
          <BuilderQuestion
            key={question.id}
            linkId={question.id}
            groupId={linkId}
            prefix={question.prefix}
            description={question.description}
            handleDelete={() =>
              dispatch({
                itemType: 'question',
                type: 'remove',
                groupId: linkId,
                id: question.id
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
