import { createSlice } from '@reduxjs/toolkit';

const  columnsSlice = createSlice({
  name: 'columns',
  initialState: [{name:'Todo',id:1},{name:'Doing',id:2 },{name:'Done',id:3}],
  reducers: {
    addColumn: (state:any, action:any) => {
       return [...state,action.payload]
    },
    deleteColumn:(state:any, action:any) => {

        const filteredColumnIndex=state.findIndex((column:any)=>column.name===action.payload.name)
        
        if(filteredColumnIndex!==-1)
        {
          state.splice(filteredColumnIndex,1)
        }

        return state
     },
  }
});

export const { addColumn,  deleteColumn} = columnsSlice.actions;
export default columnsSlice.reducer;
