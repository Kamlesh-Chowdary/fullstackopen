import React from "react";

const OneCountryDisplay = ({ matchedCountry }) => {
  return (
    <div>
      <h1>{matchedCountry.name.common}</h1>
      <p>capital : {matchedCountry.capital}</p>
      <p>area: {matchedCountry.area}</p>
      <h3>Languages</h3>
      <ul>
        {/* Object.entries() treats the object as an array to iterate through its properties using map method of array */}
        {Object.entries(matchedCountry.languages).map((language, id) => {
          return <li key={id}>{language[1]}</li>;
        })}
      </ul>
      <img src={matchedCountry.flags.png} />
    </div>
  );
};

export default OneCountryDisplay;
