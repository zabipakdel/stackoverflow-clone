const Answers = ({ answers }) => {
  return (
    <div>
      {answers.quotes.map((ansewer, i) => {
        // console.log({ item });
        return (
          <div className="p-2 bg-gray-100 rounded mt-2">
            <span key={`ansewer_${i}`}>
              {ansewer?.description} -
              <span className="text-blue-600">{ansewer?.user?.name}</span> -
              <span className="text-blue-600">{ansewer?.user?.points}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
