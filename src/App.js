import React,{useState,useContext, useEffect} from 'react';
import { Header } from './components/Header';
import TaskBoard from './pages/TaskBoard/TaskBoard';
import './styles.css';

import { SideBar } from './components/SideBar';
import { EyeEnabled } from './components/Icons/EyeEnabled';

import { Box } from '@mui/material';

import { useDevice } from './components/utils/hooks/useDevice';
import { createGlobalStyle } from 'styled-components';
import {FirebaseContext} from './components/utils/firebase/FirebaseProvider';
import { fetchUserBoardsPayload } from './redux/board/payloads';
import { useDispatch } from 'react-redux';
import { updateBoards } from './redux/board/boardSlice';
import { Profile } from './components/Modal/Profile';
import { AnalyticsModal } from './components/Modal/Analytics';


const App = () => {
  const [open, setOpen] = useState(false);
  const [sideBarVisible, setSideBarVisible] = useState(true);
  const [theme,setTheme]=useState('light')
  const {isMobile}=useDevice()
  const dispatch=useDispatch()

  const [mobileSideBarVisible,setMobileSideBarVisible]=useState(false)

  const {user}=useContext(FirebaseContext)


  const handleClose=()=>{
    setMobileSideBarVisible(false)
  }

  const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.lightTheme ? '#F4F7FD' : '#20212C'};
  }
`;

useEffect(() => {
  async function getAllBoards() {
    dispatch(updateBoards(await fetchUserBoardsPayload()));
  }

  if(user && user!==null)
  getAllBoards();
}, [user]);

  return (

     <>
      <Header setOpen={setOpen} mobileSideBarVisible={mobileSideBarVisible} setMobileSideBarVisible={setMobileSideBarVisible} />
      <Box sx={{position:sideBarVisible && 'relative',left: !isMobile && sideBarVisible && user && '12vw',paddingLeft:user && '2vw', backgroundColor: theme=>theme.palette.info.light}}>
      <TaskBoard open={open}  setOpen={setOpen}/>
      </Box>
      {user && (sideBarVisible|| isMobile && mobileSideBarVisible) && <SideBar onClick={()=>setSideBarVisible(false)} mobileSideBarVisible={mobileSideBarVisible} handleClose={handleClose}/>}
      {user && !isMobile && !sideBarVisible && <EyeEnabled onClick={()=>setSideBarVisible(true)} />}
     
      </>
  );
};

export default App;
