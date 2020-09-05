import React, { useContext, useReducer, useState, useEffect } from "react"
import Box from "@material-ui/core/Box";
import { Autocomplete } from "@material-ui/lab"
import TextField from "@material-ui/core/TextField";
import { Profc } from "./ProfessorContext"
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';        
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { gettopicname, getteamindex }   from "./usefulfunction"

const useStyles = makeStyles((theme) => ({
            root: {
              width: '100%',
              marginTop : 50,
              padding:5
            },
            heading: {
              fontSize: theme.typography.pxToRem(15),
              flexBasis: '33.33%',
              flexShrink: 0,
            },
            secondaryHeading: {
              fontSize: theme.typography.pxToRem(15),
              color: theme.palette.text.secondary,
            },
          }));        
function ListtimelineReducer(state, action) {
    switch (action.type) {
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
    optionsforTeams:[],
    selectedTeams:[],
    selectedtimeline:[],
   
    Error : { message:"" , color:"black" }
}
const Listtimeline = ()=>{
        const [state, dispatch] = useReducer(ListtimelineReducer, initialState)
        const { topics } = useContext(Profc)
        const { optionsforTeams,
                selectedTeams,
                selectedtimeline,
               
                Error
                 } = state 
        useEffect(() => {
            let noofteams = []
            let dummyalltimeline = []
            topics.forEach((topic,i) => {
                let no = 0
                topic.Teams.forEach((t,j)=>{

            
                  if(t.teamMember.length!==0)
                  {        no = no + 1;
                          if(t.timeline.length!==0)
                          {
                            noofteams.push(`${topic.topicName}  team-${no}`)
                          }
                  }
                    // noofteams.push(`${topic.topicName}  team-${j+1}`)
                   
                })           
            });
            console.log(noofteams)         
            dispatch({type:"field",field:"optionsforTeams",value:noofteams})
        }, [topics])


        const classes = useStyles();
        const [expanded, setExpanded] = useState(false);
      
        const handleChange = (indexofstage) => (event, isExpanded) => {
          setExpanded(isExpanded ? indexofstage : false);
        };
        const handlesearch = ()=>{
          
          if( selectedTeams.length===0 )
          {
           
            dispatch({type:'seterror'})
          }
          else
          {

            let dummyselectedtimeline = []
            selectedTeams.forEach((string,i)=>{
              
                    let topicname = gettopicname(string)
                    let dummyteamindex = getteamindex(string)+1
              let topic = {}
              let k =0;  
              for(let i=0;i<topics.length;i++)
              {
                     if( topics[i].topicName === topicname )
                     {    topic = topics[i]
                          for(let j=0;j<topics[i].Teams.length;j++)
                          {
                                      if(topics[i].Teams[j].teamMember.length!==0)
                                      {
                                            k=k+1;
                                      }
                                      if(k==dummyteamindex)
                                      {
                                        dummyselectedtimeline.push(topics[i].Teams[j].timeline)              
                                        // alert(j)
                                        break;
                                      }
                          }

                     }
              }
                  
                  
            })

            console.log(dummyselectedtimeline)
            dispatch({type:"field",field:"selectedtimeline",value:dummyselectedtimeline})
            dispatch({type:'unseterror'})
          }
        }
    
        let temp = selectedtimeline ? selectedtimeline.map((timeline,indexoftiemline)=>{
                return ( 
                    <>
                    <Box>
                        <Box component="h2"   display="flex">
                            {selectedTeams[indexoftiemline]}
                        </Box>
                    {timeline.map((stage,indexofstage)=>(
                    <Accordion expanded={expanded ===`${stage.stageName}+${indexofstage}`} onChange={handleChange(`${stage.stageName}+${indexofstage}`)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>Stage {indexofstage+1}</Typography>
                     
                    </AccordionSummary>
                    <Divider/>
                    <AccordionDetails>
                      <Box >  
                       <List p="0">
                        <ListItem >Stage Name: {stage.stageName}</ListItem>
                        <ListItem >file input: {stage.fileinput?"Yes":"NO"}</ListItem>
                        <ListItem>Date: {stage.selectedDate}</ListItem>
                        <ListItem>Discription :  {stage.discription}</ListItem> 
                                            
                      </List>   
                      </Box>              
                    </AccordionDetails>
                            
                  </Accordion>
                ))}
                </Box>
                </>
                )
                
        }) : null

        return (
            <>

            {/* Select Teams */}
            <Box>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={optionsforTeams}
                    getOptionLabel={option => option}
                    filterSelectedOptions
                    value={selectedTeams}
                    onChange={(event, getOptionSelected) =>dispatch({type:'field' ,field:'selectedTeams', value:getOptionSelected})}
                    renderInput={params => (
                        <TextField
                        {...params}
                        variant="outlined"
                        label="Slelect multiple Teams"
                        placeholder="Select Teams"
                        color="primary"
                        error={selectedTeams.length===0}
                        />
                    )}
                />
            </Box>

            <Box mt={2} display="flex" >
                <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handlesearch}
                >
                Search
                </Button>
                <Box ml={2} color={Error.color} fontSize={20} m="auto">
                    {Error.message}
                   
                </Box>
            </Box>  
            {/* End select Teams */}

            <div className={classes.root} >
                                        {temp}
             </div>

            </>
        ) 
}

export default Listtimeline


