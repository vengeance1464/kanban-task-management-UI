import { Box, Stack, Typography } from '@mui/material';
import React, { PropsWithChildren, useState } from 'react';
import { Board } from '../Icons/Board';
import { SideBarItemProps } from './types';
import { useTheme } from '@emotion/react';

const SideBarItem: React.FC<PropsWithChildren<SideBarItemProps>> = ({
  title,
  onClick,
  isItemSeleced,
}) => {
  const [selected, setSelected] = useState(false);
  const theme: any = useTheme();
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => {
        if (!isItemSeleced) setSelected(true);
      }}
      onMouseLeave={() => {
        if (!isItemSeleced) setSelected(false);
      }}
    >
      <Stack
        sx={{
          ':hover': {
            backgroundColor: (theme) =>
              !isItemSeleced && theme.palette.otherColor.primaryLightColor,
          },
          borderRadius: '0px 100px 100px 0px',
          backgroundColor: (theme) =>
            isItemSeleced && theme.palette.primary.main,
        }}
        direction="row"
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        <Board
          fillColor={
            isItemSeleced
              ? '#fff'
              : selected
              ? theme.palette.primary.main
              : theme.palette.grey[700]
          }
          onClick={null}
        />
        <Typography
          sx={{
            color: isItemSeleced
              ? '#fff'
              : (theme) => selected && theme.palette.primary.main,
          }}
        >
          {title}
        </Typography>
      </Stack>
    </div>
  );
};

export default SideBarItem;
