const Average = ({ value, total }) => {
  const findAvg = () => {
    if (total === 0) {
      return 0;
    }
    return (value[0] * 1 + value[1] * 0 + value[2] * -1) / total;
  };

  return (
    <>
      <p>Average {findAvg()}</p>
    </>
  );
};
export default Average;
