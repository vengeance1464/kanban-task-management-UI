import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ITaskStateProps } from '../types';

const TaskStateComponent: React.FC<ITaskStateProps> = ({
  taskState,
  taskCount,
  color,
}) => {
  return (
    <Box sx={{ marginTop: '2.4vh', marginBottom: '2.4vh' }}>
      <Stack direction="row" alignItems={'center'}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <circle cx="7.5" cy="7.5" r="7.5" fill={color} />
        </svg>
        <Typography
          sx={{
            fontSize: '1rem',
            color: (theme) => theme.palette.grey[700],
            letterSpacing: '2.4px',
          }}
        >
          &nbsp;{taskState.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            fontSize: '1rem',
            color: (theme) => theme.palette.grey[700],
            letterSpacing: '2.4px',
          }}
        >
          &nbsp;({taskCount})
        </Typography>
      </Stack>
    </Box>
  );
};

export default React.memo(TaskStateComponent);
