import { Box, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { PropsWithChildren } from '../../react-app-env';
import { EyeDisabled } from '../Icons/EyeDisabled';
import { Logo } from '../Icons/Logo';
import SideBarItem from './SideBarItem';
import { SideBarProps } from './types';
import { DarkTheme } from '../Icons/DarkTheme';
import { LightTheme } from '../Icons/LightTheme';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Toggle } from '../Toggle';
import { ThemeContext } from '../../themes/ThemeProvider';

const SideBarComponent: React.FC<PropsWithChildren<SideBarProps>> = ({
  onClick,
}) => {
  const theme = useTheme();
  const [itemSelected, setItemSelected] = useState<number>(0);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const { theme: themeMode, setTheme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: '10vh',
        backgroundColor: (theme) => theme.palette.modalColor.backgroundColor,
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
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Stack
          direction="row"
          justifyContent={'center'}
          sx={{
            width: '85%',
            backgroundColor: (theme) => theme.palette.info.light,
            borderRadius: '6px',
            position: 'absolute',
            bottom: '8vh',
          }}
          alignItems={'center'}
        >
          <LightModeIcon
            sx={{
              color: theme.palette.grey[700],
            }}
          />
          <Toggle
            checked={themeMode === 'dark'}
            handleChange={() => {
              //setIsLightTheme(!isLightTheme);
              setTheme(themeMode === 'light' ? 'dark' : 'light');
            }}
          />
          <DarkModeIcon
            sx={{
              color: theme.palette.grey[700],
            }}
          />
        </Stack>
      </Box>

      <Stack
        sx={{
          position: 'absolute',
          bottom: '2vh',
          ':hover': {
            backgroundColor: (theme) =>
              theme.palette.otherColor.primaryLightColor,
            borderRadius: '0px 100px 100px 0px',
          },
          width: '100%',
          marginLeft: '0.5vw',
          // opacity: '0.1',
          // borderRadius: '0px 100px 100px 0px;',
          // backgroundColor: '#635FC7',
        }}
        direction="row"
        alignItems={'center'}
      >
        <EyeDisabled onClick={onClick} />
        <Typography>Hide SideBar</Typography>
      </Stack>
    </Box>
  );
};

export default SideBarComponent;
