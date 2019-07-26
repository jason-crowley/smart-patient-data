import React from 'react';
import './BuilderGroup.css';

export default function BuilderGroup(props) {
  return (
    <div className="Group">
      <div>
        <label>Group {' '}
          <input type="number" defaultValue="1" />: {' '}
        </label>
        <input type="text" placeholder="Enter group name here" />
      </div>
      <textarea placeholder="Enter text for group description here" />
      <div className="Question">
        <div>
          <label>Question {' '}
            <input type="number" defaultValue="1" />: {' '}
          </label>
          <input type="text" placeholder="Enter question name here" />
        </div>
        <textarea placeholder="Enter text for question here" />
      </div>
      <button>+ Question</button>
    </div>
  );
};
