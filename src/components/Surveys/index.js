import React, { useState } from 'react';
import SurveySearchForm from './SurveySearchForm';
import SurveyList from './SurveyList';
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

  const formState = {
    search,
    sort,
    filter,
    handleChangeSearch,
    handleChangeSort,
    handleChangeFilter,
    handleSubmit,
  };

  return (
    <div>
      <h1>Surveys</h1>
      <SurveySearchForm formState={formState} />
      <SurveyList />
    </div>
  );
};
