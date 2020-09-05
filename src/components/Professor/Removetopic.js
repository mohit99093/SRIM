import React,{  useContext, useReducer } from 'react'
import { Autocomplete } from "@material-ui/lab"
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Profc } from "./ProfessorContext"
import Axios from 'axios';



function RemovetopicReducer(state, action) {
    switch (action.type) {
      case 'submit':{
          return {
            ...state,
            selectedtopics:[]
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
    selectedtopics:[]
}
const Removetopic = ()=>{
            const { topics,removeTopic, editloader } = useContext(Profc)
            let optionsforTopics = topics.map((t)=> t.topicName)
            const [state, dispatch] = useReducer(RemovetopicReducer, initialState)
            const { selectedtopics } = state
            
            const handleSubmit = () => {
                console.log("submit");
                if (selectedtopics.length === 0) {

                    dispatch({type:"seterror"})
                }
                else
                {
                        // change in prof database
                        // change in student databse
                        selectedtopics.forEach(topicName => {
                          topics.forEach(topic => {
                                if(topic.topicName===topicName)
                                { 
                                  editloader(true)
                                  Axios.delete(`http://localhost:5000/alltopics/delete/`+topic._id).then((res)=>console.log("topics updeted"))
                                  .catch(err=>console.log(err))
                                  removeTopic(topicName)  
                                  editloader(false)
                                }
                          });
                          
                        });
                        dispatch({type:"unseterror"})
                        dispatch({type:"submit"})
                }
            }

        return (
                <>
                    {/* Start toic Tages */}
                            <div>
                                <h2>Select Topics name for Remove</h2>
                            </div>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={optionsforTopics}
                                value={selectedtopics}
                                getOptionLabel={option => option}
                                filterSelectedOptions
                                onChange={(event, getOptionSelected) =>dispatch({type:"field",field:"selectedtopics",value:getOptionSelected})}
                                renderInput={params => (
                                    <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Slelect multiple Topics"
                                    placeholder="Add-Tages"
                                    color="primary"
                                    error={selectedtopics.length===0}
                                    />
                                )}
                            />
      {/* end topic tegs  */}



                        <Box mt={2} display="flex" >
                                <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                >
                                Delete Topics
                                </Button>
                                <Box ml={2} color={Error.color} fontSize={20} m="auto">
                                    {Error.message}
                                </Box>
                        </Box>
                </>

        )
}

export default Removetopic