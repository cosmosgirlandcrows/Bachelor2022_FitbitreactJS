import React from "react";
import DataElement from "./DataElement";
import GridItemContainer from "./GridItemContainer";

const Grid = ({ heartRate }) => {
  return (
    <div className="container">
      <GridItemContainer title="Sleep" />
      <GridItemContainer title="Exercise" />
      <GridItemContainer title="Heart rate">
        <DataElement
          icon={"element1Icon"}
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
