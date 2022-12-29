import { useId, useState } from "react";
const QuestionTag = ({ value, onChange, onKeyUp }) => {
  const id = useId();

  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={id} className="font-bold text-sm mb-2">
        Tag
      </label>
      <input
        type="text"
        id={id}
        onKeyUp={onKeyUp}
        value={value}
        onChange={onChange}
        className={"p-2 border rounded w-1/2"}
        placeholder="Tailwind"
      />
    </div>
  );
};

const Tags = ({ tags = ["tailwind"], handleTags }) => {
  const [text, setText] = useState("");

  const handleKeyUp = (event) => {
    console.log({ event });
    if (event.ctrlKey && event.keyCode == 13) {
      handleTags(text);
      setText("");
    }
  };

  return (
    <div>
      {handleTags ? (
        <>
          <QuestionTag
            onKeyUp={handleKeyUp}
            value={text}
            onChange={({ target }) => setText(target.value)}
          />
          <span>To Add Press Ctrl + Enter Key</span>
        </>
      ) : null}
      <div className="flex w-full justify-start item-center">
        {tags.map((item, i) => {
          return (
            <span
              key={`tag_${i}`}
              class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-fuchsia-600 bg-fuchsia-200 uppercase last:mr-0 mr-1"
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;
