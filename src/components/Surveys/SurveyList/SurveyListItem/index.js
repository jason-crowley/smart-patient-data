import React from 'react';
import './SurveyListItem.css';

function formatDate(date) {
  return date;
}

export default function SurveyListItem(props) {
  const {
    title,
    description,
    date,
    publisher,
    experimental,
  } = props;

  return (
    <li className="list__item">
      <h2>{title}</h2>
      { experimental && <h3 className="experimental">Experimental</h3> }
      <p>{description}</p>
      <p>Created: {formatDate(date)}</p>
      <p>Publisher: {publisher}</p>
      <button>Preview</button>
      <button>Select</button>
    </li>
  );
};
