import React,{useState} from 'react';
import { Header } from './components/Header';
import TaskBoard from './pages/TaskBoard/TaskBoard';
import './styles.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AddTask } from './components/Modal/AddTask';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <Provider store={store}>
      <Header setOpen={setOpen} />
      <TaskBoard open={open}  setOpen={setOpen}/>
      </Provider>
  );
};

export default App;
