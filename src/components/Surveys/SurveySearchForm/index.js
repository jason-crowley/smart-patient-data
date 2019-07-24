import React from 'react';

export default function SurveySearchForm(props) {
  const {
    search,
    sort,
    filter,
    handleChangeSearch,
    handleChangeSort,
    handleChangeFilter,
    handleSubmit,
  } = props.formState;

  return (
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
  );
};
