import { PayloadAction, createSlice } from '@reduxjs/toolkit';


const  currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState: 1,
  reducers: {
    updateCurrentBoard: (state:any, action:PayloadAction<number>) => {
       return action.payload
    },
  }
});

export const { updateCurrentBoard} = currentBoardSlice.actions;
export default currentBoardSlice.reducer;
