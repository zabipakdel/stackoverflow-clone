const Sort = ({ sort, handleSort }) => {
  return (
    <nav aria-label="Page navigation mb-2 bg-green-400">
      <ul class="inline-flex -space-x-px">
        <li>
          <button
            onClick={() => handleSort("views")}
            class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Views
          </button>
        </li>
        <li>
          <button
            onClick={() => handleSort("answers")}
            class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Answers
          </button>
        </li>
        <li>
          <button
            onClick={() => handleSort("votes")}
            class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Votes
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sort;
