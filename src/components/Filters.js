import React from 'react';
import PropTypes from 'prop-types';
import { SORT_NAME_ASC, SORT_NAME_DESC, SORT_POPULATION_ASC, SORT_POPULATION_DESC } from '../constants';

const Filters = ({ onSortChange, selectedSort }) => {
  // Toggle 'selected' class on sort by links
  const selectedSortedClasses = sort => (selectedSort === sort ? 'dropdown-option selected' : 'dropdown-option');

  return (
    <div className="filters">
      <h3>Sort by:</h3>

      <div className="dropdown">
        <div className="dropdown-select">
          <span>{selectedSort || 'Select'}</span> <span className="dropdown-icon">&#x25BC;</span>
        </div>

        <div className="dropdown-options">
          <div className={selectedSortedClasses(SORT_NAME_ASC)} onClick={() => onSortChange(SORT_NAME_ASC)}>
            {SORT_NAME_ASC}
          </div>

          <div className={selectedSortedClasses(SORT_NAME_DESC)} onClick={() => onSortChange(SORT_NAME_DESC)}>
            {SORT_NAME_DESC}
          </div>

          <div className={selectedSortedClasses(SORT_POPULATION_ASC)} onClick={() => onSortChange(SORT_POPULATION_ASC)}>
            {SORT_POPULATION_ASC}
          </div>

          <div
            className={selectedSortedClasses(SORT_POPULATION_DESC)}
            onClick={() => onSortChange(SORT_POPULATION_DESC)}
          >
            {SORT_POPULATION_DESC}
          </div>
        </div>
      </div>
    </div>
  );
};

Filters.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  selectedSort: PropTypes.string
};

Filters.defaultProps = {
  selectedSort: null
};

export default Filters;
