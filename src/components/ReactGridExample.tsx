import React, { useState } from "react";
import { DefaultCellTypes, ReactGrid, Row } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { TimeHeaderCellTemplate } from "./templates/TimeHeaderCellTemplate.js";
import { TaskCellTemplate } from "./templates/TaskCellTemplate.js";
import { Task, TaskCell, TaskState, TimeHeaderCell } from "./types.js";

const TEST_DATA: Task[] = [
  {
    id: 1,
    title: "タスク1",
    startMinutes: 9 * 60 + 15, // 9:15
    endMinutes: 12 * 60 + 30, // 12:30
  },
  {
    id: 2,
    title: "タスク2",
    startMinutes: 13 * 60, // 13:00
    endMinutes: 17 * 60 + 45, // 17:45
  },
  {
    id: 3,
    title: "タスク3",
    startMinutes: 10 * 60 + 30, // 10:30
    endMinutes: 15 * 60 + 15, // 15:15
  },
  {
    id: 4,
    title: "タスク4",
    startMinutes: 8 * 60 + 45, // 8:45
    endMinutes: 11 * 60 + 30, // 11:30
  },
  {
    id: 5,
    title: "タスク5",
    startMinutes: 14 * 60 + 15, // 14:15
    endMinutes: 18 * 60, // 18:00
  },
  {
    id: 6,
    title: "タスク6",
    startMinutes: 11 * 60, // 11:00
    endMinutes: 13 * 60 + 45, // 13:45
  },
  {
    id: 7,
    title: "タスク7",
    startMinutes: 15 * 60 + 30, // 15:30
    endMinutes: 19 * 60 + 15, // 19:15
  },
  {
    id: 8,
    title: "タスク8",
    startMinutes: 9 * 60 + 45, // 9:45
    endMinutes: 14 * 60 + 30, // 14:30
  },
  {
    id: 9,
    title: "タスク9",
    startMinutes: 12 * 60 + 15, // 12:15
    endMinutes: 16 * 60 + 45, // 16:45
  },
  {
    id: 10,
    title: "タスク10",
    startMinutes: 10 * 60, // 10:00
    endMinutes: 13 * 60 + 15, // 13:15
  },
];

export const ReactGridExample: React.FC = () => {
  const [tasks, setTasks] = useState<TaskState[]>(
    TEST_DATA.map((task) => ({ ...task, isDragging: false }))
  );

  const rows: Row<DefaultCellTypes | TimeHeaderCell | TaskCell>[] = [
    {
      rowId: "header",
      height: 40,
      cells: [
        { type: "text", text: "", style: { background: "#fafafa" } },
        {
          type: "timeHeader",
          text: "",
        } as TimeHeaderCell,
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
        } as DefaultCellTypes,
        {
          type: "task",
          task,
          text: "",
          style: {
            position: "relative",
            overflow: "visible",
          },
        } as TaskCell,
      ],
    })),
  ];

  return (
    <div className="m-4 h-full overflow-auto">
      <ReactGrid
        rows={rows}
        columns={[
          { columnId: "title", width: 120 },
          { columnId: "timeline", width: 2400 },
        ]}
        customCellTemplates={{
          task: TaskCellTemplate({ setTasks }),
          timeHeader: TimeHeaderCellTemplate,
        }}
        stickyTopRows={1}
        stickyLeftColumns={1}
      />
    </div>
  );
};
