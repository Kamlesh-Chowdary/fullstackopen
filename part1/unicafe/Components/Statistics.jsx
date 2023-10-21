const Statistics = ({ data }) => {
  return (
    <>
      <h1>Statistics</h1>
      <p>good {data[0]}</p>
      <p>neutral {data[1]}</p>
      <p>bad {data[2]}</p>
    </>
  );
};

export default Statistics;
