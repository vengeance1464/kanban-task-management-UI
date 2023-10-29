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
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import ThemeSwitchProvider from './themes/ThemeProvider';
import { ThemeContext } from './themes/ThemeProvider';
import { useDevice } from './components/utils/hooks/useDevice';


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

  return (
    <ThemeContext.Provider value={{theme:theme,setTheme:setTheme}}>
    <ThemeProvider theme={getTheme(theme)}>
    <Provider store={store}>
      <Header setOpen={setOpen} mobileSideBarVisible={mobileSideBarVisible} setMobileSideBarVisible={setMobileSideBarVisible} />
      <Box sx={{position:sideBarVisible && 'relative',left: !isMobile && sideBarVisible && '12vw',paddingLeft:'2vw', backgroundColor: theme=>theme.palette.info.light,
          height: '100vh',}}>
      <TaskBoard open={open}  setOpen={setOpen}/>
      </Box>
      {(sideBarVisible|| mobileSideBarVisible) && <SideBar onClick={()=>setSideBarVisible(false)} mobileSideBarVisible={mobileSideBarVisible} handleClose={handleClose}/>}
      {!isMobile && !sideBarVisible && <EyeEnabled onClick={()=>setSideBarVisible(true)} />}
      </Provider>
      </ThemeProvider>
      </ThemeContext.Provider>
  );
};

export default App;
