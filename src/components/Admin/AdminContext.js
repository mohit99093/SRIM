import React , {  createContext } from 'react'
import { useAdminReducer } from './useAdminReducer'
import { EDIT_TIMELINE, INTIAL, EDIT_LOADER, EDIT_ALL_STUDENTS } from './Action';
export const Admc = createContext()

export const AdminDataProvider=(props)=>{
        const [state , dispatch] = useAdminReducer();
        const { studentName,
            studentId,
            emailId,
          
            appliedTopic,
            topics,
            optionsforTags,
            optionsforProfName,
            allStudentforchat,
            
            
            allprofessor,
            allStudents,
            timeline,
            open,
            _id
            
              }  = state;
        const editTimeline=(newarray)=> dispatch({type:EDIT_TIMELINE, newarray})
        const intial = (newvalue)=> dispatch({type:INTIAL, newvalue})
        const editloader = (newvalue)=> dispatch({type:EDIT_LOADER, newvalue})
        const editallStudents = (newarray)=> dispatch({type:EDIT_ALL_STUDENTS, newarray})
        // const editAppliedTopic=(newarray)=> dispatch({type:EDIT_APPLIED_TOPIC, newarray})

        
        const providerValue = {
            studentName,
            studentId,
            emailId,
            topics,
            optionsforTags,
            optionsforProfName,
            allprofessor,
            allStudents,
            timeline,
            editTimeline,
            intial,
            editloader,
            open,
            _id,
            editallStudents,
            allStudentforchat
            // editProfile,
            // editAppliedTopic
          };

  return (
      <Admc.Provider value={providerValue}>
          {props.children}
      </Admc.Provider>
  );
}

