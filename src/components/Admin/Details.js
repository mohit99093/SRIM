import React, { useState, useEffect,useContext } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Admc } from "./AdminContext"
const Details=(props)=>{
        const [disable, setdisable] = useState(false)
        let selectedtopic = props.topic
        const { appliedTopics, editAppliedTopic } = useContext(Admc)
        useEffect(() => {
            if(appliedTopics)
            {
            appliedTopics.forEach(topic => {
                    if(topic.profEmailId===selectedtopic.profEmailId)
                    {       console.log(topic)
                            topic.topics.forEach(t=>{
                                    if(t.Id===selectedtopic.Id)
                                    setdisable(true)
                            })
                    }
            });
        }
           
        }, [selectedtopic, appliedTopics])
        return (
            
            <>
                <Box mb={2}>
                <Typography variant='h3' >{selectedtopic.topicName} </Typography>
                </Box>

                

                <Box display='flex' mb={2} ml={4}>
                    {selectedtopic.Tags.map(t=> <Typography variant='h6' > {t}, </Typography>)}
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
               

            </>
        )
}

export default Details