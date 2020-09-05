import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Teamtable from './Teamtable'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Teams({topic, handleAddstudents,handleDeletestudents,indexoftopic}) {
  const classes = useStyles();
  const allTeams = topic.Teams ?  topic.Teams.map((Team,ind)=>{
        let teamtable = null
        if(Team.teamMember.length!==0)
            teamtable = (<Grid item xs={6}>
            <Teamtable topic={topic} handleAddstudents={handleAddstudents} handleDeletestudents={handleDeletestudents} index = {ind} indexoftopic={indexoftopic}/>
            </Grid>)
        
       
        return teamtable
      }
  ):null
           
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
                {allTeams}
      </Grid>
    </div>
  );
}
