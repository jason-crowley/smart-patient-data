import React from 'react';
import './SurveySearchForm.css';

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
        <select
          className={sort ? undefined : 'none'}
          name="sort"
          value={sort}
          onChange={handleChange}
        >
          <option value="">None</option>
          <option value="name">Name (Ascending)</option>
          <option value="name-desc">Name (Descending)</option>
          <option value="date">Date (Newest First)</option>
          <option value="date-desc">Date (Oldest First)</option>
          <option value="pub">Publisher (Ascending)</option>
          <option value="pub-desc">Publisher (Descending)</option>
        </select>
      </div>
      <div className="form__input">
        <label htmlFor="filter">Filter:{' '}</label>
        <select
          className={filter ? undefined : 'none'}
          name="filter"
          value={filter}
          onChange={handleChange}
        >
          <option value="">None</option>
          <option value="expr">Experimental</option>
          <option value="non-expr">Non-experimental</option>
          <option value="crt-after">Created After</option>
          <option value="crt-before">Created Before</option>
        </select>
      </div>
      <div className="form__input">
        <input type="submit" />
      </div>
    </form>
  );
};
