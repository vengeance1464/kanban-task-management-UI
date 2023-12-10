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


const App = () => {
  const [open, setOpen] = useState(false);
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [theme,setTheme]=useState('light')
  const {isMobile}=useDevice()
  const dispatch=useDispatch()

  const [mobileSideBarVisible,setMobileSideBarVisible]=useState(false)

  const {user}=useContext(FirebaseContext)

  console.log("theme",theme)

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
      <Box sx={{position:sideBarVisible && 'relative',left: !isMobile && sideBarVisible && '12vw',paddingLeft:'2vw', backgroundColor: theme=>theme.palette.info.light,
          height: '100vh',maxHeight:'100vh'}}>
      <TaskBoard open={open}  setOpen={setOpen}/>
      </Box>
      {(sideBarVisible|| mobileSideBarVisible) && <SideBar onClick={()=>setSideBarVisible(false)} mobileSideBarVisible={mobileSideBarVisible} handleClose={handleClose}/>}
      {!isMobile && !sideBarVisible && <EyeEnabled onClick={()=>setSideBarVisible(true)} />}
      </>
  );
};

export default App;
