import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Stuc } from "./StudentContext"
import Axios from "axios"
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(2)
  },
  label: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
      background: "red"
    }
  }
}));

const stages = [
  {
    stageName: "dummy stage - 1",
    fileinput: 1,
    selectedDate: "2017-07-08",
    discription: "this is test 1 stage 2 "
  },
  {
    stageName: "dummy stage - 2",
    fileinput: false,
    selectedDate: "2017-07-08",
    discription: "this is test 1 stage 2 "
  },
  {
    stageName: "dummy stage - 3",
    fileinput: false,
    selectedDate: "2017-07-08",
    discription: "this is test 1 stage 2 "
  },
  {
    stageName: "dummy stage - 4",
    fileinput: false,
    selectedDate: "2017-07-08",
    discription: "this is test 1 stage 2 "
  },
  {
    stageName: "dummy stage - 5",
    fileinput: false,
    selectedDate: "2017-07-08",
    discription: "this is test 1 stage 2 "
  },
  {
    stageName: "dummy stage - 6",
    fileinput: false,
    selectedDate: "2017-07-08",
    discription: "this is test 1 stage 2 "
  },
  {
    stageName: "dummy stage - 7",
    fileinput: false,
    selectedDate: "2017-07-08",
    discription: "this is test 1 stage 2 "
  }
];


export default function HorizontalNonLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [ steps, setsteps ] = React.useState(0) 

  const { Teamtimeline, editproftimeline, finalApprove, TeamNumber, editloader  } = useContext(Stuc)
  useEffect(() => {
            if(Teamtimeline)
            {
              setsteps(Teamtimeline)
              for(let i=0; i<Teamtimeline.length;i++)
              {
                  if(Teamtimeline[i].iscompleted)
                  { 
                    const newCompleted = completed;
                    newCompleted[i] = true;
                    setCompleted(newCompleted);
                  }
                 
              }
            }
            
            return () => {
              editloader(true)
              Axios.get(`http://localhost:5000/alltopics/get/`+finalApprove.topicobjId).then((res)=>{
                      
                      let topic = res.data
                      let newTeams = topic.Teams
                      newTeams[TeamNumber] = {
                          ...newTeams[TeamNumber],
                          timeline:Teamtimeline
                      }
                      let newtopic = {
                        topicName:topic.topicName,
                        Tags:topic.Tags,
                        Prerequisite:topic.Prerequisite,
                        Discription:topic.Discription,
                        Students:topic.Students,
                        finalStudents:topic.finalStudents,
                        Teams:newTeams,
                        profobjId:topic.profobjId
                      }

            
              
                Axios.post(`http://localhost:5000/alltopics/update/`+topic._id, newtopic)
                .then(res=>console.log("topics apdetd"))
                .catch(err=>console.log(err))
              // editTopic(dummytopics)
                    })
              editloader(false)      

            }

  }, [Teamtimeline])

 

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    let dummytimeline = Teamtimeline
    dummytimeline[activeStep] = {
        ...dummytimeline[activeStep],
        iscompleted:true
    }
    console.log(dummytimeline)
    editproftimeline(dummytimeline)
    handleNext();

    
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  console.log(Teamtimeline)
  return (
    <div className={classes.root}>

      { Teamtimeline.length!==0?
            <>
             {console.log(Teamtimeline)}
      <Stepper nonLinear activeStep={activeStep}>
        {Teamtimeline.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
            >
              
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              Your internShip is Completed
            </Typography>
           
          </div>
        ) : (
          <div>
            <Box mt={3}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={activeStep===totalSteps()-1}
              >
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                     disabled={activeStep===totalSteps()-1}
                  >
                      Complete Step
                  </Button>
                ))}
            </Box>
            <Box className={classes.instructions}>
              <Box m={2}>
                <Typography variant="h6">
                  StageName: {Teamtimeline[activeStep].stageName}
                </Typography>
              </Box>
              <Box m={2}>
                <Typography variant="h6">
                  Date: {Teamtimeline[activeStep].selectedDate}
                </Typography>
              </Box>
              <Box m={2}>
                <Typography variant="h6">
                  discription: {Teamtimeline[activeStep].discription}
                </Typography>
              </Box>
              {Teamtimeline[activeStep].fileinput ? (
                <Box m={2}>
                  <input type="file" />
                </Box>
              ) : null}
            </Box>
          </div>
        )}
      </div>
      </> : null}
    </div> 
  );
}
