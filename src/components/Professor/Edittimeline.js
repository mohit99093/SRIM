import React, { useContext, useReducer, useState, useEffect } from "react"
import Box from "@material-ui/core/Box";
import { Autocomplete } from "@material-ui/lab"
import TextField from "@material-ui/core/TextField";
import { Profc } from "./ProfessorContext"
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';        
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Divider } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Axios from "axios"

import {gettopicname,getteamindex,formatDate} from "../usefulfunction"

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
function CreatetimelineReducer(state, action) {
    switch (action.type) {
      case 'intialvalues':{
          return {
            ...state,
            stageName:"",
            fileinput:false,
            selectedDate: "",
            discription:"",
            selectedStageindex:-1
          }
      }
      case 'field':{
        return {
          ...state,
          [action.field] : action.value,
          Error : {message:"",color:"black"}
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

Array.prototype.insert = function ( index, item ) {
  this.splice( index, 0, item );
};
const initialState = {
    optionsforTeams:[],
    selectedTeam:"",
    stageName:"",
    fileinput:false,
    selectedDate:"",
    discription:"",
    currentstages:[],
    selectedtopicName:"",
    selectedTeamindex:-1,
    selectedStageindex:-1,
    selectedTopicindex:-1,
    Error : { message:"" , color:"black" }
}
const Createtimeline = ()=>{
        const [state, dispatch] = useReducer(CreatetimelineReducer, initialState)

        const { optionsforTeams,
                selectedTeam,
                stageName,
                fileinput,
                selectedDate,
                discription,
                currentstages,
                selectedtopicName,
                selectedTeamindex,
                selectedStageindex,
                selectedTopicindex,
                Error } = state 

        const { topics,editTopic, editloader }  = useContext(Profc)   


        useEffect(() => {
            let dummyoptionforTeams = []
            let noofteams = []
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
            console.log(dummyoptionforTeams)
            dispatch({type:"field",field:"optionsforTeams",value:noofteams})
        }, [topics])


        const classes = useStyles();
        const [expanded, setExpanded] = useState(false);
      
        const handleChange = (index) => (event, isExpanded) => {
          setExpanded(isExpanded ? index : false);
          if(isExpanded)
          {
            dispatch({type:"field",field:"selectedStageindex",value:index})   
            dispatch({type:"field",field:"stageName",value:currentstages[index].stageName})
            dispatch({type:"field",field:"fileinput",value:currentstages[index].fileinput})
            dispatch({type:"field",field:"selectedDate",value:formatDate(currentstages[index].selectedDate)})
            dispatch({type:"field",field:"discription",value:currentstages[index].discription})
          }
          else
          {
                dispatch({type:"intialvalues"})
          }
        };
      
        const Addnewstage = ()=>{
                    let newstage = {
                            stageName,
                            fileinput,
                            selectedDate,
                            discription
                    }
                  
                    // let newstages = [...currentstages ]
                    // newstages.insert(newstages.length-1,newstage) 
                    // console.log(newstage)
                    // dispatch({type:"field",field:"currentstages",value:newstages})
                    // dispatch({type:"createtimeline"})

                  
          
                    let grads = [] 
                    topics[selectedTopicindex].Teams[selectedTeamindex].teamMember.forEach((sId)=>{
                      grads.push({studentId:sId, g:0})
                      })     
                      console.log(grads)
                     newstage = {
                            stageName,
                            fileinput,
                            selectedDate,
                            discription,
                            grads,
                            iscompleted:false
                    }
                                      
                    let newstages = [...currentstages ]
                    newstages.insert(newstages.length-1,newstage) 
                  
                    topics[selectedTopicindex].Teams[selectedTeamindex].timeline = [...newstages]              

                    dispatch({type:"field",field:"currentstages",value:newstages})
                    dispatch({type:"createtimeline"})
                    dispatch({type:"unseterror"})

        }

        const handledelete = (index)=>{
                let newstages = [...currentstages]
                newstages.splice(index,1)
                dispatch({type:"field",field:"currentstages",value:newstages})
        }
      
        const handleseedetails =()=>{
             if(selectedTeam==="")
             {
                 dispatch({type:"seterror"})
             }   
             else{
               let topicname = gettopicname(selectedTeam)
               let dummyteamindex = getteamindex(selectedTeam)+1
               let topic = {}
               let k =0;  
               let teamindex = -1;
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
                                         teamindex = j     
                                         alert(j)
                                         break;
                                       }
                           }
 
                      }
               }
            dispatch({type:"field", field:"selectedtopicName",value:  topicname})
            dispatch({type:"field", field:"selectedTeamindex",value:teamindex})
            let dummycurrentstages = []
            console.log(topics[0].topicName.length)
            console.log(topicname.length)
            console.log(topics[0].topicName)
            console.log(topicname)
            topics.forEach((topic,indexoftopic) => {
                if(topic.topicName === topicname)
                {       console.log("YES this is edittimeline")
                        dummycurrentstages =  topic.Teams[teamindex].timeline   
                        dispatch({type:"field", field:"selectedTopicindex", value:indexoftopic})
                }
            })
            dispatch({type:"field" , field:"currentstages", value:dummycurrentstages})
            dispatch({type:"unseterror"})
        }
        }
        const handlesavestage=()=>{
                let dummycurrentstages = [...currentstages]
                let dummystage = {
                        stageName,
                        fileinput,
                        selectedDate,
                        discription
                }
                dummycurrentstages[selectedStageindex] = dummystage
                dispatch({type:"field", field:"currentstages", value:dummycurrentstages})
        }
        
        const handlesavetimeline=()=>{
                let dummytopics = [...topics]
                dummytopics[selectedTopicindex].Teams[selectedTeamindex].timeline = currentstages
                editTopic(dummytopics)
                let topic = dummytopics[selectedTopicindex]
                
                let newtopic = {
                  topicName:topic.topicName,
                  Tags:topic.Tags,
                  Prerequisite:topic.Prerequisite,
                  Discription:topic.Discription,
                  Students:topic.Students,
                  finalStudents:topic.finalStudents,
                  Teams:topic.Teams,
                  profobjId:topic.profobjId
                }
                  editloader(true)
                  Axios.post(`http://localhost:5000/alltopics/update/`+topic._id, newtopic)
                  .then(res=>console.log("topics apdetd"))
                  .catch(err=>console.log(err))
                  editloader(false)
        }
        let temp =currentstages ? currentstages.map((stage,index)=>(
            <Accordion expanded={expanded === index} onChange={handleChange(index)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>Stage {index+1}</Typography>
             
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
              {index!==currentstages.length-1?
              <Box ml="auto" onClick={()=>handledelete(index)} >
                <IconButton aria-label="delete" p={0} m={0}  ml="auto">
                                <DeleteIcon  fontSize="large" />
                            </IconButton>
                      
              </Box>:null}
            </AccordionDetails>
                    
          </Accordion>
        )) : null

        return (
            <>

            {/* Select Teams */}
            <Box>
                <Autocomplete
                    
                    id="tags-standard"
                    options={optionsforTeams}
                    getOptionLabel={option => option}
                    filterSelectedOptions
                    value={selectedTeam}
                    onChange={(event, getOptionSelected) =>dispatch({type:'field' ,field:'selectedTeam', value:getOptionSelected})}
                    renderInput={params => (
                        <TextField
                        {...params}
                        variant="outlined"
                        label="Slelect a Team"
                        placeholder="Select Teams"
                        color="primary"
                        error={selectedTeam.length===0}
                        />
                    )}
                />
            </Box>
            {/* End select Teams */}

            {/* See Stages Button */}
            <Box mt={2} display="flex" >
            <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={()=>handleseedetails()}
            >
            See the Details
            </Button>
            <Box ml={2} color={Error.color} fontSize={20} m="auto">
                {Error.message}
            </Box>

            </Box>           
             {/* End See Stage Button */}


               {/* Details of Timeline */}
            <div className={classes.root} >
                                        {temp}
             </div>

             {/* end of details of timeline */}
            {/* Stage Name */}
            <Box>
                <div >
                    <h2>Stage Name</h2>
                </div>
                <FormControl fullWidth>
                    <TextField
                    variant="outlined"
                    id="Stage Name"
                    name="stageName"
                    onChange={e => dispatch({type:'field' ,field:'stageName', value:e.target.value})}
                    error={stageName === ""}
                    value={stageName}
                    />
                </FormControl>    
            </Box>
            {/* End stage Name */}

            
            <Box display='flex'>

                {/* Boolean file inout */}
                <Box mt={2} >
                <FormControlLabel
                    control={
                                <Checkbox
                            checked={fileinput}
                            onChange={(e)=>dispatch({type:'field' ,field:'fileinput', value:!fileinput})}
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Wants to student input any file"
                />
                </Box>
                {/* End Boolean file inout */}


                {/* Date Picker  */}
                <Box  ml={5} mt={2} >
                    <TextField
                        id="selectedDate"
                        label=""
                        type="date"
                        value={selectedDate}
                        defaultValue={formatDate(new Date())}
                        format= 'dd-mm-yyyy'
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={e =>dispatch({type:'field' ,field:'selectedDate', value:e.target.value})}
                    />
              
                </Box>
                {/* End Date Picker */}
            </Box>

            {/* State of Discription */}
            <Box>
                    <div >
                        <h2>Discription of Stage</h2>
                    </div>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        value={discription}
                        onChange={e =>dispatch({type:'field' ,field:'discription', value:e.target.value})}
                        multiline
                        rows={7}
                        variant="outlined"
                        error={discription === ""}
                    />
            </Box>
            {/* End of Discription */}

            <Box mt={2} display="flex" >
                <Box>
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={()=>handlesavestage()}
                    disabled={expanded===currentstages.length-1}
                    >
                        Save Stage
                    </Button>
                    <Box ml={2} color={Error.color} fontSize={20} m="auto">
                        {Error.message}
                    </Box>
                </Box>            

                <Box ml="auto">        
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={()=>Addnewstage()}
                    disabled={expanded===currentstages.length-1}
                    >
                        Add New Stage
                    </Button>
                    <Box ml={2} color={Error.color} fontSize={20} m="auto">
                        {Error.message}
                    </Box>            
                </Box>            

            </Box>       

            <Box mt={2} >
                <Button fullWidth variant="contained" color="secondary" onClick={handlesavetimeline}>
                    SAVE TIMELINE
                </Button>
            </Box>                                     
            </>
        ) 
}

export default Createtimeline


