import { useState, useEffect } from "react";

// Helpers
import axios from "axios";

// endpoints
import Endpoints from "../constants/APIs";

const useQuestions = (query = "") => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((old) => (old += 1));
  };

  const prevPage = () => {
    if (page - 1 > 0) {
      setPage((old) => (old -= 1));
    }
  };

  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source();

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const { data: questions } = await axios.get(
          Endpoints.getQuestions(`title_like=${query}&_page=${page}`)
          // { cancelToken: axiosCancelToken.token }
        );

        setIsLoading(false);
        setData(questions);
      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      axiosCancelToken.cancel("Request Cancel");
    };
  }, [query, page]);

  return {
    data: {
      questions: data,
      total: data.length,
    },
    isLoading,
    error,
    page,
    nextPage,
    prevPage,
  };
};

export default useQuestions;
