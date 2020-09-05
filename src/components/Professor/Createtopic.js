import React, { useContext, useReducer, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Autocomplete } from "@material-ui/lab"
import { Profc } from "./ProfessorContext"
import axios from "axios";
const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(-1),
    color: "red"
  }
}));

function CreatetopicReducer(state, action) {
      switch (action.type) {
        case 'submit':{
            return {
              ...state,
              topicName:'',
              Tags:[],
              Prerequisite:[],
              Discription:""
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
      topicName: '',
      Tags: [],
      Prerequisite: [],
      Discription: [],
      Error : { message:"click on button for create topic" , color:"black" },
  
}

const Createtopic = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(CreatetopicReducer, initialState)
  const {
    topicName,
    Tags,
    Prerequisite,
    Discription,
    Error,
  }  = state
  
  const { 
    addTopic,
    optionsforTags,
    profobjId,
    professorCourses,
    emailId,
    professorName,
    topicobj,
    addTopicobj,
    password,
   editloader }= useContext(Profc);

  const add = chip => {
    let newvalues = [...Prerequisite, chip];
    dispatch({type:'field' ,field:'Prerequisite', value:newvalues})
    console.log(Prerequisite);
  };
  const remove = chip => {
    let newvalues = Prerequisite.filter(function(item) {
      return item !== chip;
    });
    dispatch({type:'field' ,field:'Prerequisite', value:newvalues})
    console.log(Prerequisite);
  };

  
  const updateProf= async()=>{
      
    let newvalue = {
      professorCourses,
      emailId,
      professorName,
      topics:topicobj,
      password,

  }
    console.log(newvalue);
    editloader(true)
   await  axios.post(`http://localhost:5000/professor/update/`+profobjId, newvalue).then(()=>console.log("yes Professor updated in data base")).
    catch(err=>console.log(err));
    editloader(false)
  }
  useEffect(() => {
    updateProf()
  }, [topicobj])
  
  const handleSubmit = () => {
    console.log("submit");
    if (
      topicName === "" ||
      Tags.length === 0 ||
      Prerequisite.length === 0 ||
      Discription === ""
    ) {
      dispatch({type:"seterror"})
    }
    else
    {
        let  newTopic = { topicName,
          Tags,
          Prerequisite,
          Discription,
          Students:[],
          finalStudents:[],
          Teams:[],
          profobjId
        }
        console.log(newTopic);
        // addTopic(newTopic);
        dispatch({type:'submit'})
        dispatch({type:"unseterror"})

        // change in usefull database
        editloader(true)
        axios.post('http://localhost:5000/alltopics/add',newTopic)
        .then((res)=>{
          console.log(res.data);
          addTopicobj(res.data._id)
        }).catch((err)=>console.log(err))
        editloader(false)

    }
  };
 

  return (
    <>
   
      {/* Topic Name */}
      <div className={classes.chip}>
        <h2>Topic Name</h2>
      </div>
      <FormControl fullWidth>
        <TextField
          variant="outlined"
          id="topicName"
          name="topicName"
          onChange={e => dispatch({type:'field' ,field:'topicName', value:e.target.value})}
          error={topicName === ""}
          value={topicName}
        />
      </FormControl>
      {/* end Topic Name  */}


      {/* Start toic Tages */}
      <div className={classes.tegs}>
        <h2>Add tages</h2>
      </div>
      <Autocomplete
        multiple
        id="tags-standard"
        options={optionsforTags}
        getOptionLabel={option => option}
        filterSelectedOptions
        value={Tags}
        onChange={(event, getOptionSelected) =>dispatch({type:'field' ,field:'Tags', value:getOptionSelected})}
        renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Slelect multiple tags"
              placeholder="Add-Tages"
              color="primary"
              error={Tags.length===0}
            />
        )}
      />
      {/* end topic tegs  */}


      {/* start of prerequisite */}
      <div className={classes.tegs}>
        <h2>Add prerequisite for students</h2>
      </div>
      <ChipInput
        fullWidth
        className={classes.chip}
        value={Prerequisite}
        onAdd={chip => add(chip)}
        onDelete={chip => remove(chip)}
        variant={"outlined"}
        error={Prerequisite.length === 0}
      />
      {/* end of prerequisite  */}


      {/* start of discription of topic */}
      <div className={classes.tegs}>
        <h2>Discription of Topic</h2>
      </div>
      <TextField
        fullWidth
        id="outlined-multiline-static"
        value={Discription}
        onChange={e =>dispatch({type:'field' ,field:'Discription', value:e.target.value})}
        multiline
        rows={10}
        variant="outlined"
        error={Discription === ""}
      />
      {/* end of discription */}


      {/* start of button */}
      <Box mt={2} display="flex" >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Create Topic
        </Button>
        <Box ml={2} color={Error.color} fontSize={20} m="auto">
            {Error.message}
        </Box>
      </Box>
    </>
  );
};

export default Createtopic;
