import React, { useState } from 'react';

export default function Surveys(props) {
  const [search, setSearch] = useState('');
  const handleChangeSearch = e => {
    setSearch(e.target.value);
  };

  const [sort, setSort] = useState('');
  const handleChangeSort = e => {
    setSort(e.target.value);
  };

  const [filter, setFilter] = useState('');
  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h1>Surveys</h1>
      <form>
        <div>
          <label for="search">Search:{' '}</label>
          <input type="text" name="search" value={search} onChange={handleChangeSearch} />
        </div>
        <div>
          <label for="sort">Sort By:{' '}</label>
          <input type="text" name="sort" value={sort} onChange={handleChangeSort} />
        </div>
        <div>
          <label for="filter">Filter:{' '}</label>
          <input type="text" name="filter" value={filter} onChange={handleChangeFilter} />
        </div>
      </form>
    </div>
  );
}
