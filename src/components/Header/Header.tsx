import * as React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { HeaderProps } from './types';
import { Button } from '../Button';
import { Logo } from '../Icons/Logo';
import { useDevice } from '../utils/hooks/useDevice';
import { Plus } from '../Icons/Plus';
import { MobileLogo } from '../Icons/MobileLogo';
import { DownArrow } from '../Icons/DownArrow';
import { UpArrow } from '../Icons/UpArrow';
import { useFirebaseAuth } from '../utils/hooks/useFirebaseAuth';
import { useSelector } from 'react-redux';
import { boardsSelector } from '../../redux/board/selector';
import { currentBoardSelector } from '../../redux/currentBoard/selector';
import { Profile } from '../Modal/Profile';

export const HeaderComponent: React.FC<HeaderProps> = ({
  setOpen,
  mobileSideBarVisible,
  setMobileSideBarVisible,
}) => {
  const { isMobile } = useDevice();
  const { user, signIn, signOut } = useFirebaseAuth();
  const boards = useSelector(boardsSelector);
  const currentBoard = useSelector(currentBoardSelector);
  const [profileOpen, setProfileOpen] = React.useState(false);
  return (
    <>
      <Stack
        sx={{
          display: 'fixed',
          top: '0',
          backgroundColor: (theme) => theme.palette.modalColor.backgroundColor,
          height: '10vh',
          overflow: 'none',
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
          {user && boards && boards.length > 0 && (
            <>
              <Typography
                sx={{
                  fontSize: '2rem',
                  color: (theme) => theme.palette.primary.dark,
                }}
              >
                {boards[currentBoard - 1].name}
              </Typography>
            </>
          )}
          {isMobile &&
            (!mobileSideBarVisible ? (
              <DownArrow onClick={() => setMobileSideBarVisible(true)} />
            ) : (
              <UpArrow />
            ))}
        </Stack>
        {!user ? (
          <Button
            variant="contained"
            styles={{ marginRight: '0.5vw' }}
            onClick={() => (user !== null && user ? signOut() : signIn())}
            title={user && user !== null ? 'Sign Out' : 'Login'}
          />
        ) : (
          <Stack
            direction="row"
            alignItems={'center'}
            gap={1}
            justifyContent={'space-around'}
          >
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
            >
              {isMobile ? <Plus /> : '+ Add New Task'}
            </Button>
            <Avatar
              onClick={() => setProfileOpen(true)}
              sx={{ width: '50px', height: '50px', marginRight: '10px' }}
              src={user.photoURL}
            />
          </Stack>
        )}
      </Stack>
      {profileOpen && (
        <Profile
          open={profileOpen}
          handleClose={() => {
            setProfileOpen(false);
          }}
        />
      )}
    </>
  );
};

export default HeaderComponent;
