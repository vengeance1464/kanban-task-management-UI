import { Grid, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { ITaskGridProps } from './types';
import Task from '../Task/Task';
import { useSelector } from 'react-redux';
import { boardsSelector } from '../../redux/board/selector';
import SuggestionTask from '../Task/SuggestionTask';
import { currentBoardSelector } from '../../redux/currentBoard/selector';

const TaskGrid: React.FC<PropsWithChildren<ITaskGridProps>> = ({ tasks }) => {
  const currentBoard = useSelector(currentBoardSelector);
  return (
    <Grid
      container
      spacing={2}
      sx={{ marginTop: '10px', marginLeft: 'auto', marginRight: 'auto' }}
    >
      {tasks.map((task: any, index: number) => (
        <>
          <Grid item md={4} xs={12} sm={6}>
            <SuggestionTask
              task={{
                id: index + 1,
                title: task.title,
                description: '',
                status: 'Todo',
                subtasks: task.subtasks.map((subtask: any, index: number) => ({
                  title: subtask.title,
                  isCompleted: false,
                  id: index + 1,
                })),
                boardId: currentBoard,
              }}
            />
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default TaskGrid;
