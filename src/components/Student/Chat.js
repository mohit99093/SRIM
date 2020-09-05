import React,{ useContext, useReducer, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { Stuc } from "./StudentContext"
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
const  Searchtopicname=({setindexofseletedtopic})=>{
    const [state, dispatch] = useReducer(CreatetopicReducer, initialState)
    const { searchValue,sortedValue, data } = state;

    const { alltopics, studentobjId, allprofessor, AdminobjId } = useContext(Stuc)

    const classes = useStyles();
   

    useEffect(() => {
        let data =[...allprofessor,{professorName:"Admin",profobjId:AdminobjId}]
      
    
        dispatch({type:"field",field:"data",value:data})
        dispatch({type:"field",field:"sortedValue",value:data})
    }, [allprofessor])


    const hendlesearch=(value)=>{
        dispatch({type:"field",field:"searchValue",value:value})

        let newstring = value.toUpperCase()
       let sortedProf = [] 
       data.forEach((Prof)=>{ 
        if(Prof.professorName.toUpperCase().startsWith(newstring))
        sortedProf.push(Prof)
       })
        console.log(sortedProf)
        dispatch({type:"field",field:"sortedValue",value:sortedProf})

    }
    return (
        <>
            {/* Topic Name */}
            <div >
                <h2>Search Professor Name</h2>
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
 
            { sortedValue!==[] ? sortedValue.map((Prof,i)=>(
                 <Paper elevation={3} key={i}  className={classes.paper} >
                    <Box display="flex">
                        <Box  mr="auto" ml={2} fontSize={15}>
                          <h3> {Prof.professorName}  </h3>
                        </Box>
                        <Box my="auto" mr={3}>
                          <Link to={`/ChatBox/`+Prof.profobjId}>
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

export default Searchtopicname