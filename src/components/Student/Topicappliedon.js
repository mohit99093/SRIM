import React, { useContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Stuc } from "./StudentContext"
import Button from "@material-ui/core/Button";
import Axios from 'axios';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
const initialstate={
    alltopics:[]
}
export default function Topicappliedon(props) {
  const classes = useStyles();
  const  {  profile,
    studentName,
    studentobjId,
    studentId,
    emailId,
    finalgrade,
    results, appliedTopics,editAppliedTopic, editloader } = useContext(Stuc)
      console.log(appliedTopics)
  const handlestage2=(indexofrow,indexoftopic)=>{
         
      let data =appliedTopics[indexofrow].topics[indexoftopic] 
      data = {
        ...data,
        stage3:true
      }
      appliedTopics[indexofrow].topics[indexoftopic] = data
      
      let newstudent = {
        profile,
        studentName,
        studentId,
        emailId,
        finalgrade,
        results,
        appliedTopics,       
    }
    editloader(true)
    Axios.post(`http://localhost:5000/student/update/`+studentobjId, newstudent).then(res=>console.log("student update")).
    catch(err=>console.log(err))
    editAppliedTopic(appliedTopics)
    editloader(false)

  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Topic Name</StyledTableCell>
            <StyledTableCell align="center">Professor Name</StyledTableCell>
            <StyledTableCell align="center">Approveby professor</StyledTableCell>
            <StyledTableCell align="center">Send for Final Approval(stage-3)</StyledTableCell>
            <StyledTableCell align="center">Status for Final Approval</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { appliedTopics ? appliedTopics.map((row,indexofrow) =>{
               
              return row.topics.map((topic,indexoftopic)=>
          (
            <StyledTableRow key={row.Id}>
              <StyledTableCell component="th" scope="row">
                {topic.topicName}
              </StyledTableCell>
              <StyledTableCell align="center">{row.profName}</StyledTableCell>
              <StyledTableCell align="center">{topic.stage2?"Yes":"No"}</StyledTableCell>
              <StyledTableCell align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={()=>handlestage2(indexofrow,indexoftopic)}
                disabled={ (topic.stage2 && !topic.stage3)?false:true}
                >
                {topic.stage3?"Applied":"Apply"}
                </Button>
                </StyledTableCell>
              <StyledTableCell align="center">{topic.stage4?"Yes":"No"}</StyledTableCell>
            </StyledTableRow>
          ))}) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}