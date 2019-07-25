import React from 'react';
import HeaderNav from './HeaderNav';

export default function Header(props) {
  return (
    <header className="header">
      <HeaderNav children={props.children} />
    </header>
  );
};
