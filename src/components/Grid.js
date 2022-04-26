import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import HeartrateComponent from "./HeartrateComponent";
import SleepComponent from "./SleepComponent";
import StepsComponent from "./StepsComponent";
import CaloriesComponent from "./CaloriesComponent";

const Grid = () => {
  const { userId, BASE_URL } = useContext(AuthenticationContext);
  //api endpoints
  const apiHeartrate = `${BASE_URL}${userId}/activities/heart/date/`;
  const apiSleep = `${BASE_URL}${userId}/sleep/date/`;
  const apiSteps = `${BASE_URL}${userId}/activities/steps/date/`;
  const apiCalories = `${BASE_URL}${userId}/activities/calories/date/`;

  return (
    <div className="container">
      <HeartrateComponent base_url={apiHeartrate} />
      <SleepComponent base_url={apiSleep} />
      <StepsComponent base_url={apiSteps} />
      <CaloriesComponent base_url={apiCalories} />
    </div>
  );
};

export default Grid;
