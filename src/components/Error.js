import React from "react";

const Error = ({ errorCode, errorText, fontSize }) => {
  return (
    <div className="error" style={{ fontSize: fontSize }}>
      <p>
        {errorCode}
        {errorText && `: ${errorText}`}
      </p>
    </div>
  );
};

Error.defaultProps = {
  errorText: "",
  fontSize: "1rem",
};

export default Error;
