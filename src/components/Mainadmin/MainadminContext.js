import React , {  createContext } from 'react'
import { useMainadminReducer } from './useMainadminReducer'
import { EDIT_ALL_COURSES, EDIT_TAGS, EDIT_LOADER } from './Actions';
export const Mainc = createContext()

export const MainadminDataProvider=(props)=>{
        const [state , dispatch] = useMainadminReducer();
        const {  allCourses, Tags, open  }  = state;
        
       
        const editAllcourses = (newarray)=>dispatch({type:EDIT_ALL_COURSES,newarray})
        const editTags =(newarray)=>dispatch({type:EDIT_TAGS,newarray})
        const editloader = (newvalue)=> dispatch({type:EDIT_LOADER, newvalue})
        const providerValue = {
            allCourses,
            Tags,
            editAllcourses,
            editTags,
            open,
            editloader
          };

  return (
      <Mainc.Provider value={providerValue}>
          {props.children}
      </Mainc.Provider>
  );
}

