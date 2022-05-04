import React, { useEffect, useState } from "react";
import { BsCalendarFill } from "react-icons/bs";
import Calendar from "react-calendar";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import OutsideClickHandler from "react-outside-click-handler";

const CalendarToggle = ({ dates, onCalandarDateChange }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [dateValue, setDateValue] = useState(() => {
    const mostRecent = Object.values(dates).slice(-1)[0];
    const parse = Date.parse(mostRecent);
    return new Date(parse);
  });

  useEffect(() => {
    onCalandarDateChange(dateValue);
  }, [dateValue]);

  const tileClassName = ({ activeStartDate, date, view }) => {
    let classes = "tile ";
    if (view === "month" && (date.getDay() === 0 || date.getDay() === 6)) {
      classes += "weekend ";
    }
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };
    if (
      view === "month" &&
      date.toLocaleString("en-US", options) ===
        dateValue.toLocaleDateString("en-US", options)
    ) {
      classes += "selectedDate";
    }
    return classes;
  };

  const minDate = () => {
    const lastDate = Object.values(dates).slice(0)[0];
    const parse = Date.parse(lastDate);
    return new Date(parse);
  };

  const setDisabled = ({ activeStartDate, date, view }) => {
    const dateFormatter = Intl.DateTimeFormat("sv-SE");
    return !dates[dateFormatter.format(date).toString()];
  };

  return (
    <div className="calendarContainer">
      <OutsideClickHandler onOutsideClick={() => setIsToggled(false)}>
        <button
          onClick={() => setIsToggled(!isToggled)}
          className="toggleCalendar"
        >
          <BsCalendarFill />
          <p>{isToggled ? "Hide Calendar" : "Show Calendar"}</p>
        </button>

        {isToggled && (
          <div className="calendarWrapper">
            <Calendar
              className="calendar"
              tileClassName={tileClassName}
              nextLabel={<MdKeyboardArrowRight className="calendarArrowIcon" />}
              next2Label={null}
              prevLabel={<MdKeyboardArrowLeft className="calendarArrowIcon" />}
              prev2Label={null}
              showNeighboringMonth={false}
              minDetail="year"
              minDate={minDate()}
              maxDate={new Date()}
              tileDisabled={setDisabled}
              onClickDay={(value, event) => {
                setDateValue(value);
                setIsToggled(!isToggled);
              }}
              defaultActiveStartDate={dateValue}
            />
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default CalendarToggle;
