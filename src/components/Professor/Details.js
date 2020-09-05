import React from 'react'
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";


const Details=(props)=>{
       
        let selectedtopic = props.topic
        return (
            
            <>
                <Box mb={2}>
                <Typography variant='h3' >{selectedtopic.topicName} </Typography>
                </Box>

                

                <Box display='flex' mb={2} ml={4}>
                    {selectedtopic.Tags.map(t=> <Typography variant='h6' key={t} > {t}, </Typography>)}
                </Box>

                <Box>
                <Typography variant='h4' >Prerequisite For Students</Typography>
                </Box>

                <Box ml={2} mb={3}>
                    <ul>
                         {selectedtopic.Prerequisite.map((p)=> <li key={p}><Typography variant='h6' >{p}</Typography></li>)}
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