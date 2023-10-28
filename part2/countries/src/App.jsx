import React, { useEffect, useState } from "react";
import services from "./services/countries";
import SearchBar from "../Components/SearchBar";

import OneCountryDisplay from "../Components/OneCountryDisplay";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    services.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  const handleChange = (event) => {
    setSearchCountry(event.target.value);
  };

  const matchedCountries = countries.filter((countryList) => {
    const countryName = countryList.name.common.toLowerCase();
    return (
      countryName.includes(searchCountry.toLowerCase()) && searchCountry !== ""
    );
  });

  const countryList = () => {
    const handleClick = (event) => {
      setShow(!show);
    };
    if (matchedCountries.length === 0) {
      return null;
    } else if (matchedCountries.length > 10)
      return <p>Too many matches, specify another filter</p>;
    else if (matchedCountries.length <= 10 && matchedCountries.length > 1) {
      return matchedCountries.map((ele, key) => (
        <div>
          <p key={key}>
            {ele.name.common}{" "}
            <button id={key} onClick={handleClick}>
              show
            </button>
          </p>
          {show === true && (
            <OneCountryDisplay matchedCountry={matchedCountries[key]} />
          )}
        </div>
      ));
    } else {
      return <OneCountryDisplay matchedCountry={matchedCountries[0]} />;
    }
  };

  const displayCountryList = countryList();

  return (
    <div>
      <SearchBar searchCountry={searchCountry} handleChange={handleChange} />
      {displayCountryList}
    </div>
  );
};

export default App;
