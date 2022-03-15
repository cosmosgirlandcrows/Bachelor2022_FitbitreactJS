import React from "react";
import DataElement from "./DataElement";
import GridItemContainer from "./GridItemContainer";

const Grid = () => {
  return (
    <div className="container">
      <GridItemContainer title="Sleep" />
      <GridItemContainer title="Exercise" />
      <GridItemContainer title="Heart rate" />
      <GridItemContainer title="Steps" />
      <GridItemContainer>
        <DataElement
          icon={"element1Icon"}
          className={"dataElement"}
          compTitle={"Test Element 1"}
          textBodyMan={"Lorem ipsum dipsum jupp jupp"}
          fetchData={""}
        />
      </GridItemContainer>
    </div>
  );
};

export default Grid;
