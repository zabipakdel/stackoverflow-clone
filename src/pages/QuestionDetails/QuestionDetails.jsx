import { useNavigate, useParams } from "react-router-dom";
import { RenderWhen } from "../../components";
import parse from "html-react-parser";
import { useId } from "react";
import clsx from "clsx";

import useQuestion from "./hooks/useQuestion";
import Answers from "./components/Answers";
import Tags from "../Ask/components/Tags";

const QuestionTitle = ({ value, onChange, disabled, errorMsg, name }) => {
  const id = useId();

  return (
    <div className="mb-4 mt-5 flex flex-col">
      <label htmlFor={id} className="font-bold text-sm mb-2">
        Answer
      </label>
      <input
        type="text"
        id={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={clsx("p-2 border rounded w-1/2", {
          "border-red-400": errorMsg,
        })}
        placeholder="How to use a computer..."
        name={name}
        // ref={ref}
      />
      <RenderWhen condition={errorMsg}>
        <div className="py-1 text-xs text-red-500">{errorMsg}</div>
      </RenderWhen>
    </div>
  );
};

const Description = ({ value, onChange, disabled, errorMsg, name }) => {
  const id = useId();

  return (
    <>
      <label htmlFor={id} className="font-bold text-sm mb-2">
        Description
      </label>
      <textarea
        className={clsx("min-h-[250px] border rounded p-2", {
          "border-red-400": errorMsg,
        })}
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        placeholder="I want my computer to answer whatever I want to know"
      ></textarea>
      <RenderWhen condition={errorMsg}>
        <div className="py-1 text-xs text-red-500">{errorMsg}</div>
      </RenderWhen>
    </>
  );
};

const QuestionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data,
    isLoading,
    error,
    votes,
    handleUpvote,
    handleDownvote,
    errors,
    onSubmit,
    values,
    onChange,
  } = useQuestion({
    id,
    afterSubmission: () => {
      navigate("/");
    },
  });

  return (
    <div className="py-8">
      <div className="mb-4">
        <button className="py-2 text-sm" onClick={() => navigate(-1)}>
          {"< Back"}
        </button>
      </div>

      <RenderWhen condition={isLoading}>
        <h2>Loading...</h2>
      </RenderWhen>

      <RenderWhen condition={error}>
        <h2>Error...</h2>
      </RenderWhen>

      <RenderWhen condition={data && Object.keys(data).length}>
        <h1 className="text-2xl font-bold mb-8 border-b border-gray-300 pb-4">
          {data?.title}
        </h1>
        <div className="flex justify-center">
          <div className="px-10 mr-4">
            <button className="p-4 text-xl" onClick={handleUpvote}>
              ⬆️
            </button>

            <div className="text-center">{votes}</div>

            <button className="p-4 text-xl" onClick={handleDownvote}>
              ⬇️
            </button>
          </div>
          <div>
            <Tags tags={data?.tags} />
            <div className="pb-2 mt-2 border-b border-gray-300 text-xs mb-4">
              <span className="text-gray-500">Asked: </span>
              <span className=" mr-4">{data.created_at}</span>

              <span className="text-gray-500">By </span>
              <span className="">{data.author}</span>
            </div>
            {parse(`${data.description}`)}
            <Answers answers={data?.answers} />
            <div className="border-b border-gray-300 mt-3" />
            <form onSubmit={onSubmit} className="flex flex-col">
              <QuestionTitle
                value={values.title}
                onChange={onChange}
                disabled={isLoading}
                errorMsg={errors.title}
                name="title"
              />

              <Description
                value={values.description}
                onChange={onChange}
                disabled={isLoading}
                errorMsg={errors.description}
                name="description"
              />

              <div className="py-4 flex justify-end">
                <div>
                  <button
                    className="py-2 px-4 mr-2 text-red-500 rounded"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-2 px-4  text-white rounded border bg-blue-500 border-blue-600 hover:bg-blue-600 transition-colors"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </RenderWhen>
    </div>
  );
};

export default QuestionDetails;
