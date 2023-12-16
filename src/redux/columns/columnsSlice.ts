import { createSlice } from '@reduxjs/toolkit';

const  columnsSlice = createSlice({
  name: 'columns',
  initialState: [{name:'Todo',id:1,color:'#49C4E5'},{name:'Doing',id:2,color:'#8471F2' },{name:'Done',id:3,color:'#67E2AE'}],
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
