import * as React from 'react';
import Button from '@mui/material/Button';
import { ITaskProps } from './types';
import { Box, Stack, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import { useEffect, useMemo, useState } from 'react';
import { UpdateTask } from '../Modal/UpdateTask';
import { axios } from '../../api';

const TaskComponent: React.FC<ITaskProps> = ({ task }) => {
  const [updateTask, setUpdateTask] = useState(false);
  const [closed, setClosed] = useState(false);

  const handleClose = () => {
    setUpdateTask(false);
    setClosed(true);
  };

  const taskObject = useMemo(() => {
    return JSON.stringify(task);
  }, [closed]);

  useEffect(() => {
    async function updateSubTask() {
      setClosed(false);
      await axios.put('/tasks/update', JSON.parse(taskObject));
    }

    if (closed) updateSubTask();
  }, [taskObject]);

  const [, ref] = useDrag({
    type: 'ITEM',
    item: task, // a unique identifier for this type of draggable item
  });

  return (
    <>
      <Box
        ref={ref}
        sx={{
          backgroundColor: (theme) => theme.palette.modalColor.backgroundColor,
          boxShadow: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)',
          borderRadius: '8px',
          width: 'fit-content',
          padding: '1.1vw',
        }}
        onClick={() => setUpdateTask(true)}
      >
        <Stack direction="column">
          <Typography
            sx={{
              fontSize: '1.25rem',
              color: (theme) => theme.palette.primary.dark,
            }}
          >
            {task.title}
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              color: (theme) => theme.palette.grey[700],
            }}
          >
            {task.subtasks.filter((subTask) => subTask.isCompleted).length} of{' '}
            {task.subtasks.length} subtasks
          </Typography>
        </Stack>
      </Box>
      {updateTask && (
        <UpdateTask open={updateTask} handleClose={handleClose} task={task} />
      )}
    </>
  );
};

export default React.memo(TaskComponent);
