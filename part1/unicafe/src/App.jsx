import React from "react";
import { useState } from "react";
import Header from "../Components/Header";
import Button from "../Components/Button";
import Statistics from "../Components/Statistics";
import Total from "../Components/Total";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header />
      <Button data={"good"} handleClick={handleGood} />
      <Button data={"neutral"} handleClick={handleNeutral} />
      <Button data={"bad"} handleClick={handleBad} />
      <Statistics data={[good, neutral, bad]} />
      <Total total={good + neutral + bad} />
    </div>
  );
};

export default App;
