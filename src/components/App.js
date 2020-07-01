import React, { useState, useEffect } from 'react';
import Country from './Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesFetched, setCountriesFetched] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setCountriesFetched(false);

      const res = await fetch('https://restcountries.eu/rest/v2/region/europe');
      const data = await res.json();

      console.log('countries', data);

      setCountries(data);
      setCountriesFetched(true);
    } catch (error) {
      console.log(`Error fetching coutries`, error);
      setCountriesFetched(true);
    }
  };

  if (!countriesFetched) return <div>Loading...</div>;

  return (
    <div className="countries-container">
      {countries.map(country => (
        <Country key={country.numericCode} data={country} />
      ))}
    </div>
  );
};

export default App;
