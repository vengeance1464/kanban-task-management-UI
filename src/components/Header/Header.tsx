import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { HeaderProps } from './types';
import { Button } from '../Button';
import { Logo } from '../Icons/Logo';
import { useDevice } from '../utils/hooks/useDevice';
import { Plus } from '../Icons/Plus';
import { MobileLogo } from '../Icons/MobileLogo';
import { DownArrow } from '../Icons/DownArrow';
import { UpArrow } from '../Icons/UpArrow';

export const HeaderComponent: React.FC<HeaderProps> = ({
  setOpen,
  mobileSideBarVisible,
  setMobileSideBarVisible,
}) => {
  const { isMobile } = useDevice();
  return (
    <Stack
      sx={{
        display: 'fixed',
        top: '0',
        backgroundColor: (theme) => theme.palette.modalColor.backgroundColor,
        height: '10vh',
      }}
      direction="row"
      justifyContent={'space-between'}
      alignItems="center"
    >
      <Stack
        direction={'row'}
        justifyContent={'flex-start'}
        alignItems="center"
        gap={2}
      >
        {isMobile ? <MobileLogo /> : <Logo onClick={null} />}
        {!isMobile && (
          <Box
            sx={{ width: '1px', height: '10vh', backgroundColor: '#E4EBFA' }}
          ></Box>
        )}
        <Typography
          sx={{
            fontSize: '2rem',
            color: (theme) => theme.palette.primary.dark,
          }}
          onClick={() => console.log('efew')}
        >
          Platform Launch
        </Typography>
        {isMobile &&
          (!mobileSideBarVisible ? (
            <DownArrow onClick={() => setMobileSideBarVisible(true)} />
          ) : (
            <UpArrow />
          ))}
      </Stack>
      <Button
        variant="contained"
        onClick={() => {
          console.log('open');
          setOpen(true);
        }}
      >
        {isMobile ? <Plus /> : '+ Add New Task'}
      </Button>
    </Stack>
  );
};

export default HeaderComponent;
