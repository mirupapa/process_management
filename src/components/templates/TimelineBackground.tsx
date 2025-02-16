import React from "react";

interface TimelineBackgroundProps {
  width?: number;
}

export const TimelineBackground: React.FC<TimelineBackgroundProps> = ({ width = 2400 }) => {
  return (
    <div style={{ position: "absolute", height: "100%", width: `${width}px`, pointerEvents: "none" }}>
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
              borderRight: isHourMark
                ? "2px solid #d9d9d9"
                : isHalfHourMark
                ? "1px solid #e8e8e8"
                : isQuarterMark
                ? "1px dashed #f0f0f0"
                : "none",
              backgroundColor: hour % 2 === 0 ? "#fafafa" : "#f5f5f5",
              zIndex: 0,
            }}
          />
        );
      })}
    </div>
  );
};
