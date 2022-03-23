import { useState } from "react";
import GridItemContainer from "./GridItemContainer";

export const Heartrate = () => {
  const [title, setTitle] = useState("Average heartrate");
  return (
    <>
      <GridItemContainer title={title} />
    </>
  );
};
