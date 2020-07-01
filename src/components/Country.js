import React from 'react';
import PropTypes from 'prop-types';

const Country = ({ data, selectedCountry, onCountrySelect }) => {
  const { name, flag, subregion, capital, population, languages, borders, alpha3Code } = data;
  const notBordered = selectedCountry && selectedCountry !== alpha3Code && !borders.includes(selectedCountry);

  return (
    <div className="country-card-wrapper">
      <div className="country-card" style={notBordered ? { opacity: '0.3' } : {}} onClick={() => onCountrySelect(data)}>
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
  data: PropTypes.object.isRequired,
  onCountrySelect: PropTypes.func.isRequired,
  selectedCountry: PropTypes.string
};

Country.defaultProps = {
  selectedCountry: null
};

export default Country;
