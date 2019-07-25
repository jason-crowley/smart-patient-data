import React from 'react';
import HeaderNav from './HeaderNav';
import './Header.css';

export default function Header(props) {
  return (
    <header className="Header">
      <HeaderNav children={props.children} />
    </header>
  );
};
