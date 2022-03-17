import { useState } from "react";

const useFetch = (access_token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const get = (
    url,
    headers = {
      headers: {
        authorization: "Bearer " + access_token,
        accept: "application/json",
      },
    }
  ) => {
    setLoading(true);
    fetch(url, headers)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setLoading(true);
    const params = "token=" + access_token;
    fetch("https://api.fitbit.com/oauth2/revoke", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic MjM4OTlNOmEwNmY1N2ZkY2RiMjgzMDc4ZDNjODBhNGY4YTE0NTVj",
      },
      body: params,
    })
      .then((response) => response.json())
      .then((response) => {
        window.location.href = "http://localhost:3000/";
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return { data, loading, error, get, logout };
};

export default useFetch;
