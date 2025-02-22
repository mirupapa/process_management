import React, { useState } from "react";
import { Compatible } from "@silevis/reactgrid";
import { TaskCell, TaskState } from "../types.js";
import { TimelineBackground } from "./TimelineBackground.js";
import { Rnd } from "react-rnd";

export const DraggableTaskCell: React.FC<{
  cell: Compatible<TaskCell>;
  setTasks: React.Dispatch<React.SetStateAction<TaskState[]>>;
}> = ({ cell, setTasks }) => {
  const { task } = cell;

  const [dragPosition, setDragPosition] = useState({
    x: (task.startMinutes * 100) / 60,
    width: ((task.endMinutes - task.startMinutes) * 100) / 60,
  });

  // スタイル定義
  const baseStyle: React.CSSProperties = {
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
  };

  // リサイズ処理
  const handleResizeStop = (
    _e: any,
    direction: string,
    _ref: HTMLElement,
    delta: { width: number },
    position: { x: number }
  ) => {
    if (direction === "left") {
      setDragPosition((cur) => ({
        x:
          cur.width + delta.width > 25
            ? cur.x - delta.width
            : cur.x + cur.width - 25,
        width: cur.width + delta.width > 25 ? cur.width + delta.width : 25,
      }));
    } else if (direction === "right") {
      setDragPosition((cur) => ({
        x: cur.x,
        width: cur.width + delta.width > 25 ? cur.width + delta.width : 25,
      }));
    }
  };

  // ドラッグ終了時の処理
  const handleDragStop = (e: any, d: any) => {
    setDragPosition((cur) => ({
      ...cur,
      x: d.x,
    }));
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "2400px",
        overflow: "hidden",
      }}
    >
      <TimelineBackground />
      <Rnd
        size={{ width: dragPosition.width, height: 36 }}
        position={{ x: dragPosition.x, y: 7 }}
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        resizeGrid={[25, 36]} // 15分単位でスナップ（25px = 15分）
        dragGrid={[25, 0]}
        dragAxis="x"
        bounds="parent"
        enableResizing={{
          top: false,
          right: true,
          bottom: false,
          left: true,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        style={baseStyle}
      >
        {`${task.title} (${Math.floor(dragPosition.x / 100)}:${(
          (Math.floor(dragPosition.x % 100) / 100) *
          60
        )
          .toString()
          .padStart(2, "0")} - ${Math.floor(
          (dragPosition.x + dragPosition.width) / 100
        )}:${(
          (Math.floor((dragPosition.x + dragPosition.width) % 100) / 100) *
          60
        )
          .toString()
          .padStart(2, "0")})`}
      </Rnd>
    </div>
  );
};
