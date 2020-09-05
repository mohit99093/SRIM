import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';


import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { check_p_a_s } from "./usefulfunction"
import Axios from "axios"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
  NavLink
} from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({setisAuth}) {
  const classes = useStyles();
  const [emailId, setemailId] = React.useState("")
  const [password, setpassword] = React.useState("")
  const [confirmPassword, setconfirmPassword] = React.useState("")
  const history = useHistory()
  const handlesignup=async()=>{
          
          if(confirmPassword!==password)
          {
              alert("password and confirmpassword should be same")
              return 
          }
          
          let value = {
            emailId:emailId.trim(),
            password:password.trim()
          }
          if(check_p_a_s(emailId)==='Invalid')
          {
              alert("Not Valid Email Id Shoulb be ended with  @daiict")
          }                 
          else 
        if(check_p_a_s(emailId)==="Admin"){
         
        let res = await Axios.post("http://localhost:5000/admin/signup", value)
        if(res.data.found)    
        {
          setisAuth(true)
          return history.push({ pathname:"/Admin", state:{emailId:emailId, password:password, confirmpassword:confirmPassword}});
        }
        else
        alert(res.data.message)
    }
    else if(check_p_a_s(emailId)==="Student"){
      
    let res = await Axios.post("http://localhost:5000/student/signup", value)
    if(res.data.found)    
    {
      setisAuth(true)
      return history.push({ pathname:"/Student", state:{emailId:emailId, password:password, confirmpassword:confirmPassword}});
    }
    else
    alert(res.data.message)
    }
    else if(check_p_a_s(emailId)==="Prof"){
     
    let res = await Axios.post("http://localhost:5000/professor/signup", value)
    if(res.data.found)    
    {   setisAuth(true)
    return history.push({ pathname:"/prof", state:{emailId:emailId, password:password, confirmpassword:confirmPassword}});
    }
    else
    alert(res.data.message)
    }
}
 
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="DAIICT Email Address"
                name="emailId"
                autoComplete="emailId"
                onChange={(e)=>setemailId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>setpassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm-password"
                label="confirm-Password"
                type="password"
                id="confirm-password"
                autoComplete="confirm-current-password"
                onChange={(e)=>setconfirmPassword(e.target.value)}
                error={confirmPassword!==password}
              />
            </Grid>
          </Grid>
          <Button
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>handlesignup()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2" >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}