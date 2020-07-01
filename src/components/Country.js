import React from 'react';
import PropTypes from 'prop-types';

const Country = props => {
  // console.log(props.data);
  const { name, flag, subregion, capital, population, languages } = props.data;

  return (
    <div className="country-card-wrapper">
      <div className="country-card">
        <img className="country-img" src={flag} alt={name} title={name} />

        <div className="card-info">
          <div>
            <strong>Name:</strong> {name}
          </div>
          <div>
            <strong>Subregion:</strong> {subregion}
          </div>
          <div>
            <strong>Capital:</strong> {capital}
          </div>
          <div>
            <strong>Total population:</strong> {population.toLocaleString()}
          </div>
          <div>
            <strong>Languages:</strong> {languages.length}
          </div>
        </div>
      </div>
    </div>
  );
};

Country.propTypes = {
  data: PropTypes.object.isRequired
};

export default Country;
