import React, { useContext, useReducer, useState, useEffect } from "react"
import Box from "@material-ui/core/Box";

import TextField from "@material-ui/core/TextField";
import { Admc } from "./AdminContext"
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
import { formatDate } from "../usefulfunction"
import Axios from "axios"

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
  
  
    stageName:"",
    fileinput:false,
    selectedDate:"",
    discription:"",
    currentstages:[],
    selectedStageindex:-1,
    Error : { message:"" , color:"black" }
}
const Createtimeline = ()=>{

        const [state, dispatch] = useReducer(CreatetimelineReducer, initialState)
        const { 
                
                stageName,
                fileinput,
                selectedDate,
                discription,
                currentstages,
                selectedStageindex,
                Error } = state 


        const { timeline,editTimeline, _id }  = useContext(Admc)   


        useEffect(() => {
          
            dispatch({type:"field",field:"currentstages",value:[...timeline]})
        }, [timeline])


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
      
        const handleSubmit = ()=>{

                  if( stageName==="" || discription==="" || selectedDate==="" )
                  {
                        dispatch({type:"seterror"})
                  }
                  else
                  {

                    let newstage = {
                            stageName,
                            fileinput,
                            selectedDate,
                            discription
                    }
                    let newstages = [...currentstages, newstage ]
                    console.log(newstage)
                    dispatch({type:"field",field:"currentstages",value:newstages})
                    dispatch({type:"intialvalues"})
                    dispatch({type:"unseterror"})
                  }

        }

        const handledelete = (index)=>{
                let newstages = [...currentstages]
                newstages.splice(index,1)
                dispatch({type:"field",field:"currentstages",value:newstages})
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
          let newadmin = {
            timeline:currentstages
         }
         Axios.post(`http://localhost:5000/Admin/update/`+_id, newadmin).then((res)=>console.log(res)).catch((err)=>console.log(err))
             console.log(newadmin)  
            editTimeline(currentstages)
          editTimeline(currentstages)
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
              <Box ml="auto" onClick={()=>handledelete(index)}>
                <IconButton aria-label="delete" p={0} m={0}  ml="auto">
                                <DeleteIcon  fontSize="large" />
                            </IconButton>
                      
              </Box>
            </AccordionDetails>
                    
          </Accordion>
        )) : null

        return (
            <>

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
                    onClick={()=>handleSubmit()}
                    
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


