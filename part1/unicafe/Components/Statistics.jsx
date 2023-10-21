import StatisticLine from "./StatisticLine";
const Statistics = ({ options }) => {
  const [good, neutral, bad, total] = [...options];
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine
            text="average"
            value={(good * 1 + neutral * 0 + bad * -1) / total}
          />
          <StatisticLine text="positive" value={(good * 100) / total} />
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
