import React,{useState} from 'react';
import { Header } from './components/Header';
import TaskBoard from './pages/TaskBoard/TaskBoard';
import './styles.css';
import { AddTask } from './components/Modal/AddTask';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header setOpen={setOpen} />
      <TaskBoard open={open}  setOpen={setOpen}/>


    </>
  );
};

export default App;
