import React from 'react';
import './Builder.css';

export default function Builder(props) {

  return (
    <div className="Builder">
      <h1>Builder</h1>
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
            <input type="text" placeholder="Enter group name here" />
          </div>
          <textarea placeholder="Enter text for question here" />
        </div>
        <button>+ Question</button>
      </div>
      <div className="Group">
        <div>
          <label>Group {' '}
            <input type="number" defaultValue="2" />: {' '}
          </label>
          <input
            type="text"
            defaultValue="Treatment Feedback"
            placeholder="Enter group name here"
          />
        </div>
        <textarea placeholder="Enter text for group description here" />
        <button>+ Question</button>
      </div>
    </div>
  );
};
