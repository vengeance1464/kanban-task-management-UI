import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { ITaskStateProps } from "../types";

const TaskStateComponent: React.FC<ITaskStateProps> = ({
  taskState,
  taskCount,
  color,
}) => {
  return (
    <Box>
      <Stack direction="row" alignItems={"center"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <circle cx="7.5" cy="7.5" r="7.5" fill={color} />
        </svg>
        <Typography>{taskState}</Typography>
        <Typography>{taskCount}</Typography>
      </Stack>
    </Box>
  );
};

export default React.memo(TaskStateComponent);
