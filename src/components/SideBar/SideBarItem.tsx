import { Stack, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { Board } from '../Icons/Board';
import { SideBarItemProps } from './types';

const SideBarItem: React.FC<PropsWithChildren<SideBarItemProps>> = ({
  title,
}) => {
  return (
    <Stack direction="row" justifyContent={'flex-start'} alignItems="center">
      <Board onClick={null} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

export default SideBarItem;
