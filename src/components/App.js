import React, { useState, useEffect } from 'react';
import Country from './Country';
import Filters from './Filters';
import {
  SORT_NAME_ASC,
  SORT_NAME_DESC,
  SORT_POPULATION_ASC,
  SORT_POPULATION_DESC,
  EQUAL_COMPARE,
  GREATER_THAN_COMPARE
} from '../constants';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesFetched, setCountriesFetched] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState(null);
  const [selectedLanguagesFilter, setSelectedLanguagesFilter] = useState(null);
  const [availableSubregions, setAvailableSubregions] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setCountriesFetched(false);

        const res = await fetch('https://restcountries.eu/rest/v2/region/europe');
        const data = await res.json();

        console.log('countries', data);

        setCountries(data);
        mapSubregionsToArary(data);
        setCountriesFetched(true);
      } catch (error) {
        console.log(`Error fetching coutries`, error);
        setCountriesFetched(true);
      }
    };

    fetchCountries();
  }, []);

  const mapSubregionsToArary = data => {
    //Create unique list of regions for filtering
    const subregions = data.reduce((regions, country) => {
      if (regions.includes(country.subregion)) return regions;

      regions.push(country.subregion);

      return regions;
    }, []);

    setAvailableSubregions(subregions);
  };

  const sortItems = sort => {
    if (sort === null) return;

    const newCountries = countries.sort((a, b) => {
      switch (sort) {
        case SORT_POPULATION_ASC:
          return a.population - b.population;

        case SORT_POPULATION_DESC:
          return b.population - a.population;

        case SORT_NAME_ASC:
          return a.name.localeCompare(b.name);

        case SORT_NAME_DESC:
          return b.name.localeCompare(a.name);

        default:
          return a.name.localeCompare(b.name); // Default a-z
      }
    });

    setCountries(newCountries);
  };

  const onSortChange = sort => {
    if (selectedSort === sort) return;

    setSelectedSort(sort);
    sortItems(sort);
  };

  const filterItemsByLanguages = (comparator, amount) => {
    const newCountries = countries.filter(country => {
      if (comparator === EQUAL_COMPARE) {
        return country.languages.length === amount;
      }

      if (comparator === GREATER_THAN_COMPARE) {
        return country.languages.length >= amount;
      }

      return false;
    });

    setCountries(newCountries);
  };

  const onLanguagesFilterChange = (comparator, filter) => {
    setSelectedLanguagesFilter(filter);
    filterItemsByLanguages(comparator, parseInt(filter));
  };

  const filterItemsByRegion = filter => {
    const newCountries = countries.filter(country => country.subregion === filter);

    setCountries(newCountries);
  };

  const onRegionFilterChange = filter => {
    setSelectedRegionFilter(filter);
    filterItemsByRegion(filter);
  };

  if (!countriesFetched) return <div className="loader">Loading...</div>;

  return (
    <main className="main-section">
      <Filters
        onSortChange={onSortChange}
        selectedSort={selectedSort}
        onRegionFilterChange={onRegionFilterChange}
        selectedRegionFilter={selectedRegionFilter}
        availableSubregions={availableSubregions}
        onLanguageFilterChange={onLanguagesFilterChange}
        selectedLanguagesFilter={selectedLanguagesFilter}
      />

      <div className="countries-container">
        {countries.map(country => (
          <Country key={country.numericCode} data={country} />
        ))}
      </div>
    </main>
  );
};

export default App;
