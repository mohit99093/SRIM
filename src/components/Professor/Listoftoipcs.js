import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { Profc } from "./ProfessorContext"
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(200),
        height: theme.spacing(7),
        
      },    
    },
    paper:{
        width:'auto',
        height: 'auto'
    }
  }));
  
  export default function SimplePaper({setindexofseletedtopic}) {
    const classes = useStyles();
    const { topics, topicobj, profobjId, editTopic } = useContext(Profc)
    useEffect(() => {
        console.log(topics)
    }, [topics])
    console.log(topics)
    return (
      <div className={classes.root}> 
 
        { topics.length!==0?topics.map((topic,i)=>(
                topic.topicName ? 
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
                                onClick = {()=>setindexofseletedtopic(i)}                            
                              >
                                SEE DETAILS
                          </Button>
                          </Link>
                        </Box>
                    </Box>
                 </Paper>  : null    
        )) : <Typography variant="h4" >...Create the Topic First</Typography> }
       
      </div>
    );
  }