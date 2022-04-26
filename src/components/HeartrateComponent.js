import { getAverage, formatDataset, getDataset } from "../utils/utils";
import GridItemContainer from "./GridItemContainer";
import { FaHeartbeat } from "react-icons/fa";

const HeartrateComponent = ({ base_url }) => {
  const base_title = "Average heartrate";
  const base_value = "-- bpm";
  const base_icon = <FaHeartbeat className="heartIcon" />;
  const baseProps = { base_title, base_url, base_value, base_icon };

  const handleData = (data) => {
    const dataset = getDataset(data, "activities-heart");
    const valuesArray = dataset((array) => {
      return array
        .map((el) => el.value.restingHeartRate)
        .filter((el) => !isNaN(el));
    });
    const avg = getAverage(valuesArray);
    return Boolean(avg) ? avg + " bpm" : "-- bpm";
  };

  const handleChartData = (labels, data) => {
    const dataset = getDataset(data, "activities-heart");

    const chartData = dataset((array) => {
      return array
        .map((el) => {
          const restingHeartRate = el.value.restingHeartRate;
          const date = el.dateTime;
          return { dateTime: date, restingHeartRate: restingHeartRate };
        })
        .filter((el) => !isNaN(el.restingHeartRate));
    });

    return formatDataset(labels, chartData, (element, label) => {
      if (element.dateTime === label) return element.restingHeartRate;
      return null;
    });
  };

  return (
    <>
      <GridItemContainer
        baseProps={baseProps}
        handleData={handleData}
        handleChartData={handleChartData}
      />
    </>
  );
};

export default HeartrateComponent;
