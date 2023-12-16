import * as React from 'react';
import { Box, Stack } from '@mui/material';
import Task from '../Task';
import { ITaskColumnProps } from '../types';
import { useDrag, useDrop } from 'react-dnd';
import { useState } from 'react';
import { UpdateTask } from '../../Modal/UpdateTask';

const TaskColumnComponent: React.FC<ITaskColumnProps> = ({
  tasks,
  updateTaskColumn,
  status,
}) => {
  const [, ref] = useDrop({
    accept: 'ITEM',
    drop: (item: any, monitor: any) => {
      updateTaskColumn(item, status);

      //  if (tasks.length > 0) updateTaskColumn(item, tasks[0].status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <>
      <Stack
        sx={{
          height: '100vh',
          width: '33vw',
          minWidth: '33vw',
          minHeight: '100vh',
        }}
        flexGrow={1}
        ref={ref}
        direction="column"
        gap={2}
      >
        {tasks !== null && tasks.length > 0 ? (
          tasks.map((task, index) => <Task task={task} />)
        ) : (
          <Box
            sx={{
              height: '100vh',
              width: '33vw',
              minWidth: '33vw',
              minHeight: '100vh',
            }}
          ></Box>
        )}
      </Stack>
    </>
  );
};

export default React.memo(TaskColumnComponent);
