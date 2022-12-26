const Answers = ({ answers }) => {
  return (
    <div>
      {answers.quotes.map((item, i) => {
        console.log({ item });
        return <span key={`ansewer`}>answers</span>;
      })}
    </div>
  );
};

export default Answers;
