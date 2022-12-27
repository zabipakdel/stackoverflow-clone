// hooks
import useQuestions from "../../hooks/useQuestions";

// Components
import Skeleton from "react-loading-skeleton";
import { Error, RenderWhen } from "../../components";
import AskQuestion from "./components/AskQuestion";
import QuestionItem from "../../components/QuestionItem/QuestionItem";
import Pagination from "../../components/Pagination";
import Sort from "../../components/Sort";

const Home = () => {
  const { data, isLoading, error, page, nextPage, prevPage, sort, handleSort } =
    useQuestions();
  return (
    <div className="pb-10">
      <AskQuestion total={data.total} />

      <RenderWhen condition={isLoading}>
        <Skeleton count={3} className="h-36 mb-6" />
      </RenderWhen>

      <RenderWhen condition={error}>
        <Error />
      </RenderWhen>
      <Sort sort={sort} handleSort={handleSort} />
      <RenderWhen condition={data && data?.questions.length}>
        <h1 className="py-8 mt-2 text-lg font-bold sticky top-0 bg-white">
          Top Questions
        </h1>
        {data.questions.map(
          ({
            id,
            title,
            created_at,
            views,
            rate,
            description,
            author,
            answers,
            tags,
          }) => (
            <QuestionItem
              key={id}
              id={id}
              className="mb-4"
              title={title}
              rate={rate}
              views={views}
              date={created_at}
              description={description}
              author={author}
              answers={answers}
              tags={tags}
            />
          )
        )}
      </RenderWhen>
      <Pagination page={page} nextPage={nextPage} prevPage={prevPage} />
    </div>
  );
};

export default Home;
