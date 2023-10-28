import React, { useEffect, useState } from "react";
import services from "./services/countries";
import SearchBar from "../Components/SearchBar";
import CountryList from "../Components/CountryList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    services.getAll().then((response) => {
      setCountries(response);
    });
  }, []);
  const handleChange = (event) => {
    setSearchCountry(event.target.value);
  };
  return (
    <div>
      <SearchBar searchCountry={searchCountry} handleChange={handleChange} />
      <CountryList countries={countries} searchCountry={searchCountry} />
    </div>
  );
};

export default App;
