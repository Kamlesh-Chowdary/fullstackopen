import React from "react";
import OneCountryDisplay from "./OneCountryDisplay";
import ShowCountry from "./ShowCountry";
import Weather from "./Weather";

const CountryList = ({ countries, searchCountry }) => {
  const matchedCountries = countries.filter((country) => {
    const countryName = country.name.common.toLowerCase();
    return (
      countryName.includes(searchCountry.toLowerCase()) && searchCountry !== ""
    );
  });

  if (matchedCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (matchedCountries.length === 1) {
    return (
      <>
        <OneCountryDisplay matchedCountry={matchedCountries[0]} />;
        <Weather
          capital={matchedCountries[0].capital}
          lat={matchedCountries[0].latlng[0]}
          lon={matchedCountries[0].latlng[1]}
        />
      </>
    );
  }

  return (
    <div>
      {matchedCountries.map((country, key) => {
        return (
          <>
            <ShowCountry key={key} country={country} />
          </>
        );
      })}
    </div>
  );
};

export default CountryList;
