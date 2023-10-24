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
  const [itemSelected, setItemSelected] = useState<number>(0);
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
        {['Platform Launch', 'Marketing Plan', 'Roadmap'].map((item, index) => (
          <SideBarItem
            onClick={() => setItemSelected(index)}
            isItemSeleced={itemSelected === index}
            title={item}
          />
        ))}
      </Stack>
      <Stack
        sx={{
          position: 'absolute',
          bottom: '2vh',
          ':hover': {
            backgroundColor: 'rgba(99, 95, 199, 0.10)',
            borderRadius: '0px 100px 100px 0px',
          },
          width: '100%',
          // opacity: '0.1',
          // borderRadius: '0px 100px 100px 0px;',
          // backgroundColor: '#635FC7',
        }}
        direction="row"
        alignItems={'center'}
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
