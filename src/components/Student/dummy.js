
import React, {  useState, useEffect } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

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
// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 0 * 2,
  margin: `0 0px ${0}px 0`,

  // change background colour if dragging
  background: isDragging ? "gray" : "white",
  width:1000,  
  display:"flex",
 
  
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "white" : "white",
  padding: 0,
  width: 250
});

const App = () => {
  const [items, setitems] = useState([]);
  useEffect(() => {
    let dummyitems = getItems(10);
    if (dummyitems) setitems(dummyitems);
  }, []);

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const dummyitems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setitems(dummyitems);
    console.log(dummyitems);
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

  return (
    <TableContainer component={Paper}>
    <Table aria-label="customized table">
     
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tables">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                    <StyledTableRow>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                      <Box display="flex" m={2} width="inherit">
                             <Box align="left" >{item.content}</Box>
                             <Box ml="auto">{item.content}</Box>
                      </Box>   
                  </div>
                  </StyledTableRow>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </Table>
    </TableContainer>



  );
};
export default App
