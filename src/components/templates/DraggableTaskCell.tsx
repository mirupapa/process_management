import React from "react";
import { Compatible } from "@silevis/reactgrid";
import { useDraggable } from "@dnd-kit/core";
import { TaskCell } from "../types.js";

export const DraggableTaskCell: React.FC<{ cell: Compatible<TaskCell> }> = ({ cell }) => {
  const { task } = cell;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString()
  });

  const startHour = task.start.hour;
  const endHour = task.end.hour;
  const startMinutes = task.start.minute;
  const endMinutes = task.end.minute;

  const startPosition = (startHour + startMinutes / 60) * 100;
  const width =
    (endHour + endMinutes / 60 - (startHour + startMinutes / 60)) * 100;

  const style: React.CSSProperties = transform ? {
    transform: `translate3d(${transform.x}px,0px,0)`,
    position: "absolute",
    left: `${startPosition}px`,
    width: `${width}px`,
    height: "36px",
    top: "7px",
    backgroundColor: "#1677ff",
    color: "white",
    borderRadius: "4px",
    padding: "0 8px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    cursor: "move",
    zIndex: task.isDragging ? 2 : 1,
  } : {
    position: "absolute",
    left: `${startPosition}px`,
    width: `${width}px`,
    height: "36px",
    top: "7px",
    backgroundColor: "#1677ff",
    color: "white",
    borderRadius: "4px",
    padding: "0 8px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    cursor: "move",
    zIndex: task.isDragging ? 2 : 1,
  };

  return (
    <div style={{ position: "relative", height: "100%", width: "2400px" }}>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
      >
        {`${task.title} (${Math.floor(startHour)}:${startMinutes.toString().padStart(2, "0")} - ${Math.floor(endHour)}:${endMinutes.toString().padStart(2, "0")})`}
      </div>
    </div>
  );
};
