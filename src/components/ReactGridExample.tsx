import React from "react";
import {
  ReactGrid,
  CellTemplate,
  Compatible,
  Cell,
  Uncertain,
} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

interface TimeSlot {
  hour: number;
  minute: number;
}

interface TimeHeaderCell extends Cell {
  type: "timeHeader";
}

interface Task {
  id: number;
  title: string;
  start: TimeSlot;
  end: TimeSlot;
}

interface TaskCell extends Cell {
  type: "task";
  task: Task;
}

class TimeHeaderCellTemplate implements CellTemplate<TimeHeaderCell> {
  getCompatibleCell(): Compatible<TimeHeaderCell> {
    return {
      type: "timeHeader",
      text: "",
      value: 0,
      nonEditable: true,
      style: { background: "#fafafa" },
    };
  }

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
}

class TaskCellTemplate implements CellTemplate<TaskCell> {
  getCompatibleCell({ task }: Uncertain<TaskCell>): Compatible<TaskCell> {
    if (!task) {
      throw new Error("Task is required");
    }
    return {
      type: "task",
      task,
      text: task.title,
      value: task.id,
      nonEditable: true,
    };
  }

  render(cell: Compatible<TaskCell>): React.ReactNode {
    const { task } = cell;
    const startHour = task.start.hour;
    const endHour = task.end.hour;
    const startMinutes = task.start.minute;
    const endMinutes = task.end.minute;

    const startPosition = (startHour + startMinutes / 60) * 100;
    const width =
      (endHour + endMinutes / 60 - (startHour + startMinutes / 60)) * 100;

    return (
      <div style={{ position: "relative", height: "100%", width: "2400px" }}>
        <div
          style={{
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
          }}
        >
          {`${task.title} (${startHour.toString().padStart(2, "0")}:${startMinutes.toString().padStart(2, "0")} - ${endHour.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")})`}
        </div>
      </div>
    );
  }
}

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
  const rows = [
    {
      rowId: "header",
      height: 40,
      cells: [
        { type: "text", text: "", style: { background: "#fafafa" } },
        { type: "timeHeader" },
      ],
    },
    ...TEST_DATA.map((task, index) => ({
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
    <div className="m-4 h-full overflow-auto">
      <ReactGrid
        rows={rows}
        columns={[
          { columnId: "title", width: 120 },
          { columnId: "timeline", width: 2400 },
        ]}
        customCellTemplates={{
          task: new TaskCellTemplate(),
          timeHeader: new TimeHeaderCellTemplate(),
        }}
        stickyTopRows={1}
        stickyLeftColumns={1}
      />
    </div>
  );
};
