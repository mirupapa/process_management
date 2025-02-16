import { Cell } from "@silevis/reactgrid";

export interface TimeSlot {
  hour: number;
  minute: number;
}

export interface TimeHeaderCell extends Cell {
  type: "timeHeader";
}

export interface Task {
  id: number;
  title: string;
  start: TimeSlot;
  end: TimeSlot;
}

export interface TaskState extends Task {
  isDragging: boolean;
}

export interface TaskCell extends Cell {
  type: "task";
  task: TaskState;
}
