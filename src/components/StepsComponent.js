import { getAverage, formatDataset, getDataset } from "../utils/utils";
import GridItemContainer from "./GridItemContainer";
import { IoFootstepsSharp } from "react-icons/io5";

const StepsComponent = ({ base_url }) => {
  const base_title = "Average step count";
  const base_value = "-- steps";
  const base_icon = <IoFootstepsSharp className="stepsIcon" />;
  const baseProps = { base_title, base_url, base_value, base_icon };

  const handleData = (data) => {
    const dataset = getDataset(data, "activities-steps");
    const valuesArray = dataset((array) => {
      return array.map((el) => Number(el.value)).filter((el) => !isNaN(el));
    });
    const avg = getAverage(valuesArray);
    return avg === "0" ? "-- steps" : avg + " steps";
  };

  const handleChartData = (labels, data) => {
    const dataset = getDataset(data, "activities-steps")((array) => array);

    return formatDataset(labels, dataset, (element, label) => {
      if (element.dateTime === label) return Number(element.value);
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

export default StepsComponent;
