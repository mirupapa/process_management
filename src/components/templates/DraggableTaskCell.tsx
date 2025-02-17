import React, { useState, useEffect } from "react";
import { Compatible } from "@silevis/reactgrid";
import { useDraggable } from "@dnd-kit/core";
import { TaskCell } from "../types.js";
import { TimelineBackground } from "./TimelineBackground.js";

export const DraggableTaskCell: React.FC<{ cell: Compatible<TaskCell> }> = ({
  cell,
}) => {
  const { task, updateCall } = cell;
  const [localTask, setLocalTask] = useState(task);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeEdge, setResizeEdge] = useState<'left' | 'right' | null>(null);
  const [initialX, setInitialX] = useState(0);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  // Set isDragging when drag starts
  useEffect(() => {
    if (transform && !isDragging) {
      setIsDragging(true);
    }
  }, [transform, isDragging]);

  useEffect(() => {
    if (!transform || !isDragging) return;

    const deltaX = transform.x;
    const pixelsPerMinute = 100 / 60;
    const minutesDelta = Math.round(deltaX / pixelsPerMinute);
    
    const newStartMinutes = Math.max(0, task.startMinutes + minutesDelta);
    const newEndMinutes = Math.min(1440, task.endMinutes + minutesDelta);
    
    setLocalTask(prev => ({
      ...prev,
      startMinutes: newStartMinutes,
      endMinutes: newEndMinutes,
    }));
  }, [transform, isDragging, task]);

  useEffect(() => {
    if (!isDragging) return;

    const handleDragEnd = () => {
      setIsDragging(false);
      if (localTask !== task) {
        updateCall?.(localTask);
      }
    };

    document.addEventListener('mouseup', handleDragEnd);
    return () => document.removeEventListener('mouseup', handleDragEnd);
  }, [isDragging, localTask, task, updateCall]);

  const handleResizeStart = (edge: 'left' | 'right', e: React.MouseEvent) => {
    if (!isResizing) {
      setIsResizing(true);
      setResizeEdge(edge);
      setInitialX(e.clientX);
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (!isResizing) {
      if (localTask !== task) {
        updateCall?.(localTask);
      }
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - initialX;
      const pixelsPerMinute = 100 / 60;
      const minutesDelta = Math.round(deltaX / pixelsPerMinute);

      if (resizeEdge === 'left') {
        const newStartMinutes = Math.max(0, task.startMinutes - minutesDelta);
        const minStartMinutes = Math.max(0, task.endMinutes - 1440); // 最大24時間
        const maxStartMinutes = task.endMinutes - 15; // 最小15分の幅を確保
        const constrainedStartMinutes = Math.min(Math.max(newStartMinutes, minStartMinutes), maxStartMinutes);
        
        if (constrainedStartMinutes < task.endMinutes) {
          setLocalTask(prev => ({
            ...prev,
            startMinutes: constrainedStartMinutes,
            endMinutes: task.endMinutes, // 終了時刻を明示的に固定
          }));
        }
      } else if (resizeEdge === 'right') {
        const newEndMinutes = Math.min(1440, task.endMinutes + minutesDelta);
        const minEndMinutes = task.startMinutes + 15; // 最小15分の幅を確保
        const maxEndMinutes = Math.min(1440, task.startMinutes + 1440); // 最大24時間
        const constrainedEndMinutes = Math.min(Math.max(newEndMinutes, minEndMinutes), maxEndMinutes);

        if (constrainedEndMinutes > task.startMinutes) {
          setLocalTask(prev => ({
            ...prev,
            startMinutes: task.startMinutes, // 開始時刻を明示的に固定
            endMinutes: constrainedEndMinutes,
          }));
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeEdge(null);
      if (localTask !== task) {
        updateCall?.(localTask);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeEdge, initialX, task, localTask, updateCall]);

  const startHour = Math.floor(localTask.startMinutes / 60);
  const startMinute = localTask.startMinutes % 60;
  const endHour = Math.floor(localTask.endMinutes / 60);
  const endMinute = localTask.endMinutes % 60;

  const startPosition = (localTask.startMinutes / 60) * 100;
  const width = ((localTask.endMinutes - localTask.startMinutes) / 60) * 100;

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
            backgroundColor: isResizing && resizeEdge === 'left' ? "rgba(255, 255, 255, 0.3)" : "transparent",
            zIndex: 1
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
            backgroundColor: isResizing && resizeEdge === 'right' ? "rgba(255, 255, 255, 0.3)" : "transparent",
            zIndex: 1
          }}
          onMouseDown={(e) => handleResizeStart('right', e)}
        />
      </div>
    </div>
  );
};
