import React,{ useContext, useReducer, useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";

import { Admc } from "./AdminContext"
import { Autocomplete } from "@material-ui/lab"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
    fontSize:'50px'
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
    const [optionsforyear, setoptionsforyear] = useState([])
    const {  allStudents } = useContext(Admc)

    const classes = useStyles();
    
    useEffect(() => {
        let dummyoption = []
        allStudents.forEach((year)=>{
                dummyoption.push(year.year)
        })
        setoptionsforyear(dummyoption)
    }, [allStudents])
    const hendlesearch=(value)=>{

        dispatch({type:"field",field:"searchValue",value:value})
        let sortedStudents = []
      
        if(value){
       
        allStudents.forEach((year)=>{ 
        if(year.year===value)
        sortedStudents=[...year.students]
       })
      }
       if(sortedStudents!==[])
        dispatch({type:"field",field:"sortedValue",value:sortedStudents})
      
    }

    

    return (
        <>
            {/* Topic Name */}
            <div >
                <h2>Search by Year</h2>
            </div>
            <Autocomplete
                
                id="tags-standard"
                options={optionsforyear}
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


            <Box mt={5}> 
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Student Id</StyledTableCell>
                        <StyledTableCell align="center">Professor Name</StyledTableCell>
                        <StyledTableCell align="center">Final Grad</StyledTableCell>
                       
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    { sortedValue!==[] ? sortedValue.map((row) => (
                        <StyledTableRow key={row.studentId}>
                        <StyledTableCell component="th" scope="row">
                            {row.studentId}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.profName}</StyledTableCell>
                        <StyledTableCell align="center">{row.finalGrade}</StyledTableCell>
                        
                        </StyledTableRow>
                    )):null}
                    
                    </TableBody>
                </Table>
            </TableContainer>
        

            </Box>
        </>
    )
}

export default Searchprofname