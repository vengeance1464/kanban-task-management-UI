import { Box, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PropsWithChildren } from '../../react-app-env';
import { EyeDisabled } from '../Icons/EyeDisabled';
import SideBarItem from './SideBarItem';
import { SideBarProps } from './types';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Toggle } from '../Toggle';
import { ThemeContext } from '../../themes/ThemeProvider';
import { useDevice } from '../utils/hooks/useDevice';
import { BaseModal } from '../Modal/BaseModal';
import AddBoard from '../Modal/AddBoard/AddBoard';
import { useSelector } from 'react-redux';
import { boardsSelector } from '../../redux/board/selector';
import { useDispatch } from 'react-redux';
import { updateCurrentBoard } from '../../redux/currentBoard/currentBoardSlice';

const SideBarComponent: React.FC<PropsWithChildren<SideBarProps>> = ({
  onClick,
  mobileSideBarVisible,
  handleClose,
  addBoardOpen,
  setAddBoardOpen,
}) => {
  const theme = useTheme();
  const [itemSelected, setItemSelected] = useState<number>(0);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const { theme: themeMode, setTheme } = useContext(ThemeContext);
  const { isMobile } = useDevice();
  const boards = useSelector(boardsSelector);
  const dispatch = useDispatch();

  const handleBoardClose = () => {
    setAddBoardOpen(false);
  };

  const getSideBar = () => {
    return (
      <>
        <Typography
          sx={{
            marginLeft: '0.5vw',
            textTransform: 'capitalize',
            marginBottom: '2vh',
          }}
        >
          {' '}
          {`All Boards (${boards.length})`}
        </Typography>
        <Stack
          sx={{
            overflowY: 'scroll',
            maxHeight: '70%',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '6px', // Adjust the width as needed
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1', // Adjust track color as needed
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888', // Adjust thumb color as needed
              '&:hover': {
                backgroundColor: '#555', // Adjust thumb hover color as needed
              },
            },
          }}
          direction="column"
        >
          {boards &&
            boards.length > 0 &&
            boards.map((item, index) => (
              <SideBarItem
                key={index}
                onClick={() => {
                  setItemSelected(index);
                  dispatch(updateCurrentBoard(index + 1));
                }}
                isItemSeleced={itemSelected === index}
                title={item.name}
              />
            ))}
        </Stack>
        <SideBarItem
          onClick={() => {
            setItemSelected(boards.length + 1);
            setAddBoardOpen(true);
          }}
          isItemSeleced={itemSelected === boards.length + 1}
          title={'+ Create New Board'}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack
            direction="row"
            justifyContent={'center'}
            sx={{
              width: '85%',
              backgroundColor: (theme) => theme.palette.info.light,
              borderRadius: '6px',
              position: 'absolute',
              bottom: isMobile ? '4vh' : '8vh',
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
          }}
          direction="row"
          alignItems={'center'}
        >
          {!isMobile && (
            <>
              <EyeDisabled onClick={onClick} />
              <Typography>Hide SideBar</Typography>
            </>
          )}
        </Stack>
        {addBoardOpen && (
          <AddBoard open={addBoardOpen} handleClose={handleBoardClose} />
        )}
      </>
    );
  };

  return !isMobile ? (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: '10vh',
        backgroundColor: (theme) => theme.palette.modalColor.backgroundColor,
        height: '90vh',
        width: '12.1vw',
        borderRight: '1px solid #E4EBFA',
      }}
    >
      {getSideBar()}
    </Box>
  ) : (
    <BaseModal
      open={mobileSideBarVisible}
      handleClose={handleClose}
      styles={{
        width: '75vw',
        height: '70vh',
        padding: '10px 18px 10px 18px',
      }}
    >
      {getSideBar()}
    </BaseModal>
  );
};

export default SideBarComponent;
