import React from 'react';

export default function HeaderNav({ children }) {
  return (
    <nav className="menu">
      <ul className="menu__list">
        {children.map((child, index) =>
          <li className="menu__list-item" key={index}>{child}</li>
        )}
      </ul>
    </nav>
  );
};
