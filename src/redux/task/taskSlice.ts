import { createSlice } from '@reduxjs/toolkit';

const  taskSlice = createSlice({
  name: 'tasks',
  initialState: [
    {
        id:1,
      title: "Build UI for onboarding flow",
      description: "",
      status: "Todo",
      subtasks: [
        {
          title: "Sign up page",
          isCompleted:  true
        },
        {
          title: "Sign in page",
          isCompleted: false
        },
        {
          title: "Welcome page",
          isCompleted: false
        }
      ]
    },
    {
        id:2,

      title: "Build UI for search",
      description: "",
      status: "Todo",
      subtasks: [
        {
          title: "Search page",
          isCompleted: false
        }
      ]
    },
    {
        id:3,

      title: "Build settings UI",
      description: "",
      status: "Todo",
      subtasks: [
        {
          title: "Account page",
          isCompleted: false
        },
        {
          title: "Billing page",
          isCompleted: false
        }
      ]
    },
    {
       id:4,
      title: "QA and test all major user journeys",
      description: "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
      status: "Todo",
      subtasks: [
        {
          title: "Internal testing",
          isCompleted: false
        },
        {
          title: "External testing",
          isCompleted: false
        }
      ]
    }
  ],
  reducers: {
    addTask: (state:any, action:any) => {
       return [...state,action.payload]
    },
    editTask:(state:any,action:any)=>{
      const filteredTaskIndex=state.findIndex((task:any)=>task.id===action.payload.id)
      if(filteredTaskIndex!==-1)
      {
        state[filteredTaskIndex]=action.payload
      }

      return state
    },
    deleteTask:(state:any, action:any) => {
        const filteredTaskIndex=state.findIndex((task:any)=>task.id===action.payload.id)
        if(filteredTaskIndex!==-1)
        {
          state.splice(filteredTaskIndex,1)
        }

        return state
     },
  }
});

export const { addTask,  editTask,deleteTask} = taskSlice.actions;
export default taskSlice.reducer;
