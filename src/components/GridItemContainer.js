import React, { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import {
  getDates,
  composeUrl,
  enumerateDates,
  generateTitleText,
} from "../utils/utils";
import DateSelector from "./DateSelector";
import GridItemHeader from "./GridItemHeader";
import GridItemContent from "./GridItemContent";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import Loader from "./Loader";
import LineChart from "./LineChart";

const GridItemContainer = ({ baseProps, handleData, handleChartData }) => {
  const { base_title, base_url, base_value, base_icon } = baseProps;
  const { access_token } = useContext(AuthenticationContext);

  //API state
  const [data, loading, error, setFullUrl] = useFetch(access_token, null);
  //Header state
  const [title, setTitle] = useState(base_title);
  const [value, setValue] = useState(base_value);
  //Chart state
  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  //Runs when API call returns data
  useEffect(() => {
    if (data) {
      //handleData is passed down as a prop from parent component
      const updatedVal = handleData(data);
      setValue(updatedVal);
      //handleData is passed down as a prop from parent component
      const chartDataset = handleChartData(labels, data);
      setDataset(chartDataset);
    }
  }, [data]);

  //Gets called when user selects date
  const handleDateChange = (selectedDate) => {
    const [startDate, endDate] = getDates(selectedDate);
    setLabels(enumerateDates(startDate, endDate));
    setTitle(generateTitleText(base_title, selectedDate));
    setFullUrl(composeUrl(base_url, startDate, endDate));
  };

  return (
    <div className="gridItem">
      <GridItemHeader
        titletext={title}
        value={loading ? <Loader text="Loading..." /> : value}
        icon={base_icon}
      >
        <DateSelector handleOnChange={handleDateChange} />
      </GridItemHeader>
      <GridItemContent>
        <LineChart labels={labels} chartData={dataset} />
      </GridItemContent>
    </div>
  );
};

export default GridItemContainer;
