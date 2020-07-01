import React from 'react';
import PropTypes from 'prop-types';
import {
  SORT_NAME_ASC,
  SORT_NAME_DESC,
  SORT_POPULATION_ASC,
  SORT_POPULATION_DESC,
  EQUAL_COMPARE,
  GREATER_THAN_COMPARE
} from '../constants';

const Filters = ({
  onSortChange,
  selectedSort,
  selectedRegionFilter,
  availableSubregions,
  onRegionFilterChange,
  onLanguageFilterChange,
  selectedLanguagesFilter
}) => {
  return (
    <div className="filters">
      <div className="filter-container">
        <p className="filter-by-text">Sort by:</p>

        <div className="dropdown">
          <div className="dropdown-select">
            <span>{selectedSort || 'Select'}</span> <span className="dropdown-icon">&#x25BC;</span>
          </div>

          <div className="dropdown-options">
            <div className="dropdown-option" onClick={() => onSortChange(SORT_NAME_ASC)}>
              {SORT_NAME_ASC}
            </div>

            <div className="dropdown-option" onClick={() => onSortChange(SORT_NAME_DESC)}>
              {SORT_NAME_DESC}
            </div>

            <div className="dropdown-option" onClick={() => onSortChange(SORT_POPULATION_ASC)}>
              {SORT_POPULATION_ASC}
            </div>

            <div className="dropdown-option" onClick={() => onSortChange(SORT_POPULATION_DESC)}>
              {SORT_POPULATION_DESC}
            </div>
          </div>
        </div>
      </div>

      <div className="filter-container">
        <p className="filter-by-text">Filter by Subregion</p>

        <div className="dropdown">
          <div className="dropdown-select">
            <span>{selectedRegionFilter || 'Select'}</span> <span className="dropdown-icon">&#x25BC;</span>
          </div>

          <div className="dropdown-options">
            {availableSubregions.map(region => {
              return (
                <div className="dropdown-option" onClick={() => onRegionFilterChange(region)} key={region}>
                  {region}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="filter-container">
        <p className="filter-by-text">Filter by # Languages</p>

        <div className="dropdown">
          <div className="dropdown-select">
            <span>{selectedLanguagesFilter || 'Select'}</span> <span className="dropdown-icon">&#x25BC;</span>
          </div>

          <div className="dropdown-options">
            <div className="dropdown-option" onClick={() => onLanguageFilterChange(EQUAL_COMPARE, '1')}>
              1
            </div>

            <div className="dropdown-option" onClick={() => onLanguageFilterChange(EQUAL_COMPARE, '2')}>
              2
            </div>

            <div className="dropdown-option" onClick={() => onLanguageFilterChange(GREATER_THAN_COMPARE, '3+')}>
              3+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Filters.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  selectedSort: PropTypes.string,
  onRegionFilterChange: PropTypes.func.isRequired,
  selectedRegionFilter: PropTypes.string,
  availableSubregions: PropTypes.array.isRequired,
  onLanguageFilterChange: PropTypes.func.isRequired
};

Filters.defaultProps = {
  selectedSort: null,
  selectedRegionFilter: null
};

export default Filters;
