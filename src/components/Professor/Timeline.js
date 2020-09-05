import React,{ useState} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Createtimeline from "./Createtimeline"
import Listtimeline from "./Listtimeline"
import Edittimeline from "./Edittimeline"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Timeline() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  console.log("YES")
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Create Timeline" />
          <Tab label="List Timeline" />
          <Tab label="Edit Timeline"  />
    
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
            <Createtimeline />
      </TabPanel>
      <TabPanel value={value} index={1}>
            <Listtimeline />
      </TabPanel>
      <TabPanel value={value} index={2}>
            <Edittimeline />
      </TabPanel>
    </div>
  );
}
