import React,{ useContext, useReducer, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { Admc } from "./AdminContext"
import { Link } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(17),
        height: theme.spacing(7),
        
      },    
    },
    paper:{
        width:'auto',
        height: 'auto'
    }
  }));
function CreatetopicReducer(state, action) {
    switch (action.type) {
      case 'submit':{
          return {
            ...state,
            topicName:'',
            Tags:[],
            Prerequisite:[],
            Discription:""
          }
      }
      case 'field':{
        return {
          ...state,
          [action.field] : action.value
        }
      }
      case 'seterror':{
        return {
          ...state,
          Error : { message:"Filed's can't be Empty", color:"red" }
        }
      }
      case "unseterror":{
        return {
          ...state,
          Error:{message:"", color:"black"}
        }
      }
      default:
        break;
    }
    return state
}

const initialState = {
   searchValue:"",
   data:[],
   sortedValue:[],
}
const  Chat=({setindexofseletedtopic})=>{
    const [state, dispatch] = useReducer(CreatetopicReducer, initialState)
    const { searchValue,sortedValue, data } = state;

    const {  allStudentforchat, allprofessor, _id } = useContext(Admc)

    const classes = useStyles();
   

    useEffect(() => {
        let data =[]
       allStudentforchat.forEach((student)=>{
          data.push({studentId:student.studentId , studentobjId:student.studentobjId, isstudent:true})
       })
       allprofessor.forEach((prof)=>{
        data.push({studentId:prof.professorName , studentobjId:prof.profobjId, isstudent:false})
     })
    
        dispatch({type:"field",field:"data",value:data})
        dispatch({type:"field",field:"sortedValue",value:data})
    }, [allStudentforchat, allprofessor])


    const hendlesearch=(value)=>{
        dispatch({type:"field",field:"searchValue",value:value})

        let newstring = value.toUpperCase()
       let sortedStudents = [] 
       data.forEach((student)=>{ 
        if(student.studentId.toUpperCase().startsWith(newstring))
        sortedStudents.push(student)
       })
        console.log(sortedStudents)
        dispatch({type:"field",field:"sortedValue",value:sortedStudents})

    }
    return (
        <>
            {/* Topic Name */}
            <div >
                <h2>Search Student ID or Professor Name</h2>
            </div>
            <FormControl fullWidth>
                <TextField
                variant="outlined"
                id="searchValue"
                name="searchValue"
                onChange={e =>hendlesearch(e.target.value)}
                error={searchValue === ""}
                value={searchValue}
                />
            </FormControl>
            {/* end Topic Name  */}


            <div className={classes.root}> 
 
            { sortedValue!==[] ? sortedValue.map((student,i)=>(
                 <Paper elevation={3} key={i}  className={classes.paper} >
                    <Box display="flex">
                        <Box  mr="auto" ml={2} fontSize={15}>
                          <h3> {student.studentId}  </h3>
                        </Box>
                        <Box my="auto" mr={3}>
                          <Link to={`/ChatBox/${student.isstudent ? student.studentobjId + _id : _id + student.studentobjId}/${student.studentobjId}`}>
                          <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                my='auto'    
                                onClick = {()=>{}}                            
                              >
                                Chat
                          </Button>
                          </Link>
                        </Box>
                    </Box>
                 </Paper>     
        )):null }


</div>
        </>
    )
}

export default Chat