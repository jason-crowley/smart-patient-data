import React from 'react';
import './HeaderNav.css';

export default function HeaderNav({ children }) {
  return (
    <nav className="HeaderNav">
      <ul className="HeaderNav__list">
        {children.map((child, index) =>
          <li className="HeaderNav__item" key={index}>{child}</li>
        )}
      </ul>
    </nav>
  );
};
