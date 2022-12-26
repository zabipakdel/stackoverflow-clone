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
              <div className="border-b border-gray-300" />
              {ansewer?.comments?.map((comment, i) => {
                return (
                  <div
                    key={`comment_${i}`}
                    className="bg-gray-500 rounded ml-4 mt-2"
                  >
                    <span className="text-white p-3">{comment?.body}</span>
                  </div>
                );
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
