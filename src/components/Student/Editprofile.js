import React, { useState,useContext, useReducer, useEffect } from "react"
import { Stuc } from "./StudentContext" 
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";

import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";
import Button from "@material-ui/core/Button";
import Axios from "axios";


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

            
        const {  
            
            profile,
            studentName,
            studentId,
            studentobjId,
            emailId,
            finalgrade,
            results,
            appliedTopics,
            
            editloader,
            editProfile,
           } = useContext(Stuc)
            const classes = useStyles();
          

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

                let newstudent = {
                    profile:newprofile,
                    studentName,
                    studentId,
                    emailId,
                    finalgrade,
                    results,
                    appliedTopics,
                   
                }
                editloader(true)
                Axios.post(`http://localhost:5000/student/update/`+studentobjId, newstudent).then(res=>console.log("student update")).
                catch(err=>console.log(err))
                editloader(false)
              
              }
             console.log(changed) 
             
           
            return (
            <>

                <div className={classes.tegs}>
                    <h2>Tools And Technology</h2>
                </div>
                <ChipInput
                    fullWidth
                    className={classes.chip}
                    value={toolsAndTechnology}
                    onAdd={chip => addtoolsAndTechnology(chip)}
                    onDelete={chip => removetoolsAndTechnology(chip)}
                    variant={"outlined"}
                    error={toolsAndTechnology.length === 0}
                />

                <div className={classes.tegs}>
                    <h2>Intrest</h2>
                </div>
                <ChipInput
                    fullWidth
                    className={classes.chip}
                    value={intrest}
                    onAdd={chip => addintrest(chip)}
                    onDelete={chip => removeintrest(chip)}
                    variant={"outlined"}
                    error={intrest.length === 0}
                />


             <div className={classes.tegs}>
                 <h2>Other Details</h2>
            </div>
            <TextField
                fullWidth
                id="outlined-multiline-static"
                value={other}
                onChange={e =>dispatch({type:'field' ,field:'other', value:e.target.value})}
                multiline
                rows={10}
                variant="outlined"
                error={other === ""}
            />


        <Box mt={2} display="flex" >
            <Button
                type="submit"
                variant="contained"
                color={!changed? "primary": "secondary"}
                onClick={handlesave}
                disabled={!changed}
                >
                {changed===true ? "Save Profile" :"make changes" }
            </Button>
            <Box ml={2} color={Error.color} fontSize={20} m="auto">
                {Error.message}
            </Box>
        </Box>
            
            </>

            
            
        )
}

export default Profile