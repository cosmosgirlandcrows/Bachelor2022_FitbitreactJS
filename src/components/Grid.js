import React from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import GridItemContainer from "./GridItemContainer";
import { Heartrate } from "./Heartrate";

const Grid = ({ heartRate }) => {
  const { access_token, userId, BASE_URL } = useContext(AuthenticationContext);
  const apiHeartrate = `${BASE_URL}${userId}/activities/heart/date/`;
  const apiSleep = `${BASE_URL}${userId}/devices.json`;
  const apiExercise = `${BASE_URL}${userId}/devices.json`;

  return (
    <div className="container">
      {/* <GridItemContainer title="Sleep" />
      <GridItemContainer title="Exercise" /> */}
      <GridItemContainer
        title="Average heartrate"
        access_token={access_token}
        url={apiHeartrate}
      />
      {/* <Heartrate /> */}
      {/* <GridItemContainer title="Heart rate">
        <DataElement
          icon={""}
          className={"dataElement"}
          compTitle={"Test Element 1"}
          textBodyMan={"Lorem ipsum dipsum jupp jupp"}
          fetchData={heartRate}
        />
      </GridItemContainer> */}
      {/* <GridItemContainer title="Steps" /> */}
    </div>
  );
};

export default Grid;
