import React from "react";
import OneCountryDisplay from "./OneCountryDisplay";
import ShowCountry from "./ShowCountry";

const CountryList = ({ countries, searchCountry }) => {
  const matchedCountries = countries.filter((country) => {
    const countryName = country.name.common.toLowerCase();
    return (
      countryName.includes(searchCountry.toLowerCase()) && searchCountry !== ""
    );
  });
  console.log(matchedCountries);
  if (matchedCountries.length === 0) {
    return null;
  } else if (matchedCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (matchedCountries.length <= 10 && matchedCountries.length > 1) {
    return (
      <div>
        {matchedCountries.map((country, key) => {
          return <ShowCountry key={key} country={country} />;
        })}
      </div>
    );
  } else {
    return <OneCountryDisplay matchedCountry={matchedCountries[0]} />;
  }
};

export default CountryList;
