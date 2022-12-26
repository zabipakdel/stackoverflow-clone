const Answers = ({ answers }) => {
  return (
    <div>
      {answers.quotes.map((ansewer, i) => {
        // console.log({ item });
        return (
          <div>
            <span key={`ansewer_${i}`}>{ansewer?.description}}</span>
            <div className="border-b border-gray-300" />
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
