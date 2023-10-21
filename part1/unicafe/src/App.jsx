import React from "react";
import { useState } from "react";
import Header from "../Components/Header";
import Button from "../Components/Button";
import Statistics from "../Components/Statistics";
import Average from "../Components/Average";
import Total from "../Components/Total";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  const findAvg = () => {
    if (total === 0) {
      return 0;
    }
    return (good * 1 + neutral * 0 + bad * -1) / total;
  };

  return (
    <div>
      <Header />
      <Button data={"good"} handleClick={handleGood} />
      <Button data={"neutrals"} handleClick={handleNeutral} />
      <Button data={"bad"} handleClick={handleBad} />
      <Statistics data={[good, neutral, bad]} />
      <Total total={total} />
      <Average avg={findAvg()} />
    </div>
  );
};

export default App;
