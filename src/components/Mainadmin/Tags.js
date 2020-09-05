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
          TagName:'',
          
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
  TagName:"",
  Tagsarray:[],
  Error : { message:"click on button for create topic" , color:"black" }

}

export default function CustomizedTables() {
  const classes = useStyles();
  const { Tags,editTags } = useContext(Mainc)
  const [state, dispatch] = useReducer(CreatetopicReducer, initialState)
  const { TagName,Tagsarray } = state;
    const [change, setchange] = useState(false)
const handledelete=(index)=>{


        let dummy = [...Tags]
        console.log(dummy[index])
        axios.delete("http://localhost:5000/Tags/"+dummy[index]._id)
        .then(()=>{
          dummy.splice(index,1);
          editTags(dummy)
         
        }).catch(err=>console.log(err))      
}

        useEffect(() => {
                let dummy= [...Tags]
                dispatch({type:"field","field":"Tagsarray",value:dummy})
                console.log("effect")
        }, [Tags])
const handleSubmit = () => {
  
  if (TagName === "")
   {
    dispatch({type:"seterror"})
  }
  else
  {
      let  newValue = { TagName }
      // console.log(newTopic);
      axios.post("http://localhost:5000/Tags/add",newValue)
      .then((data) => {
            let dummy = [...Tags, data.data]
            dispatch({type:'submit'})
            editTags(dummy)
            
      }).catch(err=>alert(err))


  }
};
  return (
    <>
      <Box display="flex" justifyContent="left"  mb={3}>
         {/* Topic Name */}
         
         <Box my="auto" mr={1}>
           <Typography variant="h6" >Tag Name</Typography>
        </Box>
      
          <FormControl >
            <TextField
              variant="outlined"
              id="TagName"
              name="TagName"
              onChange={e => dispatch({type:'field' ,field:'TagName', value:e.target.value})}
              error={TagName === ""}
              value={TagName}
            />
          </FormControl>
      {/* Topic Name */}

        

          <Box my="auto" ml={3} >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Add Tag
            </Button>
          </Box>
      </Box>


    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tag Name</StyledTableCell>
           
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { Tagsarray.map((row,index) => (
            <StyledTableRow key={row.TagName}>
              <StyledTableCell component="th" scope="row">
                {row.TagName}
              </StyledTableCell>
           
              <StyledTableCell align="center">
                  <Button onClick={()=>handledelete(index)}>
                      delete
                  </Button>
              </StyledTableCell>
              
            </StyledTableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
