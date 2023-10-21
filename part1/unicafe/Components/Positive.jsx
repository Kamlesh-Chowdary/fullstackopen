import React from "react";

const Positive = ({ good, total }) => {
  const findPositive = () => {
    if (total === 0) {
      return 0;
    }
    return (good * 100) / total;
  };

  return (
    <>
      <p>Positive {findPositive()} %</p>
    </>
  );
};

export default Positive;
