import { getAverage, formatDataset, getDataset } from "../utils/utils";
import GridItemContainer from "./GridItemContainer";
import { BsFillMoonStarsFill } from "react-icons/bs";

const SleepComponent = ({ base_url }) => {
  const base_title = "Average sleep duration";
  const base_value = "-- hours";
  const base_icon = <BsFillMoonStarsFill className="moonIcon" />;
  const baseProps = { base_title, base_url, base_value, base_icon };

  const handleData = (data) => {
    const dataset = getDataset(data, "sleep");
    const valuesArray = dataset((array) => {
      return array
        .map((el) => Number((el.duration / (1000 * 60 * 60)).toFixed(1)))
        .filter((el) => !isNaN(el));
    });
    const avg = getAverage(valuesArray, true);
    return Boolean(avg) ? avg + " hours" : "-- hours";
  };

  const handleChartData = (labels, data) => {
    const dataset = getDataset(data, "sleep");

    const chartData = dataset((array) => {
      return array
        .map((el) => {
          const duration = Number((el.duration / (1000 * 60 * 60)).toFixed(1));
          const date = el.dateOfSleep;
          return { dateOfSleep: date, duration: duration };
        })
        .filter((el) => !isNaN(el.duration));
    });

    return formatDataset(labels, chartData, (element, label) => {
      if (element.dateOfSleep === label) return element.duration;
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

export default SleepComponent;
