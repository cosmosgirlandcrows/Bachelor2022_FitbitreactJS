import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import GridItemContainer from "./GridItemContainer";
//import icons here
import { FaHeartbeat } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoFootstepsSharp } from "react-icons/io5";
import { FaBurn } from "react-icons/fa";
import LineChart from "./LineChart";

const Grid = () => {
  const { access_token, userId, BASE_URL } = useContext(AuthenticationContext);
  //api endpoints
  const apiHeartrate = `${BASE_URL}${userId}/activities/heart/date/`;
  const apiSleep = `${BASE_URL}${userId}/sleep/date/`;

  const [sleepChartLabels, setSleepChartLabels] = useState([]);


  const handleSleepLabelChange = (labels) => {
    setSleepChartLabels(labels);
  };

  useEffect(() => {
    console.log(sleepChartLabels)
  }, [sleepChartLabels])

  //returns values that get used to calculate average value for heartrate
  //This function gets passed as a prop in GridItemContainer
  const getHeartrateDataset = (data) => {
    const array = data["activities-heart"];
    const dataset = array
      .map((el) => el.value.restingHeartRate)
      .filter((el) => !isNaN(el));
    const roundToDecimal = false;
    return [dataset, "bpm", roundToDecimal];
  };

  //return values that get used to calculate average sleep duration
  //This function gets passed as a prop in GridItemContainer
  const getSleepDataset = (data) => {
    const array = data["sleep"];
    const dataset = array
      .map((el) => Number((el.duration / (1000 * 60 * 60)).toFixed(1)))
      .filter((el) => !isNaN(el));
    const labels = array.map((el) => el.dateOfSleep);
    const roundToDecimal = true;
    return [dataset, labels, "hours", roundToDecimal];
  };

  return (
    <div className="container">
      <GridItemContainer
        title="Average sleep duration"
        icon={<BsFillMoonStarsFill className="moonIcon" />}
        access_token={access_token}
        url={apiSleep}
        getDataset={getSleepDataset}
        handleLabelChange={handleSleepLabelChange}
        children={<LineChart labels={sleepChartLabels}/>}
      />
      {/* <GridItemContainer
        title="Average heartrate"
        icon={<FaHeartbeat className="heartIcon" />}
        access_token={access_token}
        url={apiHeartrate}
        handleLabelChange={handleSleepChartData}
        getDataset={getHeartrateDataset}
        children={<LineChart/>}
      /> */}
      {/* <GridItemContainer
        title="Average step count"
        icon={<IoFootstepsSharp className="stepsIcon" />}
        access_token={access_token}
        url={apiHeartrate}
        handleData={handleSleepChartData}
        getDataset={getHeartrateDataset}
        children={<LineChart/>}
      />
      <GridItemContainer
        title="Average activity level"
        icon={<FaBurn className="burnIcon" />}
        access_token={access_token}
        url={apiHeartrate}
        handleData={handleSleepChartData}
        getDataset={getHeartrateDataset}
        children={<LineChart/>}
      /> */}
    </div>
  );
};

export default Grid;
