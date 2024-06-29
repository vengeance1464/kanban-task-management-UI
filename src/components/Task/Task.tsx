import * as React from 'react';
import Button from '@mui/material/Button';
import { ITaskProps } from './types';
import { Box, Stack, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import { useEffect, useMemo, useState } from 'react';
import { UpdateTask } from '../Modal/UpdateTask';
import { axios } from '../../api';
import { AddTask } from '../Modal/AddTask';
import { Delete } from '../Modal/Delete';
import { deleteTask } from '../../redux/task/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { currentBoardSelector } from '../../redux/currentBoard/selector';

const TaskComponent: React.FC<ITaskProps> = ({ task }) => {
  const [updateTask, setUpdateTask] = useState(false);
  const [closed, setClosed] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [deleteCurrentTask, setDeleteCurrentTask] = useState(false);
  const dispatch = useDispatch();

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

  const handleMenuItem = (index: number) => {
    if (index === 0) {
      //handleClose();
      setEditTask(true);
    } else {
      setDeleteCurrentTask(true);
    }
    handleClose();
  };
  return (
    <>
      <Box
        ref={ref}
        sx={{
          backgroundColor: (theme) => theme.palette.modalColor.backgroundColor,
          boxShadow: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)',
          borderRadius: '8px',
          width: '10vw',
          padding: '1.5vw',
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
              marginTop: '5px',
            }}
          >
            {task.subtasks.filter((subTask) => subTask.isCompleted).length} of{' '}
            {task.subtasks.length} subtasks
          </Typography>
        </Stack>
      </Box>
      {updateTask && (
        <UpdateTask
          open={updateTask}
          handleClose={handleClose}
          handleMenuItem={handleMenuItem}
          task={task}
        />
      )}
      {editTask && (
        <AddTask
          open={editTask}
          isUpdate={true}
          handleClose={() => setEditTask(false)}
          task={task}
        />
      )}
      {deleteCurrentTask && (
        <Delete
          onDelete={async () => {
            dispatch(deleteTask(task));
            await axios.delete('/tasks/delete', {
              id: task.id,
              boardId: task.boardId,
            });
            setDeleteCurrentTask(false);
          }}
          onCancel={() => setDeleteCurrentTask(false)}
          title={'Delete this task?'}
          description={`Are you sure you want to delete the 
            ‘${task.title}’ task and its subtasks? This action cannot be reversed.`}
          open={deleteCurrentTask}
          handleClose={() => setDeleteCurrentTask(false)}
        />
      )}
    </>
  );
};

export default React.memo(TaskComponent);
