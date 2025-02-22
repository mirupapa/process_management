import React from "react";
import { Compatible, Uncertain } from "@silevis/reactgrid";
import { TaskCell, TaskState } from "../types.js";
import { DraggableTaskCell } from "./DraggableTaskCell.js";

export const TaskCellTemplate = ({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<TaskState[]>>;
}) => {
  const getCompatibleCell = ({
    task,
  }: Uncertain<TaskCell>): Compatible<TaskCell> => {
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
  };
  const isFocusable = () => false;
  const render = (cell: Compatible<TaskCell>): React.ReactNode => {
    return <DraggableTaskCell cell={cell} setTasks={setTasks} />;
  };

  return {
    getCompatibleCell,
    isFocusable,
    render,
  };
};
