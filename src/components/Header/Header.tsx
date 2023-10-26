import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { HeaderProps } from './types';
import { Button } from '../Button';
import { Logo } from '../Icons/Logo';

export const HeaderComponent: React.FC<HeaderProps> = ({ setOpen }) => {
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
        <Logo onClick={null} />
        <Box
          sx={{ width: '1px', height: '10vh', backgroundColor: '#E4EBFA' }}
        ></Box>
        <Typography
          sx={{
            fontSize: '2rem',
            color: (theme) => theme.palette.primary.dark,
          }}
          onClick={() => console.log('efew')}
        >
          Platform Launch
        </Typography>
      </Stack>
      <Button
        title="+ Add New Task"
        variant="contained"
        onClick={() => {
          console.log('open');
          setOpen(true);
        }}
      />
    </Stack>
  );
};

export default HeaderComponent;
