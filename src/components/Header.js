import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import Profile from "./Profile";
import Button from "./Button";

const Header = () => {
  //Values from AuthenticationContext
  const { access_token, userId, BASE_URL } = useContext(AuthenticationContext);
  const apiProfile = `${BASE_URL}${userId}/profile.json`;
  const apiDeviceInfo = `${BASE_URL}${userId}/devices.json`;

  const logout = () => {
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
  };

  return (
    <header className="mainHeader">
      <h1>Fitbit API</h1>
      <Profile
        access_token={access_token}
        apiProfile={apiProfile}
        apiDeviceInfo={apiDeviceInfo}
      />
      <Button onClick={() => logout()} title="Logout" />
    </header>
  );
};

export default Header;
