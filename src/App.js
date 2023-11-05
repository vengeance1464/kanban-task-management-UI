import React,{useState,useContext} from 'react';
import { Header } from './components/Header';
import TaskBoard from './pages/TaskBoard/TaskBoard';
import './styles.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AddTask } from './components/Modal/AddTask';
import { SideBar } from './components/SideBar';
import { EyeEnabled } from './components/Icons/EyeEnabled';
import { getTheme } from './themes/theme';
import { ThemeProvider} from '@mui/material/styles';
import { Box } from '@mui/material';
import ThemeSwitchProvider from './themes/ThemeProvider';
import { ThemeContext } from './themes/ThemeProvider';
import { useDevice } from './components/utils/hooks/useDevice';
import {  GlobalStyles } from '@mui/material/styles';
import styled, { createGlobalStyle } from 'styled-components';
import FirebaseContext from './components/utils/firebase/FirebaseProvider';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './components/utils/firebase/firebaseConfig';
import FirebaseProvider from './components/utils/firebase/FirebaseProvider';


const App = () => {
  const [open, setOpen] = useState(false);
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [theme,setTheme]=useState('light')
  const {isMobile}=useDevice()

  const [mobileSideBarVisible,setMobileSideBarVisible]=useState(false)

  console.log("theme",theme)

  const handleClose=()=>{
    setMobileSideBarVisible(false)
  }

  const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.lightTheme ? '#F4F7FD' : '#20212C'};
  }
`;

  return (
    <ThemeContext.Provider value={{theme:theme,setTheme:setTheme}}>
    <ThemeProvider theme={getTheme(theme)}>
    <GlobalStyle lightTheme={theme==='light'} />
    {/* <GlobalStyles styles={{ body: { backgroundColor: '#F4F7FD' } }} /> */}
    <FirebaseProvider values={{app:initializeApp(firebaseConfig),user:null,setUser:null}}>

    <Provider store={store}>

     
      <Header setOpen={setOpen} mobileSideBarVisible={mobileSideBarVisible} setMobileSideBarVisible={setMobileSideBarVisible} />
      <Box sx={{position:sideBarVisible && 'relative',left: !isMobile && sideBarVisible && '12vw',paddingLeft:'2vw', backgroundColor: theme=>theme.palette.info.light,
          height: '100vh',maxHeight:'100vh'}}>
      <TaskBoard open={open}  setOpen={setOpen}/>
      </Box>
      {(sideBarVisible|| mobileSideBarVisible) && <SideBar onClick={()=>setSideBarVisible(false)} mobileSideBarVisible={mobileSideBarVisible} handleClose={handleClose}/>}
      {!isMobile && !sideBarVisible && <EyeEnabled onClick={()=>setSideBarVisible(true)} />}
      </Provider>
      </FirebaseProvider>
      </ThemeProvider>
      </ThemeContext.Provider>
  );
};

export default App;
