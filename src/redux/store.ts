import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './board/boardSlice';
import taskReducer from './task/taskSlice';
import columnsReducer from './columns/columnsSlice';

const store = configureStore({
  reducer: {
    board: boardReducer,
    tasks:taskReducer,
    columns:columnsReducer
  },
  
});

store.subscribe(() => {
  // persist your state
  console.log("state ",store.getState())

  const {board,columns,tasks}=store.getState()

  // const boards =
  // const tasks=localStorage.getItem('tasks')
  // const columns=localStorage.getItem('columns')

  // localStorage.setItem('board',boards)

  // localStorage.setItem('tasks',tasks)

  // if(columns!==null)
  localStorage.setItem('columns',JSON.stringify(columns))

  localStorage.setItem('board',JSON.stringify(board))

  localStorage.setItem('tasks',JSON.stringify(tasks))


})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;