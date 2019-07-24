import React, { useState } from 'react';
import './Surveys.css';

export default function Surveys(props) {
  // Handle search state
  const [search, setSearch] = useState('');
  const handleChangeSearch = e => {
    setSearch(e.target.value);
  };

  // Handle sort state
  const [sort, setSort] = useState('');
  const handleChangeSort = e => {
    setSort(e.target.value);
  };

  // Handle filter state
  const [filter, setFilter] = useState('');
  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Search: ${search}, Sort: ${sort}, Filter: ${filter}`);
  };

  return (
    <div>
      <h1>Surveys</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__input">
          <label for="search">Search:{' '}</label>
          <input type="text" name="search" value={search} onChange={handleChangeSearch} />
        </div>
        <div className="form__input">
          <label for="sort">Sort By:{' '}</label>
          <input type="text" name="sort" value={sort} onChange={handleChangeSort} />
        </div>
        <div className="form__input">
          <label for="filter">Filter:{' '}</label>
          <input type="text" name="filter" value={filter} onChange={handleChangeFilter} />
        </div>
        <div className="form__input">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
