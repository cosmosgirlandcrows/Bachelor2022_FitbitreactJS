import GridItemContainer from "./GridItemContainer";
import { formatDataset } from "../utils/utils";
import { getDataset } from "../utils/utils";
import { FaBurn } from "react-icons/fa";

const CaloriesComponent = ({ base_url }) => {
  const base_title = "Total calories burned";
  const base_value = "-- kcal";
  const base_icon = <FaBurn className="burnIcon" />;
  const baseProps = { base_title, base_url, base_value, base_icon };

  const handleData = (data) => {
    console.log(data);
    const dataset = getDataset(data, "activities-calories");
    const value = dataset((array) => {
      return array.reduce((sum, curr) => sum + Number(curr.value), 0);
    });
    return value === "0" ? "-- kcal" : value + " kcal";
  };

  const handleChartData = (labels, data) => {
    const dataset = getDataset(data, "activities-calories")((array) => array);

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

export default CaloriesComponent;
