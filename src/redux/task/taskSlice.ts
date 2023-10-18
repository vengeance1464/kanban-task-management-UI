import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../components/Task/types';
import { UpdateSubtaskActionType } from './types';

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
    },
    {
      id:5,
      title: "Design settings and search pages",
      description: "",
      status: "Doing",
      subtasks: [
        {
          title: "Settings - Account page",
          isCompleted: true
        },
        {
          title: "Settings - Billing page",
          isCompleted: true
        },
        {
          title: "Search page",
          isCompleted: false
        }
      ]
    },
    {
      id:6,
      title: "Add account management endpoints",
      description: "",
      status: "Doing",
      subtasks: [
        {
          title: "Upgrade plan",
          isCompleted: true
        },
        {
          title: "Cancel plan",
          isCompleted: true
        },
        {
          title: "Update payment method",
          isCompleted: false
        }
      ]
    },
    {
      id:7,
      title: "Design onboarding flow",
    description: "",
      status: "Doing",
      subtasks: [
        {
          title: "Sign up page",
          isCompleted: true
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
      id:8,
      title: "Add search enpoints",
      description: "",
      status: "Doing",
      subtasks: [
        {
          title: "Add search endpoint",
          isCompleted: true
        },
        {
          title: "Define search filters",
          isCompleted: false
        }
      ]
    },
    {
      id:9,

      title: "Add authentication endpoints",
      description: "",
      status: "Doing",
      subtasks: [
        {
          title: "Define user model",
          isCompleted: true
        },
        {
          title: "Add auth endpoints",
          isCompleted: false
        }
      ]
    },
    {
      id:10,
      title: "Conduct 5 wireframe tests",
      description: "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
      status: "Done",
      subtasks: [
        {
          title: "Complete 5 wireframe prototype tests",
          isCompleted: true
        }
      ]
    },
    // {
    //   "title": "Create wireframe prototype",
    //   "description": "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
    //   "status": "Done",
    //   "subtasks": [
    //     {
    //       "title": "Create clickable wireframe prototype in Balsamiq",
    //       "isCompleted": true
    //     }
    //   ]
    // },
    // {
    //   "title": "Review results of usability tests and iterate",
    //   "description": "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
    //   "status": "Done",
    //   "subtasks": [
    //     {
    //       "title": "Meet to review notes from previous tests and plan changes",
    //       "isCompleted": true
    //     },
    //     {
    //       "title": "Make changes to paper prototypes",
    //       "isCompleted": true
    //     },
    //     {
    //       "title": "Conduct 5 usability tests",
    //       "isCompleted": true
    //     }
    //   ]
    // },
    // {
    //   "title": "Create paper prototypes and conduct 10 usability tests with potential customers",
    //   "description": "",
    //   "status": "Done",
    //   "subtasks": [
    //     {
    //       "title": "Create paper prototypes for version one",
    //       "isCompleted": true
    //     },
    //     {
    //       "title": "Complete 10 usability tests",
    //       "isCompleted": true
    //     }
    //   ]
    // },
    // {
    //   "title": "Market discovery",
    //   "description": "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
    //   "status": "Done",
    //   "subtasks": [
    //     {
    //       "title": "Interview 10 prospective customers",
    //       "isCompleted": true
    //     }
    //   ]
    // },
    // {
    //   "title": "Competitor analysis",
    //   "description": "",
    //   "status": "Done",
    //   "subtasks": [
    //     {
    //       "title": "Find direct and indirect competitors",
    //       "isCompleted": true
    //     },
    //     {
    //       "title": "SWOT analysis for each competitor",
    //       "isCompleted": true
    //     }
    //   ]
    // },
    // {
    //   "title": "Research the market",
    //   "description": "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
    //   "status": "Done",
    //   "subtasks": [
    //     {
    //       "title": "Write up research analysis",
    //       "isCompleted": true
    //     },
    //     {
    //       "title": "Calculate TAM",
    //       "isCompleted": true
    //     }
    //   ]
    // }
  ],
  reducers: {
    addTask: (state:any, action:PayloadAction<Task>) => {
       return [...state,action.payload]
    },
    editTask:(state:any,action:PayloadAction<Task>)=>{
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
     updateSubTask:(state:any,action:PayloadAction<UpdateSubtaskActionType>)=>{
      const filteredTaskIndex=state.findIndex((task:any)=>task.id===action.payload.id)

         if(filteredTaskIndex!==-1)
        {
            state[filteredTaskIndex].subtasks[action.payload.subTaskIndex].isCompleted= !state[filteredTaskIndex].subtasks[action.payload.subTaskIndex].isCompleted
        }

        return state
     } 
  }
});

export const { addTask,  editTask,deleteTask,updateSubTask} = taskSlice.actions;
export default taskSlice.reducer;
