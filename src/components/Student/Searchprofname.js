import React,{ useContext, useReducer, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { Stuc } from "./StudentContext"
import { Link } from 'react-router-dom';
import { Autocomplete } from "@material-ui/lab"
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
   sortedValue:[],
}
const  Searchprofname=({setindexofseletedtopic})=>{
    const [state, dispatch] = useReducer(CreatetopicReducer, initialState)
    const { searchValue,sortedValue } = state;

    const { alltopics, optionsforProfName } = useContext(Stuc)
    console.log(optionsforProfName)
    const classes = useStyles();
    
    useEffect(() => {
        
        dispatch({type:"field",field:"sortedValue",value:alltopics})
    }, [alltopics])
    const hendlesearch=(value)=>{

        dispatch({type:"field",field:"searchValue",value:value})
        let sortedtopic = [...alltopics]
        console.log(value)
        if(value){
        let newstring = value.toUpperCase()
        sortedtopic = []
        console.log(alltopics)
        alltopics.forEach((topic)=>{ 
        if(topic.professorName.toUpperCase().startsWith(newstring))
        sortedtopic.push(topic)
       })
      }
       
        dispatch({type:"field",field:"sortedValue",value:sortedtopic})

    }
    return (
        <>
            {/* Topic Name */}
            <div >
                <h2>Search Topic Name</h2>
            </div>
            <Autocomplete
                
                id="tags-standard"
                options={optionsforProfName}
                getOptionLabel={option => option}
                filterSelectedOptions
                value={searchValue}
                onChange={(event, getOptionSelected) =>hendlesearch(getOptionSelected)}
                renderInput={params => (
                    <TextField
                    {...params}
                    variant="outlined"
                    label="Slelect multiple tags"
                    placeholder="Add-Tages"
                    color="primary"
                    error={ searchValue ?searchValue.length===0:true}
                    />
                )}
            /> 
            {/* end Topic Name  */}


            <div className={classes.root}> 
 
            { sortedValue!==[] ? sortedValue.map((topic,i)=>(
                 <Paper elevation={3} key={i}  className={classes.paper} >
                    <Box display="flex">
                        <Box  mr="auto" ml={2} fontSize={15}>
                          <h3> {topic.topicName}  </h3>
                        </Box>
                        <Box my="auto" mr={3}>
                          <Link to={"/Detailsoftopic/" +i.toString()}>
                          <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                my='auto'    
                                onClick = {()=>setindexofseletedtopic(topic.indexoftopic)}                            
                              >
                                SEE DETAILS
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

export default Searchprofname