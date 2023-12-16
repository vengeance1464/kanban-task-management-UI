import { Box, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import '../../styles.css';
import data from '../../data.json';
import TaskState from '../../components/Task/TaskState/TaskState';
import { TaskColumn } from '../../components/Task/TaskColumn';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Task } from '../../components/Task/types';
import { AddTask } from '../../components/Modal/AddTask';
import { useSelector } from 'react-redux';
import { columnsSelector } from '../../redux/columns/selector';
import { tasksSelector } from '../../redux/task/selectors';
import { useDispatch } from 'react-redux';
import { editTask, updateTasks } from '../../redux/task/taskSlice';
import { currentBoardSelector } from '../../redux/currentBoard/selector';
import { fetchUserTasksPayload } from '../../redux/task/payloads';
import { FirebaseContext } from '../../components/utils/firebase/FirebaseProvider';
import { axios } from '../../api';
import Button from '../../components/Button/Button';
import { Plus } from '../../components/Icons/Plus';
import { useDevice } from '../../components/utils/hooks/useDevice';

const TaskBoard: React.FC = ({ open, setOpen }: any) => {
  const columns = useSelector(columnsSelector);
  const tasks = useSelector(tasksSelector);
  const { isMobile } = useDevice();

  const currentBoard = useSelector(currentBoardSelector);

  const dispatch = useDispatch();
  const { user } = useContext(FirebaseContext);

  const updateTaskColumn = async (task: Task, updatedStatus: string) => {
    const res = await axios.put('/tasks/update', {
      ...task,
      status: updatedStatus,
    });
    dispatch(editTask({ ...task, status: updatedStatus }));
  };

  useEffect(() => {
    async function getAllTasks() {
      dispatch(updateTasks(await fetchUserTasksPayload(currentBoard)));
    }

    if (user && user !== null) getAllTasks();
  }, [currentBoard, user]);

  return (
    <>
      {user ? (
        <Stack
          sx={{
            overflowX: isMobile ? 'scroll' : 'hidden',
            overflowY: 'scroll',
            maxHeight: '90vh',
            height: '90vh',
          }}
          direction="row"
          gap={3}
        >
          {columns.map((column, index) => {
            return (
              <Stack sx={{ width: '33vw', height: '100vh' }} direction="column">
                <TaskState
                  taskState={column.name}
                  taskCount={
                    !(column.name in tasks) ? 0 : tasks[column.name].length
                  }
                  color={column.color ? column.color : '#67E2AE'}
                />
                {
                  <DndProvider backend={HTML5Backend}>
                    <TaskColumn
                      tasks={column.name in tasks ? tasks[column.name] : null}
                      status={column.name}
                      updateTaskColumn={updateTaskColumn}
                    />
                  </DndProvider>
                }
              </Stack>
            );
          })}
        </Stack>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: '90vh',
            height: '90vh',
          }}
        >
          <Typography sx={{ fontSize: '18px' }}>
            Please Create a Board to get Started
          </Typography>
        </Box>
      )}
      {user && open && (
        <AddTask open={open} handleClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default React.memo(TaskBoard);
