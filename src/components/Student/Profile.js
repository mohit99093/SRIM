import React, { useState,useContext, useReducer, useEffect } from "react"
import { Stuc } from "./StudentContext" 
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';        
import { Divider } from "@material-ui/core";
import Resultofsem from "./Resultofsem"
import Paper from '@material-ui/core/Paper';


import Grid from '@material-ui/core/Grid';

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
    intrest:{
        display:'flex',
        justifyContent:'center'
    },
    toolsAndTechnology:{
        minHeight :"509x"
    }
  }));     



function ProfileReducer(state, action) {
    switch (action.type) {
      case 'saveProfile':{
          return {
            ...state,
            toolsAndTecnology:"",
            intrest:[],
            other:""
          }
      }
      case 'field':{
        return {
          ...state,
          changed:true,
          [action.field] : action.value,
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
    toolsAndTechnology:[],
    intrest:[],
    other:"",
    changed:false
}

const Profile = ()=>{

            
        const {  studentName,
            studentId,
            studentobjId,
            profile,
            results,
            editProfile,
            finalApprove,
            editAppliedTopic } = useContext(Stuc)
            const classes = useStyles();
            const [expanded, setExpanded] = useState(false);
            console.log(finalApprove)
            const [state, dispatch] = useReducer(ProfileReducer, initialState)
            const { toolsAndTechnology,intrest,other,changed } = state

            useEffect(() => {
               if(profile)
               {    
                dispatch({type:"field",field:"toolsAndTechnology",value:profile.toolsAndTechnology})
                dispatch({type:"field",field:"intrest",value:profile.intrest})
                dispatch({type:"field",field:"other",value:profile.other})
                dispatch({type:"field",field:"changed",value:false})
               }
            }, [profile])

            const handleChange = (indexofsem) => (event, isExpanded) => {
                setExpanded(isExpanded ? indexofsem : false);
              //  alert(indexofsem)
              };

              const addtoolsAndTechnology = chip => {
                let newvalues = [...toolsAndTechnology, chip];
                dispatch({type:'field' ,field:'toolsAndTechnology', value:newvalues})
                console.log(toolsAndTechnology);
              };

              const removetoolsAndTechnology = chip => {
                let newvalues = toolsAndTechnology.filter(function(item) {
                  return item !== chip;
                });
                dispatch({type:'field' ,field:'toolsAndTechnology', value:newvalues})
                console.log(toolsAndTechnology);
              };
              const addintrest = chip => {
                let newvalues = [...intrest, chip];
                dispatch({type:'field' ,field:'intrest', value:newvalues})
                console.log(intrest);
              };

              const removeintrest = chip => {
                let newvalues = intrest.filter(function(item) {
                  return item !== chip;
                });
                dispatch({type:'field' ,field:'intrest', value:newvalues})
                console.log(intrest);
              };

              const handlesave=()=>{
                let newprofile = {...profile, toolsAndTechnology,intrest,other }
               
                editProfile(newprofile)
              
              }
             console.log(changed) 
             
            let seeresults = results ? results.map((sem,indexofsem)=>
                (
                    <Accordion expanded={expanded ===indexofsem} onChange={handleChange(indexofsem)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>sem {indexofsem+1}</Typography>
                     
                    </AccordionSummary>
                    <Divider/>
                    <AccordionDetails>
                      <Box >  
                            <Resultofsem subject={sem.subject}  />   
                      </Box>              
                    </AccordionDetails>
                            
                  </Accordion>
                   
                )
                
        ) : null
    
        let seeprofessordetails = finalApprove.profName!=="" ? (
            <>
        <Box display="flex" mt={3}>
            <Box >
                <h2>Professor Name: {finalApprove.profName}</h2>
            </Box>

            <Box ml={5}>
                <h2>topic Name: {finalApprove.topicName}</h2>
            </Box>
        </Box>

        <Divider/>
        <Divider/>    
        <Box display="flex" mt={3}>
            <Box >
                <h2>Final Grad: {finalApprove.finalgrade}</h2>
            </Box>
        </Box>
        </>
            ):null


        let seeother = other!="" ? (
        <>
        <div className={classes.tegs}>
            <h2>Other Details</h2>
       </div>
       <Box ml={5}>
               <Typography variant='h6'> {other} </Typography>
       </Box>
       </>):null

            return (
            <>
                <Box display="flex" >
                    <Box >
                        <h2>Student Name: {studentName}</h2>
                    </Box>

                    <Box ml={5}>
                         <h2>Student Id: {studentId}</h2>
                    </Box>
                </Box>

                <Divider/>
                <Divider/> 

                <Box >
                    {seeprofessordetails}
                </Box>

                <Divider/>
                <Divider/> 

                <Box mt={4} mb={3}>
                    <h2 variant='h5'>Results</h2>
                    {seeresults}
                </Box>

                <Divider/>
                <Divider/>
                <Divider/>
                <Divider/>


               
        <Box  mt={3}>
        <Grid container spacing={3}  >
        
        <Grid item xs={12} sm={6} >
            <Paper>
                <Box className={classes.toolsAndTechnology}   display="flex" justifyContent="center">
                    <h2 >Tools And Technology</h2>
                </Box>
                <Box ml={4} >
                    <ul>
                         {toolsAndTechnology.map((p)=> <li><Typography variant='h6' >{p}</Typography></li>)}
                    </ul>
                </Box>
             </Paper>   
         </Grid>       
        <Grid item xs={12} sm={6}>
            <Paper>
                <Box className={classes.intrest} display="flex" justifyContent="center">
                    <h2>Intrest</h2>
                </Box>
                <Box ml={4}>
                    <ul>
                         {intrest.map((p)=> <li><Typography variant='h6' >{p}</Typography></li>)}
                    </ul>
                </Box>
            </Paper>
        </Grid>
        </Grid>
        </Box>


                <Divider />
                <Divider/>
                <Divider/>
                <Divider/>

               
        <Box>
                { seeother }
        </Box>

        </>

            
            
        )
}

export default Profile