import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetail from "./components/CountryDetail";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [notification, setNotification] = useState("");
  const [showCountryId, setShowCountryId] = useState(null);

  useEffect(() => {
    if (query) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          const filteredCountries = response.data.filter((country) => country.name.common.toLowerCase().includes(query.toLowerCase()));
          if (filteredCountries.length > 10) {
            setNotification("Too many matches, specify another filter");
            setCountries([]);
          } else {
            setNotification("");
            setCountries(filteredCountries);
          }
        })
        .catch((error) => {
          setNotification("Error fetching data");
        });
    } else {
      setNotification("");
      setCountries([]);
    }
  }, [query]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setShowCountryId(null); // Reset selected country when query changes
  };

  const handleShowCountry = (id) => {
    setShowCountryId(id);
  };

  return (
    <div>
      <h1>Country Information</h1>
      <div>
        find countries: <input value={query} onChange={handleQueryChange} />
      </div>
      {notification && <p>{notification}</p>}
      {countries.length === 1 ? (
        <CountryDetail country={countries[0]} />
      ) : (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country.cca3)}> show </button>
              {showCountryId === country.cca3 && <CountryDetail country={country} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
