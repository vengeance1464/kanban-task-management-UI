import { SubTask } from "../Task/types";

  export type FormInputProps={
    name:string;
     control:any;
     label?:string
     initialValue?:SubTask
     register:any
  }

  export type FormCheckboxProps={
    label:string
    onClick?:()=>void
    isChecked:boolean
  }

  export type FormDropdownProps={
    items:string []
  } &   FormInputProps