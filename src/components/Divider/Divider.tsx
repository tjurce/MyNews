import React from "react";
import "./Divider.scss";

interface DividerProps {
  width?: string | number;
  height?: string | number;
  color?: string;
}

const Divider: React.FC<DividerProps> = ({
  width = "100%",
  height = "1px",
  color = "#ccc",
}) => {
  return (
    <div
      className="divider"
      role="separator"
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        backgroundColor: color,
      }}
    />
  );
};

export default Divider;
