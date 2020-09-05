import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Stuc } from "./StudentContext"

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

function getSteps() {
  return [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
    "Step 6: This is the bit I really care about!",
    "Step 6: This is the bit I really care about!",
    "Step 6: This is the bit I really care about!"
  ];
}
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

function getStepContent(step) {
  switch (step) {
    case 0:
      return stages[0];
    case 1:
      return stages[1];
    case 2:
      return stages[2];
    case 3:
      return stages[3];
    case 4:
      return stages[4];
    case 5:
      return stages[5];
    case 6:
      return stages[6];

    default:
      return "Unknown step";
  }
}

export default function HorizontalNonLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [ steps, setsteps ] = React.useState(0) 

  const { Admintimeline  } = useContext(Stuc)
  useEffect(() => {
            if(Admintimeline)
            setsteps(Admintimeline)

            
  }, [Admintimeline])
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
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className={classes.root}>

      {  Admintimeline?
            <>
      <Stepper nonLinear activeStep={activeStep}>
        {Admintimeline.map((label, index) => (
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
            <Button onClick={handleReset}>Reset</Button>
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
                  >
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
            <Box className={classes.instructions}>
              <Box m={2}>
                <Typography variant="h6">
                  StageName: {Admintimeline[activeStep].stageName}
                </Typography>
              </Box>
              <Box m={2}>
                <Typography variant="h6">
                  Date: {Admintimeline[activeStep].selectedDate}
                </Typography>
              </Box>
              <Box m={2}>
                <Typography variant="h6">
                  discription: {Admintimeline[activeStep].discription}
                </Typography>
              </Box>
              {Admintimeline[activeStep].fileinput ? (
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
