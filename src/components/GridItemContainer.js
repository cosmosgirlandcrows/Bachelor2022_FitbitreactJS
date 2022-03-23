import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaHeartbeat } from "react-icons/fa";
import useFetch from "../hooks/useFetch";
import GridItemHeader from "./GridItemHeader";
import moment from "moment";
import Loader from "./Loader";

const GridItemContainer = ({
  title,
  gridColumn,
  children,
  access_token,
  url,
}) => {
  const buildUrl = (url, selectedDate) => {
    if (selectedDate === "1 week") {
      const date = moment().subtract(7, "days").format("yyyy-MM-DD");
      return `${url}${date}/today.json`;
    }
    if (selectedDate === "1 month") {
      const date = moment().subtract(1, "months").format("yyyy-MM-DD");
      return `${url}${date}/today.json`;
    }
    if (selectedDate === "3 months") {
      const date = moment().subtract(3, "months").format("yyyy-MM-DD");
      return `${url}${date}/today.json`;
    }
    if (selectedDate === "1 year") {
      const date = moment().subtract(1, "years").format("yyyy-MM-DD");
      return `${url}${date}/today.json`;
    }
    return null;
  };

  const getAverage = (data) => {
    const array = data["activities-heart"];
    let sum = 0;
    const resultArray = array
      .map((el) => el.value.restingHeartRate)
      .filter((el) => !isNaN(el));
    resultArray.forEach((el) => (sum += el));
    const average = Math.round(sum / resultArray.length);
    return average;
  };

  const handleUrl = (selectedDate) => {
    setFullUrl(() => buildUrl(url, selectedDate));
  };
  const [average, setAverage] = useState(null);
  const [data, loading, error, setFullUrl] = useFetch(access_token, null);

  useEffect(() => {
    if (data) setAverage(getAverage(data));
  }, [data]);

  return (
    <div className="gridItem" style={{ gridColumn: gridColumn }}>
      <GridItemHeader
        titletext={title}
        data={loading ? <Loader text="Loading..." /> : `${average} bpm`}
        icon={<FaHeartbeat />}
        handleUrl={handleUrl}
      />
      <div className="gridItemContent">{children}</div>
    </div>
  );
};

GridItemContainer.defaultProps = {
  gridColumn: "span 3",
};

GridItemContainer.propTypes = {
  gridColumn: PropTypes.string,
};

export default GridItemContainer;
