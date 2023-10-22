import Part from "./Part";
import Total from "./Total";
const Content = ({ parts }) => {
  const partContent = parts.map((part) => {
    return <Part key={part.id} parts={part} />;
  });
  return (
    <>
      {partContent}
      <Total parts={parts} />
    </>
  );
};

export default Content;
