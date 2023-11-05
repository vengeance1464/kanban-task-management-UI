import { Stack } from '@mui/material';
import React, { useState } from 'react';
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
import { UpdateTask } from '../../components/Modal/UpdateTask';
import { Delete } from '../../components/Modal/Delete';
import { EyeEnabled } from '../../components/Icons/EyeEnabled';
import { useDispatch } from 'react-redux';
import { editTask } from '../../redux/task/taskSlice';

const TaskBoard: React.FC = ({ open, setOpen }: any) => {
  const columns = useSelector(columnsSelector);
  const tasks = useSelector(tasksSelector);

  const dispatch = useDispatch();
  console.log('Columns,', columns, 'tasks', tasks);

  const updateTaskColumn = (task: Task, updatedStatus: string) => {
    // let filteredColumnIndex: any = columns.findIndex(
    //   (column) => column.name === task.status,
    // );
    // let filteredTasks = columns[filteredColumnIndex].tasks.filter(
    //   (taskItem: any) => taskItem.title !== task.title,
    // );
    // columns[filteredColumnIndex].tasks = filteredTasks;
    // let finalColumnIndex: any = columns.findIndex(
    //   (column) => column.name === updatedStatus,
    // );
    // task.status = updatedStatus;
    // columns[finalColumnIndex].tasks.push(task);
    // console.log('columns ', columns);
    // setColumns([...columns]);
    //task.status = updatedStatus;
    dispatch(editTask({ ...task, status: updatedStatus }));
  };

  return (
    <>
      <Stack
        sx={{
          maxHeight: '100vh',
          // overflowY: 'scroll',
          // '&::-webkit-scrollbar': {
          //   width: '0.4em',
          // },
          // '&::-webkit-scrollbar-thumb': {
          //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
          // },
          // '&::-webkit-scrollbar-thumb:hover': {
          //   backgroundColor: 'rgba(0, 0, 0, 0.8)',
          // },
        }}
        direction="row"
        gap={3}
      >
        {columns.map((column, index) => {
          return (
            <Stack direction="column">
              <TaskState
                taskState={column.name}
                taskCount={
                  !(column.name in tasks) ? 0 : tasks[column.name].length
                }
                color={'#49C4E5'}
              />
              {column.name in tasks && tasks[column.name].length > 0 && (
                <DndProvider backend={HTML5Backend}>
                  <TaskColumn
                    tasks={tasks[column.name]}
                    updateTaskColumn={updateTaskColumn}
                  />
                </DndProvider>
              )}
            </Stack>
          );
        })}
      </Stack>
      {open && <AddTask open={open} handleClose={() => setOpen(false)} />}
    </>
  );
};

export default React.memo(TaskBoard);
