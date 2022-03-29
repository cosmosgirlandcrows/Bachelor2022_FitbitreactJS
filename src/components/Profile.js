import useFetch from "../hooks/useFetch";
import Error from "./Error";
import Loader from "./Loader";
import { BsSmartwatch } from "react-icons/bs";

const Profile = ({ access_token, apiProfile, apiDeviceInfo }) => {
  //Using custom made hook that fetches api requests to reduce duplication
  const [profile, profileLoading, profileError] = useFetch(
    access_token,
    apiProfile
  );
  const [device, deviceLoading, deviceError] = useFetch(
    access_token,
    apiDeviceInfo
  );

  if (profileError)
    return (
      <Error errorCode={profileError} errorText="could not fetch profile" />
    );

  if (deviceError)
    return (
      <Error errorCode={deviceError} errorText="could not fetch profile" />
    );

  return (
    <>
      {profileLoading && deviceLoading && (
        <Loader text="Loading profile..." fontSize="1.2rem" />
      )}
      {profile && <img src={profile.user.avatar} alt="avatar" />}
      <div>
        {profile && <h2>{profile.user.fullName}</h2>}
        {/* <h3 className="deviceInfo">
          {device && (
            <>
              <BsSmartwatch /> Fitbit {device[0].deviceVersion}
            </>
          )}
        </h3> */}
      </div>
    </>
  );
};

export default Profile;
