import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './board/boardSlice';
import taskReducer from './task/taskSlice';
import columnsReducer from './columns/columnsSlice';
import currentBoardReducer from "./currentBoard/currentBoardSlice"
import { loadFromLocalStorage, saveToLocalStorage } from '../components/utils/localStorage';


const store = configureStore({
  reducer: {
    board: boardReducer,
    tasks:taskReducer,
    columns:columnsReducer,
    currentBoard:currentBoardReducer
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;