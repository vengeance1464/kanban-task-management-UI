import * as React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import { updateBoards } from '../../redux/board/boardSlice';
import { updateTasks } from '../../redux/task/taskSlice';
import { updateCurrentBoard } from '../../redux/currentBoard/currentBoardSlice';

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
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(updateBoards([]));
      dispatch(updateTasks([]));
      dispatch(updateCurrentBoard(1));
    }
  }, [user]);
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

          <Typography
            sx={{
              fontSize: '2rem',
              color: (theme) => theme.palette.primary.dark,
            }}
          >
            {boards.length > 0 && currentBoard > 0
              ? boards[currentBoard - 1].name
              : !user && isMobile
              ? 'Kanban'
              : ''}
          </Typography>
          {isMobile &&
            (!mobileSideBarVisible ? (
              <DownArrow onClick={() => setMobileSideBarVisible(true)} />
            ) : (
              <UpArrow onClick={() => setMobileSideBarVisible(false)} />
            ))}
        </Stack>
        {!user ? (
          <Button
            variant="contained"
            styles={{ marginRight: '0.5vw' }}
            onClick={() => {
              if (user !== null && user) {
                // window.location.reload();
                //dispatch(updateCurrentBoard(0));
                signOut();
              } else {
                signIn();
              }
            }}
            title={user && user !== null ? 'Sign Out' : 'Login'}
          />
        ) : (
          <Stack
            direction="row"
            alignItems={'center'}
            gap={1}
            sx={{ paddingRight: '10px' }}
            justifyContent={'space-around'}
          >
            {boards.length > 0 && (
              <Button
                variant="contained"
                styles={isMobile ? { width: '3vw', height: '4vh' } : {}}
                onClick={() => {
                  setOpen(true);
                }}
              >
                {isMobile ? <Plus /> : '+ Add New Task'}
              </Button>
            )}
            <Avatar
              onClick={() => setProfileOpen(true)}
              sx={{
                width: isMobile ? '9vw' : '40px',
                height: isMobile ? '9vw' : '40px',
              }}
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
