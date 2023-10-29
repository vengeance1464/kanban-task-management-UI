import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Board } from './types';

const  boardSlice = createSlice({
  name: 'boards',
  initialState: [{id:1, name: 'Platform Launch'}],
  reducers: {
    addBoard: (state:any, action:PayloadAction<Board>) => {
       return [...state,action.payload]
    },
    editBoard:(state:any,action:any)=>{
      const filteredBoardIndex=state.findIndex((board:any)=>board.id===action.payload.id)
      if(filteredBoardIndex!==-1)
      {
        state[filteredBoardIndex]=action.payload
      }

      return state
    }
  }
});

export const { addBoard,  editBoard} = boardSlice.actions;
export default boardSlice.reducer;
