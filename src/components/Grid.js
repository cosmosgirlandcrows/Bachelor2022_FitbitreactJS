import React from "react";
import DataElement from "./DataElement";
import GridItemContainer from "./GridItemContainer";
//import { FaHeartbeat } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const Grid = ({ heartRate }) => {
  return (
    <div className="container">
      <FaTimes />
      <GridItemContainer title="Sleep" />
      <GridItemContainer title="Exercise" />
      <GridItemContainer title="Heart rate">
        <DataElement
          icon={""}
          className={"dataElement"}
          compTitle={"Test Element 1"}
          textBodyMan={"Lorem ipsum dipsum jupp jupp"}
          fetchData={heartRate}
        />
      </GridItemContainer>
      <GridItemContainer title="Steps" />
    </div>
  );
};

export default Grid;
