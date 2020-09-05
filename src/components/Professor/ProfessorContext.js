import React , {  createContext } from 'react'
import { useProfessorReducer } from './useProfessorReducer'
import { ADD_TOPIC, REMOVE_TOPIC, EDIT_TOPIC, EDIT_PROFNAME, EDIT_PROFCOURSES,EDIT_OFFERED_COURSES,EDIT_OPTION_TAGS, EDIT_TOPIC_OBJ,INTIAL, EDIT_LOADER, EDIT_EMAIL } from './Actions';
export const Profc = createContext()

export const ProfessorDataProvider=(props)=>{
        const [state , dispatch] = useProfessorReducer();
        const { topics,
             optionsforTags,
             offeredCourses,
             professorName,
             professorCourses,
             finalStage,
             emailId,
             profobjId,
             Admintimeline,
             open,
             password,
             AdminobjId,
             allStudents,
             //databse
             topicobj,
             
              }  = state;
        
        const addTopic = (topic) => dispatch({ type: ADD_TOPIC, topic });
        const removeTopic = (topic) => dispatch({ type: REMOVE_TOPIC, topic });
        const editTopic = (newarray)=> dispatch({type:EDIT_TOPIC, newarray});
        const editprofessorName = (newvalue) => dispatch({type:EDIT_PROFNAME,newvalue})
        const editprofessorCourses =(newarray)=> dispatch({type:EDIT_PROFCOURSES, newarray})
        const editofferedCourses = (newarray)=>dispatch({type:EDIT_OFFERED_COURSES,newarray})
        const editoptionsforTags = (newarray)=>dispatch({type:EDIT_OPTION_TAGS,newarray})
        const addTopicobj = (newvalue)=>dispatch({type:EDIT_TOPIC_OBJ,newvalue})
        const inital = (newvalue)=>dispatch({type:INTIAL,newvalue})
        const editloader = (newvalue)=> dispatch({type:EDIT_LOADER, newvalue})
        const editemailId = (newvalue)=> dispatch({type:EDIT_EMAIL, newvalue})
        const providerValue = {
            topics,
            optionsforTags,
            offeredCourses,
            professorName,
            professorCourses,
            finalStage,
            emailId,
            profobjId,
            Admintimeline,
            open,
            editloader,
            editemailId,
            password,
            AdminobjId,
            allStudents,
            // database
            topicobj,
            addTopic,
            removeTopic,
            editTopic,
            editprofessorName,
            editprofessorCourses,
            editofferedCourses,
            editoptionsforTags,
            addTopicobj,
            inital
            
          };

  return (
      <Profc.Provider value={providerValue}>
          {props.children}
      </Profc.Provider>
  );
}

