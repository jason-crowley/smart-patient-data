import React from 'react';
import BuilderGroup from './BuilderGroup';
import './Builder.css';

export default function Builder(props) {
  const handleSubmit = e => {
    e.preventDefault();
    alert(formState);
  };

  return (
    <div className="Builder">
      <h1>Builder</h1>
      <form className="BuilderForm" onSubmit={handleSubmit}>
        <BuilderGroup />
        <BuilderGroup />
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
      </form>
    </div>
  );
};
