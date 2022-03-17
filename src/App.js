import Button from "./components/Button";
import { useState, useEffect } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import Header from "./components/Header";
import { AuthenticationContext } from "./contexts/AuthenticationContext";

function App() {
  const url = window.location.href;
  const access_token = getAccessToken(url);
  const userId = getUserId(url);

  if (access_token == "") {
    window.location.href =
      "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=23899M&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800";
  }

  //Fetch data here
  useEffect(() => {}, []);

  return (
    <>
      <AuthenticationContext.Provider value={{ userId, access_token }}>
        <Header />
      </AuthenticationContext.Provider>
    </>
  );
}

function getAccessToken(url) {
  if (url.match("#access_token="))
    return url.split("#")[1].split("=")[1].split("&")[0];
  return "";
}

function getUserId(url) {
  if (url.match("user_id="))
    return url.split("#")[1].split("=")[2].split("&")[0];
  return "";
}

export default App;
