import * as React from 'react';
import Button from '@mui/material/Button';
import { ITaskProps } from './types';
import { Box, Stack, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import { useState } from 'react';
import { UpdateTask } from '../Modal/UpdateTask';

const TaskComponent: React.FC<ITaskProps> = ({ task }) => {
  const [updateTask, setUpdateTask] = useState(false);

  const handleClose = () => {
    setUpdateTask(false);
  };

  const [, ref] = useDrag({
    type: 'ITEM',
    item: task, // a unique identifier for this type of draggable item
  });

  return (
    <>
      <Box
        ref={ref}
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)',
          borderRadius: '8px',
          width: 'fit-content',
          padding: '1.1vw',
        }}
        onClick={() => setUpdateTask(true)}
      >
        <Stack direction="column">
          <Typography>{task.title}</Typography>
          <Typography>
            {task.subtasks.filter((subTask) => subTask.isCompleted).length} of{' '}
            {task.subtasks.length} subtasks
          </Typography>
        </Stack>
      </Box>
      {updateTask && (
        <UpdateTask
          open={updateTask}
          handleClose={handleClose}
          task={{ ...task }}
        />
      )}
    </>
  );
};

export default React.memo(TaskComponent);
