import React, { useState } from "react";
import OneCountryDisplay from "./OneCountryDisplay";

const ShowCountry = ({ country }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      <p>
        {country.name.common}{" "}
        <button onClick={toggleShow}>{show ? "Hide" : "Show"}</button>
      </p>
      {show && <OneCountryDisplay matchedCountry={country} />}
    </div>
  );
};

export default ShowCountry;
