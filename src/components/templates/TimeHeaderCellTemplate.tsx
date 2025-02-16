import React from "react";
import { CellTemplate, Compatible } from "@silevis/reactgrid";
import { TimeHeaderCell } from "../types.js";

export const TimeHeaderCellTemplate: CellTemplate<TimeHeaderCell> = {
  getCompatibleCell(): Compatible<TimeHeaderCell> {
    return {
      type: "timeHeader",
      text: "",
      value: 0,
      nonEditable: true,
      style: { background: "#fafafa" },
    };
  },

  render(): React.ReactNode {
    return (
      <div style={{ position: "relative", height: "100%", width: "2400px" }}>
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${i * 100}px`,
              width: "100px",
              height: "100%",
              borderRight: "1px solid #e8e8e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: i % 2 === 0 ? "#fafafa" : "#f5f5f5",
              fontWeight: "bold",
              fontSize: "13px",
              color: "#595959",
              boxShadow: i === 0 ? "1px 0 0 0 #e8e8e8" : "none",
            }}
          >
            {`${i.toString().padStart(2, "0")}:00`}
          </div>
        ))}
      </div>
    );
  }
};
