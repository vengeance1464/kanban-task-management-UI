import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Board } from './types';
import {axios} from "../../api"

const  boardSlice = createSlice({
  name: 'boards',
   initialState: [
  ],
  reducers: {
    addBoard: (state:any, action:PayloadAction<Board>) => {
      axios.post('/board/add', action.payload);
       return [...state,action.payload]
    },
    editBoard:(state:any,action:any)=>{
      const filteredBoardIndex=state.findIndex((board:any)=>board.id===action.payload.id)
      if(filteredBoardIndex!==-1)
      {
        state[filteredBoardIndex]=action.payload
      }

      return state
    },

    updateBoards:(state:any,action:PayloadAction<Board[]>)=>{
      return [...action.payload]
    
    }
  }
});

export const { addBoard,  editBoard,updateBoards} = boardSlice.actions;
export default boardSlice.reducer;
