import React, { useState, useEffect } from "react";
import { Compatible } from "@silevis/reactgrid";
import { useDraggable } from "@dnd-kit/core";
import { TaskCell } from "../types.js";
import { TimelineBackground } from "./TimelineBackground.js";

export const DraggableTaskCell: React.FC<{ cell: Compatible<TaskCell> }> = ({
  cell,
}) => {
  const { task, onResize } = cell;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  const [isResizing, setIsResizing] = useState(false);
  const [resizeEdge, setResizeEdge] = useState<'left' | 'right' | null>(null);
  const [initialX, setInitialX] = useState(0);
  const [initialWidth, setInitialWidth] = useState(0);

  const handleResizeStart = (edge: 'left' | 'right', e: React.MouseEvent) => {
    if (!isResizing) {
      setIsResizing(true);
      setResizeEdge(edge);
      setInitialX(e.clientX);
      setInitialWidth(width);
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - initialX;
      const pixelsPerMinute = 100 / 60;
      const minutesDelta = Math.round(deltaX / pixelsPerMinute);

      if (resizeEdge === 'left') {
        // 左端をドラッグ時は終了時刻を固定
        const newStartMinutes = Math.max(0, task.startMinutes - minutesDelta);
        if (newStartMinutes < task.endMinutes) {
          onResize?.({ ...task, startMinutes: newStartMinutes });
        }
      } else if (resizeEdge === 'right') {
        // 右端をドラッグ時は開始時刻を固定
        const newEndMinutes = Math.min(1440, task.endMinutes + minutesDelta);
        if (newEndMinutes > task.startMinutes) {
          onResize?.({ ...task, endMinutes: newEndMinutes });
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeEdge(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeEdge, initialX, initialWidth, task, onResize]);

  const startHour = Math.floor(task.startMinutes / 60);
  const startMinute = task.startMinutes % 60;
  const endHour = Math.floor(task.endMinutes / 60);
  const endMinute = task.endMinutes % 60;

  const startPosition = (task.startMinutes / 60) * 100;
  const width = ((task.endMinutes - task.startMinutes) / 60) * 100;

  const baseStyle: React.CSSProperties = {
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
    cursor: isResizing ? (resizeEdge === 'left' ? 'w-resize' : 'e-resize') : "move",
  };

  const style: React.CSSProperties = transform
    ? {
        ...baseStyle,
        transform: `translate3d(${transform.x}px,0px,0)`,
      }
    : baseStyle;

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
      <div ref={setNodeRef} {...(isResizing ? {} : listeners)} {...(isResizing ? {} : attributes)} style={{ ...style }}>
        <div
          className="resize-handle left"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "4px",
            height: "100%",
            cursor: "w-resize",
            backgroundColor: "transparent",
          }}
          onMouseDown={(e) => handleResizeStart('left', e)}
        />
        {`${task.title} (${startHour}:${startMinute.toString().padStart(2, "0")} - ${endHour}:${endMinute.toString().padStart(2, "0")})`}
        <div
          className="resize-handle right"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "4px",
            height: "100%",
            cursor: "e-resize",
            backgroundColor: "transparent",
          }}
          onMouseDown={(e) => handleResizeStart('right', e)}
        />
      </div>
    </div>
  );
};
