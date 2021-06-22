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
  const [countries, setCountries] = useState([]); //Use to reset filter by coutries
  const [renderedCountries, setRenderedCountries] = useState([]); //Use for filtering/sorting
  const [countriesFetched, setCountriesFetched] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState(null);
  const [selectedLanguagesFilter, setSelectedLanguagesFilter] = useState(null);
  const [availableSubregions, setAvailableSubregions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setCountriesFetched(false);

        const res = await fetch('https://restcountries.eu/rest/v2/region/europe');
        const data = await res.json();

        // console.log('countries', JSON.stringify(data));

        setCountries(data);
        setRenderedCountries(data);
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

    // OLD
    const t1 = performance.now();

    data.reduce((regions, country) => {
      if (regions.includes(country.subregion)) return regions;

      regions.push(country.subregion);

      return regions;
    }, []);
    const t2 = performance.now();

    console.log(`Call to reduce took ${t2 - t1} milliseconds.`);

    // NEW
    const t3 = performance.now();
    const map = {}; //Use to track if region found (skips needing to do second iteration)
    const subregions = []; //If found, add to this array

    for (let { subregion } of data) {
      //if already exists, skip
      if (map[subregion]) continue;

      // else, track in map object, add to array for the state
      map[subregion] = true;
      subregions.push(subregion);
    }
    const t4 = performance.now();

    console.log(`Call to map/array took ${t4 - t3} milliseconds.`);

    setAvailableSubregions(subregions);
  };

  const sortItems = sort => {
    if (sort === null) return;

    const newCountries = renderedCountries.sort((a, b) => {
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

    setRenderedCountries(newCountries);
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

    setRenderedCountries(newCountries);
  };

  const onLanguagesFilterChange = (comparator, filter) => {
    setSelectedLanguagesFilter(filter);
    filterItemsByLanguages(comparator, parseInt(filter));
    setSelectedRegionFilter(null);
  };

  const filterItemsByRegion = filter => {
    const newCountries = countries.filter(country => country.subregion === filter);

    setRenderedCountries(newCountries);
  };

  const onRegionFilterChange = filter => {
    setSelectedRegionFilter(filter);
    filterItemsByRegion(filter);
    setSelectedLanguagesFilter(null);
  };

  const onCountrySelect = country => {
    if (country.alpha3Code === selectedCountry) return setSelectedCountry(null);
    setSelectedCountry(country.alpha3Code);
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
        {renderedCountries.map(country => (
          <Country
            key={country.numericCode}
            data={country}
            onCountrySelect={onCountrySelect}
            selectedCountry={selectedCountry}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
