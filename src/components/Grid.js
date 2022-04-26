import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import HeartrateComponent from "./HeartrateComponent";
import SleepComponent from "./SleepComponent";
import StepsComponent from "./StepsComponent";
import CaloriesComponent from "./CaloriesComponent";
import Calendar from "react-calendar";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
// import "react-calendar/dist/Calendar.css";

const Grid = () => {
  const { userId, BASE_URL } = useContext(AuthenticationContext);
  //api endpoints
  const apiHeartrate = `${BASE_URL}${userId}/activities/heart/date/`;
  const apiSleep = `${BASE_URL}${userId}/sleep/date/`;
  const apiSteps = `${BASE_URL}${userId}/activities/steps/date/`;
  const apiCalories = `${BASE_URL}${userId}/activities/calories/date/`;

  const findWeekendDays = ({ activeStartDate, date, view }) =>
    view === "month" && (date.getDay() === 0 || date.getDay() === 6)
      ? "tile weekend"
      : "tile";

  const minDate = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return d;
  };

  return (
    <div className="container">
      <HeartrateComponent base_url={apiHeartrate} />
      <SleepComponent base_url={apiSleep} />
      <StepsComponent base_url={apiSteps} />
      <CaloriesComponent base_url={apiCalories} />
      <Calendar
        className="calendar"
        tileClassName={findWeekendDays}
        nextLabel={<MdKeyboardArrowRight className="calendarArrowIcon" />}
        next2Label={null}
        prevLabel={<MdKeyboardArrowLeft className="calendarArrowIcon" />}
        prev2Label={null}
        showNeighboringMonth={false}
        minDetail="year"
        minDate={minDate()}
        maxDate={new Date()}
      />
    </div>
  );
};

export default Grid;
