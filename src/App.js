import React,{useState} from 'react';
import { Header } from './components/Header';
import TaskBoard from './pages/TaskBoard/TaskBoard';
import './styles.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AddTask } from './components/Modal/AddTask';
import { SideBar } from './components/SideBar';
import { EyeEnabled } from './components/Icons/EyeEnabled';
import { lightTheme } from './themes/lightTheme';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';


const App = () => {
  const [open, setOpen] = useState(false);
  const [sideBarVisible, setSideBarVisible] = useState(true);


  return (
    <ThemeProvider theme={lightTheme}>
    <Provider store={store}>
      <Header setOpen={setOpen} />
      <Box sx={{position:sideBarVisible && 'relative',left:sideBarVisible && '12vw',marginLeft:'2vw'}}>
      <TaskBoard open={open}  setOpen={setOpen}/>
      </Box>
      {sideBarVisible && <SideBar onClick={()=>setSideBarVisible(false)}/>}
      {!sideBarVisible && <EyeEnabled onClick={()=>setSideBarVisible(true)} />}
      </Provider>
      </ThemeProvider>
  );
};

export default App;
