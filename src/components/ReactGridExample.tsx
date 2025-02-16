import React, { useState } from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { TimeHeaderCellTemplate } from "./templates/TimeHeaderCellTemplate.js";
import { TaskCellTemplate } from "./templates/TaskCellTemplate.js";
import { Task, TaskState } from "./types.js";
import { restrictToTimeRange } from "./modifiers/restrictToTimeRange.js";

const TEST_DATA: Task[] = [
  {
    id: 1,
    title: "タスク1",
    start: { hour: 9, minute: 15 },
    end: { hour: 12, minute: 30 },
  },
  {
    id: 2,
    title: "タスク2",
    start: { hour: 13, minute: 0 },
    end: { hour: 17, minute: 45 },
  },
  {
    id: 3,
    title: "タスク3",
    start: { hour: 10, minute: 30 },
    end: { hour: 15, minute: 15 },
  },
  {
    id: 4,
    title: "タスク4",
    start: { hour: 8, minute: 45 },
    end: { hour: 11, minute: 30 },
  },
  {
    id: 5,
    title: "タスク5",
    start: { hour: 14, minute: 15 },
    end: { hour: 18, minute: 0 },
  },
  {
    id: 6,
    title: "タスク6",
    start: { hour: 11, minute: 0 },
    end: { hour: 13, minute: 45 },
  },
  {
    id: 7,
    title: "タスク7",
    start: { hour: 15, minute: 30 },
    end: { hour: 19, minute: 15 },
  },
  {
    id: 8,
    title: "タスク8",
    start: { hour: 9, minute: 45 },
    end: { hour: 14, minute: 30 },
  },
  {
    id: 9,
    title: "タスク9",
    start: { hour: 12, minute: 15 },
    end: { hour: 16, minute: 45 },
  },
  {
    id: 10,
    title: "タスク10",
    start: { hour: 10, minute: 0 },
    end: { hour: 13, minute: 15 },
  },
];

export const ReactGridExample: React.FC = () => {
  const [tasks, setTasks] = useState<TaskState[]>(
    TEST_DATA.map(task => ({ ...task, isDragging: false }))
  );

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = Number(event.active.id);
    setTasks(prev =>
      prev.map(task => ({
        ...task,
        isDragging: task.id === taskId
      }))
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const taskId = Number(event.active.id);
    const delta = event.delta.x;
    const pixelsPerHour = 100;
    const hoursDelta = Math.round((delta / pixelsPerHour) * 4) / 4; // 15分単位

    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const newStartHour = task.start.hour + hoursDelta;
          const newEndHour = task.end.hour + hoursDelta;
          
          // 0-24時の範囲チェック
          if (newStartHour < 0 || newEndHour > 24) {
            return { ...task, isDragging: false };
          }

          // 時間と分を分離
          const startHourFloor = Math.floor(newStartHour);
          const startMinutes = Math.round((newStartHour - startHourFloor) * 60);
          const endHourFloor = Math.floor(newEndHour);
          const endMinutes = Math.round((newEndHour - endHourFloor) * 60);

          return {
            ...task,
            isDragging: false,
            start: {
              hour: startHourFloor,
              minute: startMinutes
            },
            end: {
              hour: endHourFloor,
              minute: endMinutes
            }
          };
        }
        return task;
      })
    );
  };

  const rows = [
    {
      rowId: "header",
      height: 40,
      cells: [
        { type: "text", text: "", style: { background: "#fafafa" } },
        { type: "timeHeader" },
      ],
    },
    ...tasks.map((task, index) => ({
      rowId: `row-${index}`,
      height: 50,
      cells: [
        {
          type: "text",
          text: task.title,
          style: { background: "#fafafa", padding: "8px" },
        },
        { type: "task", task, text: "" },
      ],
    })),
  ];

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToTimeRange]}
    >
      <div className="m-4 h-full overflow-auto">
        <ReactGrid
          rows={rows}
          columns={[
            { columnId: "title", width: 120 },
            { columnId: "timeline", width: 2400 },
          ]}
          customCellTemplates={{
            task: TaskCellTemplate,
            timeHeader: TimeHeaderCellTemplate,
          }}
          stickyTopRows={1}
          stickyLeftColumns={1}
        />
      </div>
    </DndContext>
  );
};
