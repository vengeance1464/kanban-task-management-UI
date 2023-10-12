import * as React from "react";
import { Stack } from "@mui/material";
import Task from "../Task";
import { ITaskColumnProps } from "../types";
import { useDrag, useDrop } from "react-dnd";
import { useState } from "react";

const TaskColumnComponent: React.FC<ITaskColumnProps> = ({
  tasks,
  updateTaskColumn,
}) => {
  const [, ref] = useDrop({
    accept: "ITEM",
    drop: (item: any, monitor: any) => {
      console.log("Dropped item:", item);
      let columnsCopy = updateTaskColumn(item, tasks[0].status);
    },
  });

  return (
    <Stack ref={ref} direction="column" gap={1}>
      {tasks.map((task, index) => (
        <Task task={task} />
      ))}
    </Stack>
  );
};

export default React.memo(TaskColumnComponent);
