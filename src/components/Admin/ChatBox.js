import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { Admc } from "./AdminContext"
import io from "socket.io-client"
import Axios from 'axios';

const socket = io.connect("http://localhost:5000")
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
    background:"rgb(206, 206, 161)"
  },
  listText:{

  }
});

const ChatBox = (props) => {
  const classes = useStyles();
  
  const { _id } = useContext(Admc) 
  const [chats, setchats] = useState([])
  const [msg, setmsg] = useState("")
 
  
 
   async function fetchchat(studentobjId)
   {            let dummyallchats = []
                await Axios.get(`http://localhost:5000/chat`).then((res)=>{

                        let data = res.data.filter(chat=> ((chat.to===_id && chat.from===studentobjId) || chat.to===studentobjId && chat.from===_id))
                        dummyallchats = data
                }).catch(err=>{
                    alert(err)
                })
                setchats(dummyallchats)
   }

  useEffect(() => {
     // CHANGEING ROOM TO STUDENT _ID  + PROFOBJID
    let newroom  =  props.match.params.room
    console.log(props,"hello");
   socket.emit("changeroom", newroom)
    fetchchat(props.match.params.id)
  }, [])

  socket.on("c1remote", (msg)=>{
     msg = {
            ...msg,
            dir:msg.from===_id ? "right" : "left"
     } 
     console.log(msg);
    setchats([...chats, msg])
})
    const handlesendmessage = async()=>{
                let mess = {
                        to:props.match.params.id,
                        from:_id,
                        Date : new Date().toLocaleString(),
                        message:msg,
                       
                }
                console.log(mess);
                await Axios.post(`http://localhost:5000/chat/add`, mess).then((res)=>{
                        console.log("message added");
                }).catch((err)=>console.log(err))

                socket.emit("c1" ,mess)
                setmsg("")
    }


  return (
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={12}>
                <List className={classes.messageArea}>
                    { chats.map((obj, i)=>(
                             <ListItem key={i}>
                             <Grid container>
                                 <Grid item xs={12}>
                                     <ListItemText className={classes.listText} align={obj.from===_id?"right":"left"} primary={obj.message}></ListItemText>
                                 </Grid>
                                 <Grid item xs={12}>
                                     <ListItemText align={obj.from===_id?"right":"left"} secondary={obj.Date}></ListItemText>
                                 </Grid>
                             </Grid>
                             <Divider />
                         </ListItem>
                     )) }
                   
                </List>
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth value={msg} onChange={(e)=>setmsg(e.target.value)} />
                    </Grid>
                    <Grid xs={1} align="right">
                    
                        <Fab color="primary" aria-label="add" type="button" onClick={handlesendmessage}><SendIcon /></Fab>
                        
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default ChatBox;