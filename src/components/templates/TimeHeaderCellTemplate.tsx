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
      style: { background: "#fafafa", paddingLeft: "0" },
    };
  },

  render(): React.ReactNode {
    return (
      <div style={{ position: "relative", height: "100%", width: "2400px" }}>
        {Array.from({ length: 96 }, (_, i) => {
          const minutes = i * 15;
          const hour = Math.floor(minutes / 60);
          const minute = minutes % 60;
          const isHourMark = minute === 0;
          const isHalfHourMark = minute === 30;
          const isQuarterMark = minute === 15 || minute === 45;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(minutes / 60) * 100}px`,
                width: "25px",
                height: "100%",
                borderLeft: isHourMark
                  ? "2px solid #d9d9d9"
                  : isHalfHourMark
                    ? "1px solid #e8e8e8"
                    : isQuarterMark
                      ? "1px dashed #f0f0f0"
                      : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: hour % 2 === 0 ? "#fafafa" : "#f5f5f5",
                fontSize: "13px",
                color: "#595959",
              }}
            >
              {isHourMark && (
                <div
                  style={{
                    position: "absolute",
                    width: "50px",
                    textAlign: "left",
                    fontWeight: "bold",
                    left: "4px",
                    whiteSpace: "nowrap",
                    zIndex: 1,
                  }}
                >
                  {`${hour.toString().padStart(2, "0")}:00`}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  },
};
