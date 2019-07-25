import React, { useState } from 'react';
import SurveySearchForm from './SurveySearchForm';
import SurveyList from './SurveyList';
import './Surveys.css';

export default function Surveys(props) {
  const [formState, setFormState] = useState({
    search: '',
    sort: '',
    filter: '',
  });

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { search, sort, filter } = formState;
    alert(`Search: ${search}, Sort: ${sort}, Filter: ${filter}`);
  };

  const formControls = {
    ...formState,
    handleChange,
    handleSubmit,
  };

  return (
    <div className="Surveys">
      <h1>Surveys</h1>
      <SurveySearchForm formControls={formControls} />
      <SurveyList />
    </div>
  );
};
