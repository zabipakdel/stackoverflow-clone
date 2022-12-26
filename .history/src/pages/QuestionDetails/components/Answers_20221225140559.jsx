const Answers = ({ answers }) => {
  return (
    <div>
      {answers.quotes.map((item, i) => {
        console.log({ item });
        return (
          <div>
            <span key={`ansewer`}>answers</span>
            <div className="border-b border-gray-300" />
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
