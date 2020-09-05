import React, {useState, useEffect} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';





export default function Teamtable({topic, handleAddstudents,handleDeletestudents, index}) {
    
    const [teamMember, setteamMember] = useState([])
 
    useEffect(() => {
        
        setteamMember(topic.Teams[index].teamMember)
        console.log("Addstudents")
    }, [topic.Teams[index].teamMember, index, topic.Teams])
    
   
    
  return (
    <TableContainer component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Student Id</TableCell>
            <TableCell >
                <Button onClick={()=>handleAddstudents(index,teamMember)}>
                    Add student
                </Button>

            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamMember.map((Member,indexofstudent) => (
            <TableRow key={indexofstudent}>
              <TableCell component="th" scope="row">
                {Member}
              </TableCell>
              <TableCell component="th" scope="cell" onClick={()=>handleDeletestudents(indexofstudent,index,teamMember)}>
                    <IconButton aria-label="delete" p={0} m={0} size="small" >
                        <DeleteIcon  />
                    </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
