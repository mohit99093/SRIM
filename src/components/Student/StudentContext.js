import React , {  createContext } from 'react'
import { useStudentReducer } from './useStudentReducer'
import { EDIT_PROFILE,EDIT_APPLIED_TOPIC,INTIAL, EDIT_PROF_TIMELINE, EDIT_LOADER } from './Action';
export const Stuc = createContext()

export const StudentDataProvider=(props)=>{
        const [state , dispatch] = useStudentReducer();
        const { studentName,
            studentId,
            studentobjId,
            emailId,
            profile,
            appliedTopic,
            finalgrade,
            results,
            finalApprove,
            TeamMembers,   
            TeamNumber,
            alltopics,
            optionsforTags,
            optionsforProfName,
            appliedTopics,
            Teamtimeline,
            Admintimeline,
            AdminobjId,
            allprofessor,
            open
              }  = state;
        const editProfile=(newprofile)=> dispatch({type:EDIT_PROFILE, newprofile})
        const editAppliedTopic=(newarray)=> dispatch({type:EDIT_APPLIED_TOPIC, newarray})
        const intial=(newvalue)=> dispatch({type:INTIAL,newvalue})
        const editproftimeline=(newarray)=> dispatch({type:EDIT_PROF_TIMELINE, newarray})
        const editloader = (newvalue)=> dispatch({type:EDIT_LOADER, newvalue})
        const providerValue = {
            studentName,
            studentId,
            studentobjId,
            emailId,
            profile,
            appliedTopic,
            finalgrade,
            results,
            finalApprove,
            TeamMembers,
            TeamNumber,
            alltopics,
            optionsforTags,
            optionsforProfName,
            appliedTopics,
            Teamtimeline,
            Admintimeline,
            editProfile,
            editAppliedTopic,
            intial,
            editproftimeline,
            open,
            editloader,
            AdminobjId,
            allprofessor
          };

  return (
      <Stuc.Provider value={providerValue}>
          {props.children}
      </Stuc.Provider>
  );
}

