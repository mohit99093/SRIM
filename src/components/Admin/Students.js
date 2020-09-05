import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

export default function CustomizedTables({topic}) {
  const classes = useStyles();
  const [rows, setrows] = useState([])  
  useEffect(() => {
        setrows(topic.finalStudents)

  }, [])
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student Id</StyledTableCell>
            <StyledTableCell align="center">Final Grade</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          { rows!==[] ? rows.map((row) => (
            <StyledTableRow key={row.studentId}>
              <StyledTableCell component="th" scope="row">
                {row.studentId}
              </StyledTableCell>
              <StyledTableCell align="center">{row.finalGrade}</StyledTableCell>
              
            </StyledTableRow>
          )):null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
