import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { PropsWithChildren } from '../../react-app-env';
import { EyeDisabled } from '../Icons/EyeDisabled';
import { Logo } from '../Icons/Logo';
import SideBarItem from './SideBarItem';
import { SideBarProps } from './types';

const SideBarComponent: React.FC<PropsWithChildren<SideBarProps>> = ({
  onClick,
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: '10vh',
        backgroundColor: 'white',
        height: '90vh',
        width: '12vw',
        borderRight: '1px solid #E4EBFA',
        // visibility: sideBarVisible ? 'visible' : 'hidden',
      }}
    >
      {/* <Logo onClick={undefined} /> */}
      <Stack direction="column">
        <SideBarItem title="Platform Launch" />
        <SideBarItem title="Marketing Plan" />
        <SideBarItem title="Roadmap " />
      </Stack>

      <Stack></Stack>
      <Stack
        sx={{
          position: 'absolute',
          bottom: '2vh',
          // opacity: '0.1',
          // borderRadius: '0px 100px 100px 0px;',
          // backgroundColor: '#635FC7',
        }}
        direction="row"
        justifyContent={'flex-start'}
        alignItems="center"
      >
        <EyeDisabled onClick={onClick} />
        <Box>
          <Typography>Hide SideBar</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SideBarComponent;
