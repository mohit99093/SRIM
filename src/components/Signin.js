import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { check_p_a_s } from "./usefulfunction"
import {

  Switch,
  Route,
  Link,
  NavLink,
  useHistory,
  Redirect 
} from "react-router-dom";
import Axios from 'axios';


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({setisAuth, isAuth}) {
  const classes = useStyles();
  const [emailId, setemailId] = useState("Admin@daiict.ac.in")
  const [password, setpassword] = useState("admin_sri_123")
  const history = useHistory()


  const handlesignin=async()=>{
 
          if(check_p_a_s(emailId)==='Invalid')
          {
              alert("Not Valid Emamil Id")
          }                 
          if(check_p_a_s(emailId)==="Admin")
          {
              let value = {
                            emailId,
                            password
                        }
              let res = await Axios.post("http://localhost:5000/admin/signin", value)
              if(res.data.found)    
              {    
                setisAuth(true)
                return history.push({ pathname:"/Admin", state:{emailId:emailId}});
              }
              else
              alert(res.data.message)
        }
        else if(check_p_a_s(emailId)==="Student")
        {
                  let value = {
                        emailId,
                        password
                  }
                let res = await Axios.post("http://localhost:5000/student/signin", value)
                if(res.data.found)    
                {  
                  setisAuth(true)
                return history.push({ pathname:"/Student", state:{emailId:emailId}});
                }
                else
                alert(res.data.message)
        }
        else if(check_p_a_s(emailId)==="Prof")
        {
                let value = {
                      emailId,
                      password
                }
              let res = await Axios.post("http://localhost:5000/professor/signin", value)
              if(res.data.found)    
              {  setisAuth(true)
              return history.push({ pathname:"/prof", state:{emailId:emailId}});
              }
              else
              alert(res.data.message)
        }
        else
        {
          return history.push({ pathname:"/main", state:{emailId:emailId}});
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={()=>handlesignin()}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="DA-IICT Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailId}
            onChange={(e)=>setemailId(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {()=>handlesignin()}
            onSubmit= {()=>handlesignin()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {/* Forgot password? */}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2" >
                  Don't have an account? Sign Up  
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  
  );
}