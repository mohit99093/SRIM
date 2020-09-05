import React, { useContext, useState,useEffect }  from 'react';
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
import axios from "axios"
import { Mainc } from "./Mainadmin/MainadminContext"
// components
import Courses from "./Mainadmin/Courses"
import Tags from "./Mainadmin/Tags"
import Loader from "./Mainadmin/Loader"
import { EDIT_ALL_COURSES } from './Mainadmin/Actions';

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
  const { allCourses, editAllcourses, editTags, editloader } = useContext(Mainc)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  

  useEffect(() => {
        editloader(true)
        axios.get('http://localhost:5000/allcourses').then(res=>{
                  editAllcourses(res.data)
        }).catch(err=>console.log(err))

        axios.get('http://localhost:5000/Tags').then(res=>{
          editTags(res.data) 
        }).catch(err=>console.log(err))
        editloader(false)
  }, [])
  

  const drawer = (
      <div className={classes.toolbar} >
          <Divider />
          <Divider />
          <Divider /> 
      <List className={classes.drawerHeader}>
            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
            <ListItemText primary={"201701212"} />
      </List>
      <Divider />
      <List>
        {['Courses','Tags'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <NavLink to={`/`+text}>
            <ListItemText primary={text} />
            </NavLink>
          </ListItem>
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
          <button onClick={()=>props.setisstudent(0)}>change</button>
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
            <Route path="/Courses"> <Courses /> </Route>
            <Route path="/Tags"><Tags /> </Route>
            {/* <Route path="/Editprofile"> <Editprofile /> </Route>
            <Route path="/Listoftopics"><Searchtopicname setindexofseletedtopic={setindexofseletedtopic}/></Route>
            <Route path="/Searchbytags"><SearchbyTags setindexofseletedtopic={setindexofseletedtopic}/></Route>
            <Route path="/Searchbyprofname"><Searchprofname setindexofseletedtopic={setindexofseletedtopic}/></Route>
             <Route path="/Topicappliedon"><Topicappliedon  topic={alltopics[indexofseletedtopic]} indexofseletedtopic={indexofseletedtopic}/></Route> 
            <Route path="/Detailsoftopic/:number"><Details topic={alltopics[indexofseletedtopic]} indexofseletedtopic={indexofseletedtopic} /></Route>
            <Route path="/TimelineforProject"><Timelineprof /> </Route>
            <Route path="/Timelineforinternship" ><TimelineAdmin /> </Route> */}
        </Switch>
      </main>
      </Router>
    </div>
  );
}



export default ResponsiveDrawer;
