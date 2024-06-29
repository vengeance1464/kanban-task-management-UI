import { Box, Stack, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { ITaskProps, Task } from './types';

const SuggestionTask: React.FC<ITaskProps> = ({ task }) => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.modalColor.backgroundColor,
        boxShadow: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)',
        borderRadius: '8px',
        width: 'fit-content',
        padding: '1.5vw',
      }}
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
          {task.subtasks.length} subtasks
        </Typography>
      </Stack>
    </Box>
  );
};

export default SuggestionTask;
