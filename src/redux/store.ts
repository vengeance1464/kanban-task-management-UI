import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './board/boardSlice';
import taskReducer from './task/taskSlice';

const store = configureStore({
  reducer: {
    board: boardReducer,
    tasks:taskReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;