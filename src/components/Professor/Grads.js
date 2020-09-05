import React, { useContext, useReducer, useState, useEffect } from "react"
import Box from "@material-ui/core/Box";
import { Autocomplete } from "@material-ui/lab"
import TextField from "@material-ui/core/TextField";
import { Profc } from "./ProfessorContext"
import Button from "@material-ui/core/Button";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';        
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Divider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getteamindex,gettopicname} from "./usefulfunction"
import Axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginTop : 10,
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
function GreadReducer(state, action) {
    switch (action.type) {
      case 'createtimeline':{
          return {
            ...state,
            stageName:"",
            fileinput:false,
            selectedDate: Date.now(),
            discription:""
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
    optionsforTeams:[],
    selectedTeam:"",
    selectedtimeline:[],
    alltimelines : [],
    allteamsMemebers:[],
    allstagegrads:[],
    rows:[],
    Error : { message:"" , color:"black" }
}

const Grads=()=>{
       const [state, dispatch] = useReducer(GreadReducer, initialState)
       const { optionsforTeams,
               selectedTeam,
               selectedtimeline,
               alltimelines,
               allstagegrads,
               rows,
               Error  } = state 

        const [expanded, setExpanded] = useState(false);
       
        const handleChange = (indexofstage) => (event,isExpanded) => {
        //  console.log( allstagegrads[indexofstage])   
                    setExpanded(isExpanded ? indexofstage : false);
                    if(isExpanded)
                    { 
                            
                              let dummyrows = allstagegrads[indexofstage]         
                              console.log(dummyrows)
                              dispatch({type:"field",field:"rows",value:dummyrows})
                              // console.log(dummyrows)
                    }
        }
       const classes = useStyles();      
       const { topics,editTopic, editloader } = useContext(Profc)    
        useEffect(() => {
            let noofteams = []
            let dummyalltimeline = []
            let dummyallteamsMemebers = []
           
            topics.forEach((topic,i) => {
              let no = 0
                topic.Teams.forEach((t,j)=>{

            
                  if(t.teamMember.length!==0)
                  {        no = no + 1;
                          if(t.timeline.length!==0)
                          {
                            noofteams.push(`${topic.topicName}  team-${no}`)
                           
                            dummyallteamsMemebers.push({topicName:topic.topicName , indexoftopic:i, indexofteam:j })
                          }
                  }
                    // noofteams.push(`${topic.topicName}  team-${j+1}`)
                    dummyalltimeline.push(t.timeline)
                }) 
            })             
            
            console.log(noofteams)
            console.log(dummyalltimeline)
            dispatch({type:"field",field:"alltimelines",value:dummyalltimeline})
            dispatch({type:"field",field:"optionsforTeams",value:noofteams})
            dispatch({type:"field",field:"allteamsMemebers",value:dummyallteamsMemebers})
        }, [topics])        

        const handlesearch = ()=>{
          
            if( selectedTeam.length===0 )
            {
             
              dispatch({type:'seterror'})
            }
            else
            {
              let dummyselectedtimeline = []
              let topicname = gettopicname(selectedTeam)
              let indexofselectedteam = getteamindex(selectedTeam)+1
              let topic = {}
              let k =0;  
              let dummyteamindex = indexofselectedteam;
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
                                        indexofselectedteam = j     
                                        alert(j)
                                        break;
                                      }
                          }

                     }
              }
              console.log(topics)
              console.log(indexofselectedteam)
              dummyselectedtimeline.push(alltimelines[indexofselectedteam])
              console.log(dummyselectedtimeline)
              dispatch({type:"field",field:"selectedtimeline",value:dummyselectedtimeline})
              dispatch({type:'unseterror'})
              let dummyallstagegrads = []
              dummyselectedtimeline.forEach((timeline)=>{
                        timeline.forEach(stage=>{
                                console.log(stage.grads)
                                dummyallstagegrads.push(stage.grads)
                        })
              })
              dispatch({type:"field",field:"allstagegrads",value:dummyallstagegrads})
            }
          }

          const handlegradschange=(e,indexofrow)=>{
            
            rows[indexofrow].g = e.target.value
            console.log(rows)
            let indexofselectedteam = getteamindex(selectedTeam)+1
            let selectedtopicName = gettopicname(selectedTeam)
            let topic = {}
            let k =0;  
             let dummyteamindex = indexofselectedteam;
              for(let i=0;i<topics.length;i++)
              {
                     if( topics[i].topicName === selectedtopicName )
                     {    topic = topics[i]
                          for(let j=0;j<topics[i].Teams.length;j++)
                          {
                                      if(topics[i].Teams[j].teamMember.length!==0)
                                      {
                                            k=k+1;
                                      }
                                      if(k==dummyteamindex)
                                      {
                                        indexofselectedteam = j     
                                       
                                        break;
                                      }
                          }

                     }
              }
            let dummytopics = [...topics]

            dummytopics.forEach((topic,indexoftopic)=>{
                    if(topic.topicName===selectedtopicName)
                    {
                            topic.Teams[indexofselectedteam].timeline[expanded].grads = rows 
                    }
            })
            editTopic(dummytopics)
            
          }
          const handlesavegrads=()=>{
            let topicname = gettopicname(selectedTeam)
            let dummyteamindex = getteamindex(selectedTeam)+1
            let teamindex = -1;
            let topicindex = 1;
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
                                      teamindex = j
                                      topicindex = i
                                      break;
                                    }
                        }

                  }
            }

              topic = topics[topicindex]
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
                    // editTopic(dummytopics)

          }

        const   handlecompleteinternship= async()=>{
          let indexofselectedteam = getteamindex(selectedTeam)+1
          let selectedtopicName = gettopicname(selectedTeam)
          let topic = {}
          let k =0;  
           let dummyteamindex = indexofselectedteam;
            for(let i=0;i<topics.length;i++)
            {
                   if( topics[i].topicName === selectedtopicName )
                   {    topic = topics[i]
                        for(let j=0;j<topics[i].Teams.length;j++)
                        {
                                    if(topics[i].Teams[j].teamMember.length!==0)
                                    {
                                          k=k+1;
                                    }
                                    if(k==dummyteamindex)
                                    {
                                      indexofselectedteam = j     
                                     
                                      break;
                                    }
                        }

                   }
            }
            topic.Teams[indexofselectedteam].timeline[expanded].iscompleted = true
            // console.log(topic)
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
            await  Axios.post(`http://localhost:5000/alltopics/update/`+topic._id, newtopic)
            .then(res=>console.log("topics apdetd"))
            .then((err)=>console.log(err))
            alert("grads updeted")
            
            let grads =    topic.Teams[indexofselectedteam].timeline[ topic.Teams[indexofselectedteam].timeline.length-1].grads
            grads.forEach(async obj => {
              await Axios.get(`http://localhost:5000/student/getbystudentId/`+obj.studentId).then(async (res)=>{
                let student =  res.data[0]
                let newstudent = {
                    ...student,
                    finalgrade:obj.g
                }
                await Axios.post(`http://localhost:5000/student/update/`+student._id, newstudent).then((res)=>console.log("student grad updeted")).catch((err)=>console.log(err))
              }).catch((err)=>console.log(err))

            });

            editloader(false)
           
          }
        

          let temp = selectedtimeline ? selectedtimeline.map((timeline,indexoftiemline)=>{
            return ( 
                <>
                <Box>
                    <Box component="h2"   display="flex">
                        {selectedTeam}
                    </Box>
                {timeline.map((stage,indexofstage)=>(
                <Accordion expanded={expanded ===indexofstage} onChange={handleChange(indexofstage)}>
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

    let gradtable = rows.length!==0 ? (
        <>
        <Box mt={5}>
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell align="">Grads</TableCell>
                
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row,indexofrow) => (
                <TableRow key={row.studentId}>
                <TableCell component="th" scope="row">
                    {row.studentId}
                </TableCell>
                <TableCell align="">
                    <TextField  size="small" value={row.g} onChange={(e)=>handlegradschange(e,indexofrow)} />
                </TableCell>
                </TableRow>
            ))
        
            }
            </TableBody>
        </Table>
        </TableContainer>
    </Box>

    <Box mt={2} display="flex" >
        <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handlesavegrads}
        >
            SAVE GRADS 
        </Button>
        <Box ml={2} color={Error.color} fontSize={20} m="auto">
            {Error.message}
        </Box>
    </Box>
    </>):null
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

            <Box>           
                  {gradtable}
            </Box> 

            { expanded===allstagegrads.length-1?

            <Box mt={5} >
                <Button fullWidth variant="contained" color="secondary" onClick={()=>{handlecompleteinternship()}}>
                      COMPLETE INTERSHIP : GRAD UPDETE
                </Button>
            </Box>   :    
                  null
            }

            </>
        )
}

export default Grads