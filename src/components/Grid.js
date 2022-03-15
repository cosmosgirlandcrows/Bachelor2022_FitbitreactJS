import React from "react";
import DataElement from "./DataElement";
import GridItemContainer from "./GridItemContainer";

/* 
Credits:
Sleep icon - https://iconscout.com/icon/night-mode - Jemis Mali
*/
const Grid = ({ element1_Icon, heartRate }) => {
  return (
    <div className="container">

      <GridItemContainer title="Sleep">
      <DataElement
          icon={element1_Icon}
          className={"dataElement"}
          compTitle={"Test Element 1"}
          textBodyMan={"Lorem ipsum dipsum jupp jupp"}
          fetchData={heartRate}
        />
        </GridItemContainer>

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
