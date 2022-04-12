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
  const apiSteps = `${BASE_URL}${userId}/activities/steps/date/`;

  const [sleepChartLabels, setSleepChartLabels] = useState([]);
  const [sleepChartData, setSleepChartData] = useState([]);
  const [heartChartLabels, setHeartChartLabels] = useState([]);
  const [heartChartData, setHeartChartData] = useState([]);
  const [stepsChartLabels, setStepsChartLabels] = useState([]);
  const [stepsChartData, setStepsChartData] = useState([]);

  const handleSleepLabelChange = (labels) => {
    setSleepChartLabels(labels);
  };

  const handleHeartLabelChange = (labels) => {
    setHeartChartLabels(labels);
  };

  const handleStepsLabelChange = (labels) => {
    setStepsChartLabels(labels);
  };

  //returns values that get used to calculate average value for heartrate
  //This function gets passed as a prop in GridItemContainer
  const getHeartrateDataset = (data) => {
    const array = data["activities-heart"];
    const chartDataset = array
      .map((el) => {
        const restingHeartRate = el.value.restingHeartRate;
        const date = el.dateTime;
        return { dateTime: date, restingHeartRate: restingHeartRate };
      })
      .filter((el) => !isNaN(el.restingHeartRate));
    const dataset = array
      .map((el) => el.value.restingHeartRate)
      .filter((el) => !isNaN(el));
    setHeartChartData(chartDataset);
    const roundToDecimal = false;
    return [dataset, "bpm", roundToDecimal];
  };

  //return values that get used to calculate average sleep duration
  //This function gets passed as a prop in GridItemContainer
  const getSleepDataset = (data) => {
    const array = data["sleep"];
    const chartDataset = array
      .map((el) => {
        const duration = Number((el.duration / (1000 * 60 * 60)).toFixed(1));
        const date = el.dateOfSleep;
        return { dateOfSleep: date, duration: duration };
      })
      .filter((el) => !isNaN(el.duration));
    const dataset = array
      .map((el) => Number((el.duration / (1000 * 60 * 60)).toFixed(1)))
      .filter((el) => !isNaN(el));
    const roundToDecimal = true;
    setSleepChartData(chartDataset);
    return [dataset, "hours", roundToDecimal];
  };

  const getStepsDataset = (data) => {
    const array = data["activities-steps"];
    const dataset = array
      .map((el) => Number(el.value))
      .filter((el) => !isNaN(el));
    const roundToDecimal = false;
    console.log(array);
    setStepsChartData(array);
    return [dataset, "steps", roundToDecimal];
  };

  const getCompleteChartData = (labels, data, callback) => {
    const array = [];
    labels.forEach((label) => {
      let value = null;
      data.find((object) => {
        //
        value = callback(object, label);
        // if (value === 0) value = null;
        if (value !== null) return true;
        return false;
      });
      array.push(value);
    });
    return array;
  };

  return (
    <div className="container">
      <GridItemContainer
        title="Average sleep duration"
        icon={<BsFillMoonStarsFill className="moonIcon" />}
        url={apiSleep}
        getDataset={getSleepDataset}
        handleLabelChange={handleSleepLabelChange}
        children={
          <LineChart
            labels={sleepChartLabels}
            labeltext="Hours slept"
            chartData={getCompleteChartData(
              sleepChartLabels,
              sleepChartData,
              (o, l) => {
                if (o.dateOfSleep === l) return o.duration;
                return null;
              }
            )}
          />
        }
      />
      <GridItemContainer
        title="Average heartrate"
        icon={<FaHeartbeat className="heartIcon" />}
        url={apiHeartrate}
        handleLabelChange={handleHeartLabelChange}
        getDataset={getHeartrateDataset}
        children={
          <LineChart
            labels={heartChartLabels}
            labeltext="Beats per minute"
            chartData={getCompleteChartData(
              heartChartLabels,
              heartChartData,
              (o, l) => {
                if (o.dateTime === l) return o.restingHeartRate;
                return null;
              }
            )}
          />
        }
      />
      <GridItemContainer
        title="Average step count"
        icon={<IoFootstepsSharp className="stepsIcon" />}
        url={apiSteps}
        handleLabelChange={handleStepsLabelChange}
        getDataset={getStepsDataset}
        children={
          <LineChart
            labels={stepsChartLabels}
            labeltext="Steps per day"
            chartData={getCompleteChartData(
              stepsChartLabels,
              stepsChartData,
              (o, l) => {
                if (o.dateTime === l) return Number(o.value);
                return null;
              }
            )}
          />
        }
      />
      {/* <GridItemContainer
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
