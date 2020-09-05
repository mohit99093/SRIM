import React, { useContext, useReducer, useState, useEffect }  from 'react'
import TextField from "@material-ui/core/TextField";
import { Profc } from "./ProfessorContext"
import { Autocomplete } from "@material-ui/lab"
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    Table:{
        width:500
    }
}))


function HomeReducer(state, action) {
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
      default:
        break;
    }
    return state
}

const initialState = {
    optionsforCourse:[],
    sc:[],
    selectecourseName:[],
    profName:" ",
    Error : { message:"" , color:"black" }
}

 const  Home=()=>{
    const [state, dispatch] = useReducer(HomeReducer, initialState) 
    const { offeredCourses,
           professorName,
           professorCourses,
           editprofessorCourses,
           editofferedCourses,
           profobjId,
           emailId,
           topicobj,
           editloader,
           password
            } = useContext(Profc)
    
    const [change, setchange] =  useState(false)
    const classes = useStyles();
    
    const updateProf= async()=>{
      
      let newvalue = {
        professorCourses,
        emailId,
        professorName,
        topics:topicobj,
        password,

    }
      console.log(newvalue);
      editloader(true)
     await  axios.post(`http://localhost:5000/professor/update/`+profobjId, newvalue).then(()=>console.log("yes Professor updated in data base" , newvalue)).
      catch(err=>console.log(err));
      editloader(false)
    }

    const { optionsforCourse,
            sc,
            selectecourseName,
            Error
          } = state
         
          useEffect(() => {
            console.log(professorName)
                let dummy = []
                let dummy1 = []
                 for(let i=0;i<offeredCourses.length;i++)
                {      
                    if(!offeredCourses[i].isSelected)
                    dummy.push(offeredCourses[i].courseName)
                }   
                for(let i=0;i<professorCourses.length;i++)
                {
                    for(let j=0;j<offeredCourses.length;j++)
                    {
                        if(professorCourses[i]===offeredCourses[j].courseId)
                        {
                            dummy1.push(offeredCourses[j].courseName)
                        }
                    }
                }
                dispatch({type:"field",field:"selectecourseName",value:dummy1})
                dispatch({type:"field",field:"optionsforCourse",value:dummy})
                dispatch({type:"field",field:"profName",value:professorName})
            
                updateProf()

                // console.log(professorCourses);
                
          },[change, offeredCourses,professorCourses, professorName])

    const handleaddcourses=()=>{
      if(sc.length!==0)
      {
        let ids = [...professorCourses]
        let dummy2 = [...offeredCourses]
        for(let i=0;i<sc.length;i++)
        {
            for(let j=0;j<dummy2.length;j++)
            {
              if(sc[i].trim()===dummy2[j].courseName.trim())
              {
                dummy2[j].isSelected=true
                ids.push(dummy2[j].courseId)
              }
            }
        } 
        console.log(ids , "hello") 
        editprofessorCourses(ids)
        editofferedCourses(dummy2)
        dispatch({type:"field",field:"sc",value:[]})
        // setchange(!change)
        // console.log(professorCourses, "heoll 122");
        // updateProf()
      }
      
    }
    const handledelete=(indexofcourese)=>{
      let dummy2 = [...offeredCourses]
      for(let j=0;j<dummy2.length;j++)
      {
            if(dummy2[j].courseId===professorCourses[indexofcourese])
            {
                dummy2[j].isSelected=false
            }
      }
      professorCourses.splice(indexofcourese,1)
      editprofessorCourses(professorCourses)
      editofferedCourses(dummy2)
     
    }
   


    return (
        <>
        <Box >
                <Autocomplete
                multiple
                id="tags-standard"
                options={optionsforCourse}
                getOptionLabel={option => option}
                filterSelectedOptions
                value={sc}
                onChange={(event, getOptionSelected) =>dispatch({type:'field' ,field:'sc', value:getOptionSelected})}
                renderInput={params => (
                    <TextField
                    {...params}
                    variant="outlined"
                    label="Select multiple Courses"
                    placeholder="Course"
                    color="primary"
                    error={sc.length===0}
                    />
                )}
            />
            <Box mt={2} display="flex" >
                <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleaddcourses}
                >
                Add Courses
                </Button>
                <Box ml={2} color={Error.color} fontSize={20} m="auto">
                    {Error.message}
                </Box>
            </Box>
        </Box>
    <Box  display="flex" mt={5}>
                  { selectecourseName.length!==0 ?  
        <TableContainer component={Paper} className={classes.Table}>
          <Table  size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell >
                      Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { selectecourseName.map((courseName,indexofcourese) => (
                <TableRow key={indexofcourese}>
                  <TableCell component="th" scope="row">
                    {courseName}
                  </TableCell>
                  <TableCell component="th" scope="cell" >
                        <IconButton aria-label="delete" p={0} m={0} size="small" onClick={()=>handledelete(indexofcourese)} >
                            <DeleteIcon  />
                        </IconButton>
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
              </TableContainer> : null   }

    </Box>      
     </> 
    )
}

export default Home