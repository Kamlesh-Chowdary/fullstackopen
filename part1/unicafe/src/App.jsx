import React from "react";
import { useState } from "react";
import Header from "../Components/Header";
import Button from "../Components/Button";
import Statistics from "../Components/Statistics";
import Average from "../Components/Average";
import Total from "../Components/Total";
import Positive from "../Components/Positive";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const options = [good, neutral, bad];

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
      <Button data={"neutrals"} handleClick={handleNeutral} />
      <Button data={"bad"} handleClick={handleBad} />
      <Statistics data={options} />
      <Total total={total} />
      <Average value={options} total={total} />
      <Positive good={good} total={total} />
    </div>
  );
};

export default App;
