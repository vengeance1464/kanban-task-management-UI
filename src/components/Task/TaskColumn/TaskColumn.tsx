import * as React from 'react';
import { Stack } from '@mui/material';
import Task from '../Task';
import { ITaskColumnProps } from '../types';
import { useDrag, useDrop } from 'react-dnd';
import { useState } from 'react';
import { UpdateTask } from '../../Modal/UpdateTask';

const TaskColumnComponent: React.FC<ITaskColumnProps> = ({
  tasks,
  updateTaskColumn,
}) => {
  const [, ref] = useDrop({
    accept: 'ITEM',
    drop: (item: any, monitor: any) => {
      console.log('Dropped item:', item);

      if (tasks.length > 0) updateTaskColumn(item, tasks[0].status);
    },
  });

  return (
    <>
      <Stack
        sx={{ height: '100vh', width: '33vw', minWidth: '33vw' }}
        flexGrow={1}
        ref={ref}
        direction="column"
        gap={2}
      >
        {tasks.map((task, index) => (
          <Task task={task} />
        ))}
      </Stack>
    </>
  );
};

export default React.memo(TaskColumnComponent);
