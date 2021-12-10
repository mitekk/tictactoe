import React from "react";
import "./line.css";

type Props = {
  vertical?: boolean;
};

const Line = ({ vertical }: Props) => (
  <div className={`line ${vertical ? "vertical" : "horizontal"}`}></div>
);

export default Line;
