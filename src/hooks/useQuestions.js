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
  const [sort, setSort] = useState("views");
  const [order, setOrder] = useState("asc");

  const nextPage = () => {
    setPage((old) => (old += 1));
  };

  const prevPage = () => {
    if (page - 1 > 0) {
      setPage((old) => (old -= 1));
    }
  };

  const handleSort = (newSort) => {
    console.log({ newSort });
    setSort(newSort);
  };

  const handleOrder = (newOrder) => {
    setOrder(newOrder);
  };

  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source();

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const { data: questions } = await axios.get(
          Endpoints.getQuestions(
            `title_like=${query}&_page=${page}&_sort=${sort}&_order=${order}`
          )
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
  }, [query, page, sort, order]);

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
    sort,
    handleSort,
    order,
    handleOrder,
  };
};

export default useQuestions;
