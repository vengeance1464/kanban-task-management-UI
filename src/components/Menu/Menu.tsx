import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { PropsWithChildren } from '../../react-app-env';
import { MenuProps } from './types';

export const Menu: React.FC<PropsWithChildren<MenuProps>> = ({
  items,
  open,
  handleItem,
  handleClose,
}) => {
  return (
    open && (
      <Stack
        sx={{
          position: 'absolute',
          zIndex: 2,
          right: 0,
          /* top: 10px; */
          width: '100px',
          top: '70px',
          backgroundColor: 'white',
        }}
        direction="column"
      >
        {items.map((item, index) => {
          return (
            <Typography onClick={() => handleItem(index)}>{item}</Typography>
          );
        })}
      </Stack>
    )
  );
};
