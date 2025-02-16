import { Cell } from "@silevis/reactgrid";

export interface TimeHeaderCell extends Cell {
  type: "timeHeader";
}

export interface Task {
  id: number;
  title: string;
  startMinutes: number; // 0-1440 (24時間 * 60分)
  endMinutes: number;   // 0-1440 (24時間 * 60分)
}

export interface TaskState extends Task {
  isDragging: boolean;
}

export interface TaskCell extends Cell {
  type: "task";
  task: TaskState;
}
