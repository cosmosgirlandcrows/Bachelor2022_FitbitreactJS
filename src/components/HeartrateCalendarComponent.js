import {
  getAverage,
  formatDataset,
  getDataset,
  composeUrl,
  generateTitleText,
} from "../utils/utils";
import GridItemHeader from "./GridItemHeader";
import GridItemContent from "./GridItemContent";
import Loader from "./Loader";
import LineChart from "./LineChart";
import { FaHeartbeat } from "react-icons/fa";
import Calendar from "react-calendar";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRef, useState, useContext, useEffect } from "react";
import CalendarToggle from "./CalendarToggle";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import moment from "moment";
import useFetch from "../hooks/useFetch";

const HeartrateCalendarComponent = ({ base_url }) => {
  const base_title = "Average heartrate";
  const value = "-- bpm";
  const base_icon = <FaHeartbeat className="heartIcon" />;
  const { access_token } = useContext(AuthenticationContext);

  const [avgValue, setAvgValue] = useState(value);
  const [isToggled, setIsToggled] = useState(true);
  const [title, setTitle] = useState(base_title);

  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  //API state
  const endDate = moment().format("yyyy-MM-DD");
  const startDate = moment().subtract(1, "years").format("yyyy-MM-DD");
  const url = `${base_url}${startDate}/${endDate}/1min.json`;

  const [data, loading, error] = useFetch(access_token, url);
  const [filteredDates, setFilteredDates] = useState(null);

  const [intradayData, intradayLoading, , setIntradayUrl] = useFetch(
    access_token,
    null
  );

  useEffect(() => {
    if (data) {
      const dates = data["activities-heart"]
        .filter((e) => e.value?.restingHeartRate)
        .reduce((acc, curr) => {
          return { ...acc, [curr.dateTime]: curr.dateTime };
        }, {});
      setFilteredDates(dates);
      console.log(dates);
    }
  }, [data]);

  useEffect(() => {
    if (intradayData) {
      const intraday = intradayData["activities-heart-intraday"].dataset;
      const values = intraday.map((el) => el.value);
      setDataset(values);
      setLabels(intraday.map((el) => el.time));
      setAvgValue(getAverage(values) + " bpm");
    }
  }, [intradayData]);

  const onCalendarToggle = () => {
    setIsToggled(!isToggled);
  };

  const onCalandarDateChange = (date) => {
    const dateFormatter = Intl.DateTimeFormat("sv-SE");
    const d = dateFormatter.format(date).toString();
    setTitle(generateTitleText(base_title, d));
    setIntradayUrl(`${base_url}${d}/1d/1min.json`);
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

  return (
    <>
      <div className={"gridItem span-6"}>
        <GridItemHeader
          titletext={title}
          value={
            loading || intradayLoading ? <Loader text="Loading..." /> : avgValue
          }
          icon={base_icon}
        >
          {filteredDates ? (
            <CalendarToggle
              onCalendarToggle={onCalendarToggle}
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

export default HeartrateCalendarComponent;
