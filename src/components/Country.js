import React from 'react';
import PropTypes from 'prop-types';

const Country = props => {
  console.log(props.data);
  const { name, flag, subregion, capital, population, languages } = props.data;

  return (
    <div>
      <div>Name: {name}</div>
      <div>
        <img src={flag} alt={name} title={name} height />
      </div>
      <div>Subregion: {subregion}</div>
      <div>Capital: {capital}</div>
      <div>Total population: {population}</div>
      <div>Languages: {languages.length}</div>
    </div>
  );
};

Country.propTypes = {
  data: PropTypes.object.isRequired
};

export default Country;
