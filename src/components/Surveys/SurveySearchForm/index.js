import React from 'react';

export default function SurveySearchForm(props) {
  const {
    search,
    sort,
    filter,
    handleChange,
    handleSubmit,
  } = props.formControls;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__input">
        <label htmlFor="search">Search:{' '}</label>
        <input
          type="text"
          name="search"
          value={search}
          placeholder="Search for existing surveys"
          onChange={handleChange}
        />
      </div>
      <div className="form__input">
        <label htmlFor="sort">Sort By:{' '}</label>
        <input type="text" name="sort" value={sort} onChange={handleChange} />
      </div>
      <div className="form__input">
        <label htmlFor="filter">Filter:{' '}</label>
        <input type="text" name="filter" value={filter} onChange={handleChange} />
      </div>
      <div className="form__input">
        <input type="submit" />
      </div>
    </form>
  );
};
