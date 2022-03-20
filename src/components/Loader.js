import React from "react";

const Loader = ({ text, fontSize }) => {
  //source: https://projects.lukehaas.me/css-loaders/
  return (
    <div className="loader" style={{ fontSize: fontSize }}>
      <div className="loaderSpinner"></div>
      <p>{text}</p>
    </div>
  );
};

Loader.defaultProps = {
  text: "",
  fontSize: "1rem",
};

export default Loader;
