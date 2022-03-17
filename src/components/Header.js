import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Button from "./Button";
import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { BsSmartwatch } from "react-icons/bs";

const Header = () => {
  const { access_token, userId } = useContext(AuthenticationContext);
  const { logout } = useFetch(access_token);
  const { data: profile, get: getProfile } = useFetch(access_token);
  const { data: deviceInfo, get: getDeviceInfo } = useFetch(access_token);

  useEffect(() => {
    getProfile("https://api.fitbit.com/1/user/" + userId + "/profile.json");
    getDeviceInfo("https://api.fitbit.com/1/user/" + userId + "/devices.json");
  }, []);

  return (
    <header className="mainHeader">
      <h1>Fitbit API</h1>
      <div className="profile">
        {profile && <img src={profile.user.avatar} alt="avatar" />}
        <div>
          {profile && <h2>{profile.user.fullName}</h2>}
          {deviceInfo && (
            <div className="deviceInfo">
              <h3>
                <BsSmartwatch />
                Fitbit {deviceInfo[0].deviceVersion}
              </h3>
            </div>
          )}
        </div>
        <Button onClick={() => logout()} title="Logout" />
      </div>
    </header>
  );
};

export default Header;
