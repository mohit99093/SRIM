import React, { useState, useContext,useEffect, useReducer } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Mainc } from "./MainadminContext"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box"
import FormControl from "@material-ui/core/FormControl";
import axios from 'axios';
import { Typography } from '@material-ui/core';






const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);




const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function CreatetopicReducer(state, action) {
  switch (action.type) {
    case 'submit':{
        return {
          ...state,
          courseName:'',
          courseId:""
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
  courseId:"",
  courseName:"",
  Error : { message:"click on button for create topic" , color:"black" }

}

export default function CustomizedTables() {
  const classes = useStyles();
  const { allCourses, editAllcourses } = useContext(Mainc)
  const [state, dispatch] = useReducer(CreatetopicReducer, initialState)
  const { courseId,courseName } = state;
  const [change, setchange] = useState(false)
const handledelete=(index)=>{


        let dummyallCourses = [...allCourses]
        console.log(dummyallCourses[index])
        axios.delete("http://localhost:5000/allcourses/"+dummyallCourses[index]._id).then(res=>{
          dummyallCourses.splice(index,1);
          editAllcourses(dummyallCourses)
          console.log("deleted")
        }).catch(err=>console.log(err))
       

        // change in data base
       
}
const handleSubmit = async() => {
  
  if (
    courseName === "" ||
    courseId === "" 
  ) {
    dispatch({type:"seterror"})
  }
  else
  {
      let  newValue = { courseName,courseId }
      // console.log(newTopic);
    await  axios.post("http://localhost:5000/allcourses/add",newValue).then(res=>console.log(res)).catch(err=>alert(err))
     await axios.get("http://localhost:5000/allcourses").then((res=>{

            dispatch({type:"submit"})
            editAllcourses(res.data)
           
      })).catch(err=>alert(err))

      

      // change in usefull database

  }
};
  return (
    <>
      <Box display="flex" justifyContent="left"  mb={3}>
         {/* Topic Name */}
         
         <Box my="auto" mr={1}>
           <Typography variant="h6" >Course Name</Typography>
        </Box>
      
          <FormControl >
            <TextField
              variant="outlined"
              id="courseName"
              name="courseName"
              onChange={e => dispatch({type:'field' ,field:'courseName', value:e.target.value})}
              error={courseName === ""}
              value={courseName}
            />
          </FormControl>
      {/* Topic Name */}

        <Box my="auto" mr={1} ml={3}>
           <Typography variant="h6" >Course Id </Typography>
        </Box>
      <FormControl >
        <TextField
          variant="outlined"
          id="courseId"
          name="courseId"
          onChange={e => dispatch({type:'field' ,field:'courseId', value:e.target.value})}
          error={courseId === ""}
          value={courseId}
        />
      </FormControl>


          <Box my="auto" ml={3} >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Add course
            </Button>
          </Box>
      </Box>


    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>course Name</StyledTableCell>
            <StyledTableCell align="center">course ID</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { allCourses!==[]? allCourses.map((row,index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.courseName}
              </StyledTableCell>
              <StyledTableCell align="center">{row.courseId}</StyledTableCell>
              <StyledTableCell align="center">
                  <Button onClick={()=>handledelete(index)}>
                      delete
                  </Button>
              </StyledTableCell>
              
            </StyledTableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
