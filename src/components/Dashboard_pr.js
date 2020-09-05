import React,{ useContext, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useHistory
} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Listoftopics from './Professor/Listoftoipcs'
import Createtopic from './Professor/Createtopic';
import Createteams from './Professor/Createteams'
import Removetopic from './Professor/Removetopic'
import Detailsoftopic from './Professor/Detailsoftopic'
import TimelineAdmin from "./Professor/TimelineAdmin"
import Loader from "./Professor/Loader"
import Grads from "./Professor/Grads"
import { Profc } from "./Professor/ProfessorContext"
import Home from "./Professor/Home"
import Timeline from "./Professor/Timeline"
import { Button } from '@material-ui/core';
import Chat from "./Professor/Chat.js"
import ChatBox from "./Professor/ChatBox"
import axios from "axios"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    
    ...theme.mixins.toolbar,
    justifyContent: 'center',
  },
  Link:{
    textDecoration:'none',
    color:'black'
}
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indexofseletedtopic, setindexofseletedtopic] = useState(0)
  const history = useHistory()
  const { editoptionsforTags,editofferedCourses,
    topics,
    professorName,
    professorCourses,
    inital,
    topicobj,
    profobjId,
    editTopic,
    editloader,
   
  } = useContext(Profc)
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const h1=(allcourses,professorCourses)=>{
    let dummy = []
    allcourses.forEach(ele => {
            let f = 1;
                      professorCourses.forEach(element=>{
                          
                          if(element===ele.courseId)
                          {
                              dummy.push({
                                      "courseId":ele.courseId,
                                      "courseName":ele.courseName,
                                      "isSelected":true
                              })
                              f = 0;
                          }
                      })
                      if(f)
                      {
                        dummy.push({
                          "courseId":ele.courseId,
                          "courseName":ele.courseName,
                          "isSelected":false
                  })
                      }

          });
          console.log(dummy)
          editofferedCourses(dummy)
  }

  const h2=(data)=>{
      let dummy = data.map((e)=>e.TagName)
      // console.log(dummy)
      editoptionsforTags(dummy)
  }

    async function fetchProf(emailId)
    {

     editloader(true)
      // option for Tags
     await axios.get('http://localhost:5000/Tags').then(res=>{
        // console.log(res.data)
        h2(res.data)
      }).catch(err=>console.log(err)) 
     
      // professor details
      let newprof = {}
      // Admin Timeline
     await   axios.get('http://localhost:5000/Admin').then(res=>{
                  newprof = {
                      ...newprof,
                      Admintimeline:res.data[0].timeline,
                      AdminobjId:res.data[0]._id
                  }
      })
      console.log(newprof)
     await axios.get(`http://localhost:5000/professor/`+emailId).then(res=>{
          console.log(res.data[0])
           newprof = {
             ...newprof,
             ...res.data[0],
             topicobjId:res.data[0].topics,
             profobjId:res.data[0]._id
           }
      })
  
      console.log(newprof);
         // option for Courses
      
      await axios.get('http://localhost:5000/allcourses').then(res=>{
           console.log(res.data)
           console.log(newprof.professorCourses)
           h1(res.data,newprof.professorCourses)
         }).catch(err=>console.log(err)) 
         let dummyallStudents =[]
        // GET ALL THE STUDENTS
         await axios.get(`http://localhost:5000/Student`).then((res)=>{
                res.data.forEach((student)=>{
                        dummyallStudents.push({studentId:student.studentId , studentobjId:student._id})
                })
                newprof = {
                    ...newprof,
                    allStudents:dummyallStudents
                }
        }).catch(err=>console.log(err))


         inital(newprof)
         console.log(newprof);

         editloader(false)    
    }

  useEffect(() => {
    if(!props.isAuth)
    {
            alert("Not Authorized")
            history.push("/")
            return 
    }
    let emailId = history.location.state.emailId
    fetchProf(emailId)
  }, [])
 
  async function fetchtopicdetails(topicobj){
    // console.log(topicobj)
    let newalltopics = []
    editloader(true)
    await topicobj.forEach(async (id) => {
    
        await axios.get(`http://localhost:5000/alltopics/get/`+id).then(async(res)=>{
             console.log(res.data)
             let data = res.data
             console.log(data)
             let Studentsdetails = []
            if(data) data.Students.forEach(async(studentobjId) => {
             await  axios.get(`http://localhost:5000/student/get/`+studentobjId).then(async(resstudent)=>{
                  
                  let student = {
                       studentobjId,
                       studentId:resstudent.data.studentId,
                       results:resstudent.data.results,
                       isapproved:  resstudent.data.finalApprove ? true:false,
                       finalApprove: resstudent.data.finalApprove ? resstudent.data.finalApprove :{}

                   }
                   resstudent.data.appliedTopics.forEach((value)=>{
                       if(value.profobjId===profobjId)
                       {
                               for(let i=0;i<value.topics.length;i++)
                               {
                                   if(value.topics[i].topicobjId===data._id)
                                   {
                                           student = {
                                             ...student,
                                             stage1:value.topics[i].stage1,
                                             stage2:value.topics[i].stage2,
                                             stage3:value.topics[i].stage3,
                                             stage4:value.topics[i].stage4,       
                                           }
                                   }
                               }
                       }
                   })
                   console.log(resstudent.data)
                   console.log(student)
                   Studentsdetails.push(student)
               })
               
             });

             let newtopic = {
                 ...res.data,
                 Studentsdetails
             }
             console.log(newtopic)
             newalltopics.push(newtopic)

     }).catch((err)=>console.log(err))
     editTopic(newalltopics)  
     console.log(newalltopics)
     });

     editloader(false)
  }
  useEffect(() => { 
      fetchtopicdetails(topicobj)
  }, [topicobj])
  const Tab1 = ["Home" , "Timeline (InternShip)" ]
  const Tab2 = ["Create Topic", "Remove Topic", "List Of Topics"]
  const Tab3 = ["Timeline", "Chat", "Grads", "Log Out"]
  const drawer = (
      <div className={classes.toolbar} >
          <Divider />
          <Divider />
          <Divider /> 
      <List className={classes.drawerHeader}>
            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
            <ListItemText primary={professorName} />
      </List>
      <Divider />
      
      <List>
        {['Home', 'Timelineforinternship' ].map((text, index) => (
           <NavLink  to={ text!=='logout' ? `/`+text :'/'} className={classes.Link} onClick={()=>text==='logout'? history.push('/') : null }>
          <ListItem button key={text} >
            <ListItemIcon><ArrowForwardIosIcon /></ListItemIcon>
            <ListItemText primary={Tab1[index]} />
          </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        {['Createtopic', 'Removetopic', 'Listoftopics'].map((text, index) => (
              <NavLink  to={ text!=='logout' ? `/`+text :'/'} className={classes.Link} onClick={()=>text==='logout'? history.push('/') : null }>
              <ListItem button key={text} >
                <ListItemIcon><ArrowForwardIosIcon /></ListItemIcon>
                <ListItemText primary={Tab2[index]} />
              </ListItem>
              </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        {['Timeline', 'Chat', 'Grads', "logout"].map((text, index) => (
               <NavLink  to={ text!=='logout' ? `/`+text :'/'} className={classes.Link} onClick={()=>text==='logout'? history.push('/') : null }>
               <ListItem button key={text} >
                 <ListItemIcon><ArrowForwardIosIcon /></ListItemIcon>
                 <ListItemText primary={Tab3[index]} />
               </ListItem>
               </NavLink>
        ))}
      </List>
   
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <Router>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>

        <Toolbar>

          <IconButton onClick={handleDrawerToggle} className={classes.menuButton} color="inherit" aria-label="open drawer" edge="start" >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Research Internship
          </Typography>
     
        </Toolbar>

      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">

          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper}}
            ModalProps={{ keepMounted: true, }}>

            {drawer}

          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open>

            {drawer}

          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Loader/>
        <Switch>
          <Route path="/Home"><Home /></Route>
          <Route path="/Createtopic"><Createtopic/></Route>
          <Route path="/Createteams"><Createteams /></Route>
          <Route path="/Listoftopics"><Listoftopics setindexofseletedtopic={setindexofseletedtopic} /></Route>
          <Route path="/Removetopic"><Removetopic/></Route>
          <Route path="/Detailsoftopic/:number"><Detailsoftopic topic={topics[indexofseletedtopic]} indexofseletedtopic={indexofseletedtopic} /></Route>
          <Route path="/Timeline" topic={topics[indexofseletedtopic]}><Timeline/></Route>
          <Route path="/Grads"><Grads/></Route>  
          <Route path="/Timelineforinternship" ><TimelineAdmin /> </Route>
          <Route path="/Chat"><Chat/></Route>
          <Route path="/ChatBox/:id" component={ChatBox} ></Route>
        </Switch> 
      </main>
      </Router>
    </div>
  );
}

export default ResponsiveDrawer;
