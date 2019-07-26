import React from 'react';
import './BuilderGroup.css';

export default function BuilderGroup(props) {
  const { linkId, prefix, description, dispatch, children } = props;

  return (
    <div className="Group">
      <div>
        <label>Group {' '}
          <input className="Group__prefix" type="text" value={prefix || linkId} />: {' '}
        </label>
        <input type="text" placeholder="Enter group name here" />
      </div>
      <textarea
        value={description}
        placeholder="Enter text for group description here"
      />
      <pre>
        {JSON.stringify(children, null, 2)}
      </pre>
      {/* <div className="Question"> */}
      {/*   <div> */}
      {/*     <label>Question {' '} */}
      {/*       <input type="number" defaultValue="1" />: {' '} */}
      {/*     </label> */}
      {/*     <input type="text" placeholder="Enter question name here" /> */}
      {/*   </div> */}
      {/*   <textarea placeholder="Enter text for question here" /> */}
      {/* </div> */}
      <button
        type="button"
        onClick={() => dispatch({ itemType: 'question', type: 'add', groupId: linkId, })}
      >
        + Question
      </button>
    </div>
  );
};
