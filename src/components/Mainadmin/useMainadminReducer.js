import {useReducer} from 'react'
import { EDIT_ALL_COURSES, EDIT_TAGS, EDIT_LOADER } from './Actions'



const editAllcourses=(newarray, state)=>({
  ...state,
  allCourses: [...newarray]
})

const editloader=(newvalue,state)=>({
  ...state,
  open:newvalue
})

const editTags= (newarray,state)=>({
  ...state,
  Tags:[...newarray]
})
const MainadminReducer = (state, action) => {
    switch (action.type) {
      case EDIT_ALL_COURSES:
        return editAllcourses(action.newarray, state);
      case EDIT_TAGS:
        return editTags(action.newarray, state);
      case EDIT_LOADER:
        return editloader(action.newvalue,state)  
      default:
        return state;
    }
  };
export const useMainadminReducer = () =>
  useReducer(MainadminReducer, {
      allCourses: [ {courseId:"IT304", courseName:"mohit solanki" } ],
      Tags:[ ],
      open:false
  });