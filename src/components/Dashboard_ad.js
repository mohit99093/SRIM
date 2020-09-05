import React, { useContext, useState, useEffect }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
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
import { Admc } from "./Admin/AdminContext"
import Detailsoftopic from "./Admin/Detailsoftopic"
import axios from "axios"
import { useHistory } from "react-router-dom"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

// components
import Listofprofessor from "./Admin/Listofprofessor"
import Listofstudent from "./Admin/Listofstudent"
import Timeline from "./Admin/Timline"
import Loader from "./Admin/Loader"
import Chat from "./Admin/Chat"
import ChatBox from "./Admin/ChatBox"
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
  const [indexofseletedtopic, setindexofseletedtopic] = useState(0)
 
  const history = useHistory()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
 
  const { topics, intial, editloader, allStudents, allprofessor, editallStudents } = useContext(Admc)
  
  
  
  async function fectchAdmindetails(emailId){


      let Admin = {}
      editloader(true)
      //get admin Details 
      await axios.get(`http://localhost:5000/Admin`).then((res)=>{
            let data  = res.data[0]
            Admin = { 
                  ...data
            }
            console.log(Admin)
      })
      // option for Tag
      await  axios.get('http://localhost:5000/Tags').then(res=>{
          
        let dummy = res.data.map((e)=>e.TagName)
        Admin = {
          ...Admin,
          optionsforTags:dummy
        }
    }).catch(err=>console.log(err)) 

    // option for Professors
    await axios.get('http://localhost:5000/professor').then(res=>{
      // console.log(res.data)
      let professor = []
      let allprofessor = []
      res.data.forEach(prof => {
          allprofessor = [...allprofessor, { professorName:prof.professorName,profEmailId:prof.emailId,profobjId:prof._id }]
          professor = [...professor, prof.professorName]
        
      });
      // console.log(professor)
      Admin = {
        ...Admin,
        optionsforProfName:professor,
        allprofessor:allprofessor
      }
    }).catch((err)=>alert(err))
      
    // alltopics
    await axios.get('http://localhost:5000/alltopics').then(res=>{
      let dummytopics = []
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
          Admin.allprofessor.forEach(prof=>{
                if(prof.profobjId===topic.profobjId)
                {
                        newtopic = {
                            ...newtopic,
                            professorName:prof.professorName,
                            profEmailId:prof.profEmailId,
                            
                        }
                }
          })
          let finalStudents = []
          topic.Teams.forEach((team)=>{
              if(team.timeline.length!==0)
              {
                  team.timeline[team.timeline.length-1].grads.forEach((student)=>{
                  finalStudents.push({ studentId:student.studentId, finalGrade:student.g })
                  })
            }
          })
          newtopic = {
              ...newtopic,
              finalStudents:finalStudents
          }
        
          dummytopics.push(newtopic)
          console.log(newtopic);
      })
      Admin = {
         ...Admin,
         topics:dummytopics
      }
        
     
  
      }).catch(err=>alert(err))

     
        console.log(Admin)


    let dummyallStudentforchat = []
      await axios.get('http://localhost:5000/student').then((res)=>{
              console.log(res.data)
              res.data.forEach((data)=>{
                dummyallStudentforchat.push({studentId:data.studentId, studentobjId:data._id})
                let f = 1
               allStudents.forEach((year)=>{
                  
                     if(year.year===data.studentId.substring(0,4))
                     {    console.log(year.year, data.studentId.substring(0,4))
                          if(data.finalgrade!==-1)
                          {    console.log(data)
                            Admin.allprofessor.forEach((prof)=>{
                                  console.log(prof);
                                  if(prof.profobjId === data.finalApprove.profobjId)
                                  {
                                    year.students.push({ studentId:data.studentId , profName:prof.professorName , finalGrade:data.finalgrade }) 

                                    console.log({ studentId:data.studentId , profName:prof.professorName , finalGrade:data.finalgrade }, year.year)
                                  }
                            })

                          }
                            f = 0;
                               
                     }

                   
              })
              if(f)
              {
                      let dummyyear = data.studentId.substring(0,4)
                      let dummyallstudents = []
                    
                      if(data.finalgrade!==-1)
                      {    
                        Admin.allprofessor.forEach((prof)=>{
                              console.log(prof , data);
                              if(prof.profobjId === data.finalApprove.profobjId)
                              {
                                dummyallstudents.push({ studentId:data.studentId , profName:prof.professorName , finalGrade:data.finalgrade })
                                console.log({ studentId:data.studentId , profName:prof.professorName , finalGrade:data.finalgrade }) 
                              }
                        })

                      }
                      allStudents.push({ year:dummyyear, students:dummyallstudents }) 
              }

              console.log(allStudents)
              
            })
      })
      Admin = {
        ...Admin,
        allStudents:allStudents,
        allStudentforchat:dummyallStudentforchat
    }
      intial(Admin)
      editloader(false) 
}
      useEffect(() => {
        if(!props.isAuth)
        {
                alert("Not Authorized")
                history.push("/")
                return 
        }
        
          fectchAdmindetails()
      }, [])
  const Tabs = ["Search Professor", "List of Students", "Timeline" , "Chat", "Log Out"]
  const drawer = (
      <div className={classes.toolbar} >
          <Divider />
          <Divider />
          <Divider /> 
      <List className={classes.drawerHeader}>
            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
            <ListItemText primary={"Admin"} />
      </List>
      <Divider />
      <List>
        {['Listofprofessor', 'Listofstudent', 'timeline', 'Chat', 'logout'].map((text, index) => (
          <>
           <NavLink to={ text!=='logout' ? `/`+text :'/'} className={classes.Link} onClick={()=>text==='logout'? history.push('/') : null }>
          <ListItem button key={text} >
            <ListItemIcon><ArrowForwardIosIcon/></ListItemIcon>
            <ListItemText primary={Tabs[index]} />
           
          </ListItem>
          </NavLink>
          
          </>
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
            <Route path="/Listofprofessor"> <Listofprofessor setindexofseletedtopic={setindexofseletedtopic}/> </Route>
             <Route path="/Detailsoftopic/:number"><Detailsoftopic topic={topics[indexofseletedtopic]} indexofseletedtopic={indexofseletedtopic} /></Route>
             <Route path="/Listofstudent"><Listofstudent  /></Route>  
            <Route path="/timeline"><Timeline setindexofseletedtopic={setindexofseletedtopic}/></Route>
            <Route path="/Chat"><Chat /> </Route>
            <Route path="/ChatBox/:room/:id"  component={ChatBox}  />
            {/* <Route path="/Chat"><SearchbyTags setindexofseletedtopic={setindexofseletedtopic}/></Route>
            <Route path="/Logout"><Searchprofname setindexofseletedtopic={setindexofseletedtopic}/></Route>
             <Route path="/Topicappliedon"><Topicappliedon  topic={alltopics[indexofseletedtopic]} indexofseletedtopic={indexofseletedtopic}/></Route> 
            <Route path="/Detailsoftopic/:number"><Details topic={alltopics[indexofseletedtopic]} indexofseletedtopic={indexofseletedtopic} /></Route> */}
        </Switch>
      </main>
      </Router>
    </div>
  );
}



export default ResponsiveDrawer;
