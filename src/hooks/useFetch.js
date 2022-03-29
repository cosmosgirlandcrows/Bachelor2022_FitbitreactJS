import { useEffect, useState } from "react";

const useFetch = (
  access_token,
  url,
  headers = {
    headers: {
      authorization: "Bearer " + access_token,
      accept: "application/json",
    },
  }
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiUrl, setApiUrl] = useState(url);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(apiUrl, { ...headers, signal: controller.signal })
      .then((response) => {
        if (response.ok) return response.json();
        throw `Error ${response.status}`;
      })
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [apiUrl]);

  return [data, loading, error, setApiUrl];
};

export default useFetch;
