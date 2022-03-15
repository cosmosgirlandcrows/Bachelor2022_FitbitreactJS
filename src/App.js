import Button from "./components/Button";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const url = window.location.href;
  const access_token = getAccessToken(url);
  const userId = getUserId(url);
  const [fullname, setFullname] = useState(null);
  const [device, setDevice] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(null);

  if (access_token == "") {
    window.location.href =
      "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=23899M&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800";
  }

  //Fetch data here
  useEffect(() => {
    fetchProfile();
    fetchDevice();
  }, []);

  function logout() {
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
      });
  }

  //GET call to fetch profile
  function fetchProfile() {
    fetch("https://api.fitbit.com/1/user/" + userId + "/profile.json", {
      headers: {
        authorization: "Bearer " + access_token,
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setFullname(response.user.fullName);
      });
  }

  //GET call to fetch device info
  function fetchDevice() {
    fetch("https://api.fitbit.com/1/user/" + userId + "/devices.json", {
      headers: {
        authorization: "Bearer " + access_token,
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setDevice(response[0].deviceVersion);
        setBatteryLevel(response[0].batteryLevel + "%");
      });
  }

  return (
    <>
      <Button onClick={logout} title="Logout" />
      <h1>Profile : {fullname}</h1>
      <h2>Device : {device}</h2>
      <h2>Battery : {batteryLevel}</h2>
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
