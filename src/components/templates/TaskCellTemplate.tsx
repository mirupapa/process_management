import React from "react";
import { CellTemplate, Compatible, Uncertain } from "@silevis/reactgrid";
import { TaskCell } from "../types.js";
import { DraggableTaskCell } from "./DraggableTaskCell.js";

export const TaskCellTemplate: CellTemplate<TaskCell> = {
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
      style: { paddingLeft: "0px" },
    };
  },
  isFocusable: () => false,
  render(cell: Compatible<TaskCell>): React.ReactNode {
    return <DraggableTaskCell cell={cell} />;
  },
};
