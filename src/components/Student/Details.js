import React, { useState, useEffect,useContext } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Stuc } from "./StudentContext"
import Axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginTop: 50,
      padding: 5
    },
    tags: {
      padding: 2,
      backgroundColor: "red"
    },
    chips: {
      padding: theme.spacing(0.5)
    }
  }));
const Details=(props)=>{
        const [disable, setdisable] = useState(false)
        const classes = useStyles();
        let selectedtopic = props.topic
        const { appliedTopics, editAppliedTopic,  profile,
            studentName,
            studentId,
            studentobjId,
            emailId,
            finalgrade,
            results,
            editloader } = useContext(Stuc)
        useEffect(() => {
            if(appliedTopics)
            {
            appliedTopics.forEach(topic => {
                    if(topic.profEmailId===selectedtopic.profEmailId)
                    {       console.log(topic)
                            topic.topics.forEach(t=>{
                                    if(t.topicobjId===selectedtopic.topicobjId)
                                    setdisable(true)
                            })
                    }
            });
        }
           
        }, [selectedtopic, appliedTopics])
        const hendleapply = ()=>{
                let flag = 1;
                for(let i=0;i<appliedTopics.length;i++)
                {       let topic = appliedTopics[i]
                        if(topic.profobjId===selectedtopic.profobjId)
                        {
                                topic.topics.push({
                                        topicName:selectedtopic.topicName,
                                        topicobjId:selectedtopic.topicobjId,
                                        stage1:true,
                                        stage2:false,
                                        stage3:false,
                                        stage4:false
                                })
                                flag = 0;
                        }
                }
                if(flag)
                {
                           
                            appliedTopics.push({
                                profEmailId:selectedtopic.profEmailId,
                                profName:selectedtopic.professorName,
                                profobjId:selectedtopic.profobjId,
                                topics:[ {
                                    topicName:selectedtopic.topicName,
                                    topicobjId:selectedtopic.topicobjId,
                                    stage1:true,
                                    stage2:false,
                                    stage3:false,
                                    stage4:false

                                } ]
                            })
                            
                }
                let dummyappliedTopic = [...appliedTopics]
            
                    let newstudent = {
                        profile,
                        studentName,
                        studentId,
                        emailId,
                        finalgrade,
                        results,
                        appliedTopics:dummyappliedTopic,       
                    }
                editloader(true)
                Axios.post(`http://localhost:5000/student/update/`+studentobjId, newstudent).then(res=>console.log("student update")).
                catch(err=>console.log(err))
                let value = {
                        studentobjId
                }
                Axios.post(`http://localhost:5000/alltopics/pushStudent/`+selectedtopic.topicobjId, value).then((res)=>console.log("topics updeted")).
                catch(err=>console.log(err))    
                editloader(false)
                
                editAppliedTopic(dummyappliedTopic)
                setdisable(true)
        }
        
       
        return (
            
            <>

           
                <Box className={classes.root}>
                <Box mb={2}>
                <Typography variant='h3' >{selectedtopic.topicName} </Typography>
                </Box>

                

                <Box display="flex" mb={2} ml={4} className={classes.chips}>
                        {selectedtopic.Tags.map((t) => (
                    <Chip label={t} clickable color="secondary" />
                 ))}
                </Box>

                <Box>
                <Typography variant='h4' >Prerequisite For Students</Typography>
                </Box>

                <Box ml={2} mb={3}>
                    <ul>
                         {selectedtopic.Prerequisite.map((p)=> <li><Typography variant='h6' >{p}</Typography></li>)}
                    </ul>
                </Box>
                    
                <Box mb={2}>
                <Typography variant='h4' >Discription </Typography>
                </Box>

                <Box ml={5}>
                    <Typography variant='h6'> {selectedtopic.Discription} </Typography>
                </Box>
                <Box mt={2} display="flex" >
                <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={hendleapply}
                disabled={disable}
                >
                    {disable?"Already Appiled":  "Apply"}
                </Button>
                <Box ml={2} color={Error.color} fontSize={20} m="auto">
                    {Error.message}
                </Box>
            </Box>
            </Box>
            </>
        )
}

export default Details