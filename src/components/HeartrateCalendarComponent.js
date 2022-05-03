import { getAverage, generateTitleText } from "../utils/utils";
import GridItemHeader from "./GridItemHeader";
import GridItemContent from "./GridItemContent";
import Loader from "./Loader";
import LineChart from "./LineChart";
import { FaHeartbeat } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import CalendarToggle from "./CalendarToggle";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import moment from "moment";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";

const HeartrateCalendarComponent = ({ base_url }) => {
  const { access_token } = useContext(AuthenticationContext);
  //Header state
  const [avgValue, setAvgValue] = useState("-- bpm");
  const [title, setTitle] = useState("Average heartrate on");
  //Chart state
  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  //State for handling api calls to fetch data
  //Returns all heart rate data from the past year
  const [data, loading, , setDatesUrl] = useFetch(access_token, null);
  //Date parameters for url.
  const [[, intradayEndDate], setIntradayDateRange] =
    useLocalStorage("intradayDateRange");
  //Dates that only contain heart rate data
  const [filteredDates, setFilteredDates] = useLocalStorage("intradayDates");
  //State for handling 24h heart rate
  const [intradayData, intradayLoading, , setIntradayUrl] = useFetch(
    access_token,
    null
  );

  //Gets called only on first render
  useEffect(() => {
    const endDate = moment().format("yyyy-MM-DD");
    const startDate = moment(endDate).subtract(1, "years").format("yyyy-MM-DD");
    let url = `${base_url}${startDate}/${endDate}/1min.json`;
    if (intradayEndDate && intradayEndDate !== endDate) {
      //Checks if date from localStorage is different from todays date and refetches only days that have not been cached before
      let url = `${base_url}${intradayEndDate}/${endDate}/1min.json`;
      setIntradayDateRange([startDate, endDate]);
      setDatesUrl(url);
    }
    if (intradayEndDate && !filteredDates) {
      //Makes api call if filtered dates are not found in localStorage
      setDatesUrl(url);
    }
    if (!intradayEndDate) {
      //Saves url params in localStorage if initially empty and makes api call
      setIntradayDateRange([startDate, endDate]);
      setDatesUrl(url);
    }
  }, []);

  //Runs when data variable from api call returns a response
  useEffect(() => {
    if (data) {
      //Removes dates without heartrate data
      const filteredDates = data["activities-heart"]
        .filter((e) => e.value?.restingHeartRate)
        .reduce((a, c) => ({ ...a, [c.dateTime]: c.dateTime }), {});
      //Combines previous filtered dates with current dates and saves to localStorage
      //Filtered dates are passed to calendar component to determine which days are clickable
      setFilteredDates((prev) => ({ ...prev, ...filteredDates }));
    }
  }, [data]);

  useEffect(() => {
    if (intradayData) {
      //Runs when api call returns 24h heart rate info.
      const intraday = intradayData["activities-heart-intraday"].dataset;
      const [values, labels] = intraday.reduce(
        ([v, t], curr) => {
          return [
            [...v, curr.value],
            [...t, curr.time],
          ];
        },
        [[], []]
      );
      //Passes data to chart state
      setDataset(values);
      setLabels(labels);
      //calculates average heartrate for given day
      const avg = getAverage(values) || "--";
      setAvgValue(avg + " bpm");
    }
  }, [intradayData]);

  const onCalandarDateChange = (date) => {
    if (intradayEndDate) {
      const dateFormatter = Intl.DateTimeFormat("sv-SE");
      const d = dateFormatter.format(date).toString();
      //Sets header title with selected date from calendar
      setTitle(generateTitleText("Average heartrate", d));
      //Makes api call to fetch detailed 24h heart rate data
      setIntradayUrl(`${base_url}${d}/1d/1min.json`);
    }
  };

  return (
    <>
      <div className={"gridItem span-6"}>
        <GridItemHeader
          titletext={title}
          value={
            loading || intradayLoading ? <Loader text="Loading..." /> : avgValue
          }
          icon={<FaHeartbeat className="heartIcon" />}
        >
          {intradayEndDate && filteredDates ? (
            <CalendarToggle
              onCalandarDateChange={onCalandarDateChange}
              dates={filteredDates}
            />
          ) : (
            <Loader text={"Loading calendar..."} />
          )}
        </GridItemHeader>
        <GridItemContent>
          <LineChart
            labels={labels}
            chartData={dataset}
            options={lineChartOptions}
          />
        </GridItemContent>
      </div>
    </>
  );
};

const lineChartOptions = {
  elements: {
    point: {
      borderWidth: 0,
      radius: 0,
      backgroundColor: "rgba(0,0,0,0)",
    },
  },
};

export default HeartrateCalendarComponent;
