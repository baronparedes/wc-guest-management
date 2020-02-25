import React from "react";

const DisplayLabel: React.FC = props => {
  return <label className="display-4">{props.children}</label>;
};

export default DisplayLabel;
