import React, { useContext, useState, useEffect }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  NavLink,
  Redirect
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
import { Stuc } from "./Student/StudentContext"
import axios from "axios"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// components
import Profile from "./Student/Profile"
import Editprofile from "./Student/Editprofile"
import Searchtopicname from "./Student/Searchtopicname"
import Details from "./Student/Details"
import SearchbyTags from "./Student/SearchTags"
import Searchprofname from "./Student/Searchprofname"
import Topicappliedon from "./Student/Topicappliedon"
import Timelineprof from "./Student/Timelineprof"
import TimelineAdmin from "./Student/TimelineAdmin"
import Loader from "./Student/Loader"
import Chat from "./Student/Chat"
import ChatBox from "./Student/ChatBox"
const drawerWidth = 245;

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
  const { window } = props
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ indexofseletedtopic, setindexofseletedtopic] =  useState(0)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const history = useHistory()
  const {alltopics, intial, editloader, studentId} = useContext(Stuc)

 
  
  async function fetchstudent(emailId){

      let student = {
          profile:{
            toolsAndTechnology:[],
            intrest:[],
            other:""
          },
          appliedTopics:[],
          finalgrade:-1,
          finalApprove:{},
          TeamNumber:-1,
          TeamobjId:-1,
          Teamtimeline:[],
          AdminobjId:123

       }
      editloader(true)
      await axios.get("http://localhost:5000/student/getbyemailId/"+emailId).then((res)=>{
          console.log(res.data);
          let data = res.data[0]  
        student = { 
          ...student ,
          studentobjId:data._id,
          emailId:emailId,
          ...data,
                 
          }
      })
      .catch(res=>console.log(res))
      console.log(student)
    // Admin Timeline
    await  axios.get('http://localhost:5000/Admin').then(res=>{
                student = {
                    ...student,
                    Admintimeline:res.data[0].timeline,
                    AdminobjId:res.data[0]._id
                }
    })

    await  axios.get('http://localhost:5000/Tags').then(res=>{
          
          let dummy = res.data.map((e)=>e.TagName)
          student = {
            ...student,
            optionsforTags:dummy
          }
      }).catch(err=>console.log(err)) 
      
     await axios.get('http://localhost:5000/professor').then(res=>{
          // console.log(res.data)
          let professor = []
          let allprofessor = []
          res.data.forEach(prof => {
              professor = [...professor, prof.professorName]
              allprofessor = [...allprofessor, { professorName:prof.professorName,profEmailId:prof.emailId,profobjId:prof._id }]
              if(student.finalApprove!=={} && prof._id===student.finalApprove.profobjId)
              {
                        student.finalApprove = {
                            ...student.finalApprove,
                            profName:prof.professorName,
                        }
                        console.log(student.finalApprove)
              }
          });
          // console.log(professor)
          student = {
            ...student,
            optionsforProfName:professor,
            allprofessor:allprofessor
          }
     })
     console.log(student)
     
     await axios.get('http://localhost:5000/alltopics').then(res=>{
        let dummyalltopics = []
        res.data.forEach((topic,ind)=>{
            let newtopic = {}
            console.log(topic);
            newtopic = {
                ...newtopic,
                topicName:topic.topicName,
                Tags:topic.Tags,
                Discription:topic.Discription,
                Prerequisite:topic.Prerequisite,
                topicobjId:topic._id,
                indexoftopic:ind,
                profobjId:topic.profobjId
            }
            console.log(student.allprofessor)
            student.allprofessor.forEach(prof=>{
                  if(prof.profobjId===topic.profobjId)
                  {
                          newtopic = {
                              ...newtopic,
                              professorName:prof.professorName,
                              profEmailId:prof.profEmailId,
                              
                          }
                  }
            })
            if(student.finalApprove!=={} && topic._id===student.finalApprove.topicobjId)
            {
                      student.finalApprove = {
                          ...student.finalApprove,
                          topicName:topic.topicName,
                          finalgrade:0
                      }
                      console.log(student.finalApprove)
            }
            if(student.TeamNumber!==-1 && student.finalApprove.topicobjId===topic._id)
            {
                  student = {
                      ...student,
                      Teamtimeline:  topic.Teams[student.TeamNumber].timeline
                  }
                     
            }
            dummyalltopics.push(newtopic)
            console.log(newtopic);
        })
        student = {
           ...student,
           alltopics:dummyalltopics
        }
     })

   
     if(student.TeamNumber!==-1)
     {             
                    await axios.get(`http://localhost:5000/alltopics/get/`+student.finalApprove.topicobjId).then((res)=>{
                        let dummyfinalgrade = res.data.Teams[student.TeamNumber].timeline[ res.data.Teams[student.TeamNumber].timeline.length-1 ].grads.filter((obj)=>obj.studentId===student.studentId)[0]
                        console.log(dummyfinalgrade)
                        student = {
                            ...student,
                            Teamtimeline:res.data.Teams[student.TeamNumber].timeline,
                            finalApprove:{
                                ...student.finalApprove,
                                finalgrade:dummyfinalgrade.g
                            }
                        }
                    }).catch((err)=>console.log(err))
                    console.log(student)
       }

        intial(student)
        console.log(student)
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
       fetchstudent(emailId)
  }, [])



  const Tab1 = [ "Profile" , "Timeline (Internship)" , "Edit Profile" , "List of Topic" ]
  const Tab2 = [ "Search By Tags" , "Search By Prof Name" , "Applied Topics" ]
  const Tab3 = [ "Timeline For Project" , "Chat" , "Log Out"]
  const drawer = (
      <div className={classes.toolbar} >
          <Divider />
          <Divider />
          <Divider /> 
      <List className={classes.drawerHeader}>
            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
            <ListItemText primary={studentId} />
      </List>
      <Divider />
      <List>
        {['Profile', 'Timelineforinternship', 'EditProfile', 'Listoftopics'].map((text, index) => (
          <NavLink  to={ text!=='logout' ? `/`+text :'/'} className={classes.Link} onClick={()=>text==='logout'? history.push('/') : null }>         
           <ListItem button key={text}>
            <ListItemIcon><ArrowForwardIosIcon /> </ListItemIcon>
            <ListItemText primary={Tab1[index]} />
          </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        {['Searchbytags', 'Searchbyprofname', 'Topicappliedon'].map((text, index) => (
          <NavLink  to={ text!=='logout' ? `/`+text :'/'} className={classes.Link} onClick={()=>text==='logout'? history.push('/') : null }>
          <ListItem button key={text}>
            <ListItemIcon><ArrowForwardIosIcon/></ListItemIcon>
            <ListItemText primary={Tab2[index]} />
          </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        {['TimelineforProject', 'Chat', "logout"].map((text, index) => (
          <NavLink  to={ text!=='logout' ? `/`+text :'/'} className={classes.Link} onClick={()=>text==='logout'? history.push('/') : null }>
          <ListItem button key={text}>
            <ListItemIcon><ArrowForwardIosIcon/></ListItemIcon>
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

          <IconButton onClick={handleDrawerToggle} className={classes.menuButton} color="inherit" aria-label="open drawer" edge="start">
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
            <Route path="/Profile"> <Profile /> </Route>
            <Route path="/Editprofile"> <Editprofile /> </Route>
            <Route path="/Listoftopics"><Searchtopicname setindexofseletedtopic={setindexofseletedtopic}/></Route>
            <Route path="/Searchbytags"><SearchbyTags setindexofseletedtopic={setindexofseletedtopic}/></Route>
            <Route path="/Searchbyprofname"><Searchprofname setindexofseletedtopic={setindexofseletedtopic}/></Route>
             <Route path="/Topicappliedon"><Topicappliedon  topic={alltopics[indexofseletedtopic]} indexofseletedtopic={indexofseletedtopic}/></Route> 
            <Route path="/Detailsoftopic/:number"><Details topic={alltopics[indexofseletedtopic]} indexofseletedtopic={indexofseletedtopic} /></Route>
            <Route path="/TimelineforProject"><Timelineprof /> </Route>
            <Route path="/Timelineforinternship" ><TimelineAdmin /> </Route>
            <Route path="/Chat" ><Chat/></Route>
            <Route path="/ChatBox/:id" component={ChatBox} ></Route>
        </Switch>
      </main>
      </Router>
    </div>
  );
}



export default ResponsiveDrawer;
