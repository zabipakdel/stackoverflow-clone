import { useEffect, useState } from "react";
const useUser = ({ id }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source();

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const { data: profile } = await axios.get(
          Endpoints.getProfile(`?id_like=${id}`)
          // { cancelToken: axiosCancelToken.token }
        );

        setIsLoading(false);
        setData(profile);
      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      axiosCancelToken.cancel("Request Cancel");
    };
  }, []);

  return {
    data: {
      profile: data,
    },
    isLoading,
    error,
  };
};

export default useUser;
