import React,{useState,useEffect,useContext} from 'react'
import { Autocomplete } from "@material-ui/lab"
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Teams from './Teams'
import { Profc } from './ProfessorContext'
import Axios from 'axios';

 



const Createteams=({topic, indexoftopic})=>{
        const [selectedStudents, setselectedStudents] = useState([]);
        const [Error, setError] = React.useState({message:"click on button for create Team" , color:"black"});
        const [optionsforStudents, setoptionsforStudents] = useState([])
        const { topics, editTopic, editloader } = useContext(Profc)
       
        
       useEffect(() => {
              let os = []
              let finalstudents = topic.finalStudents
              if(finalstudents)
              {
                finalstudents.forEach((obj)=>{
                  if(!obj.teamUp)
                  os = [...os,obj.studentId]
                })    
                setoptionsforStudents(os)
            }
              
        }, [selectedStudents,topic.finalStudents])
     

          const changeinfinalStuddents = (topic,value,index)=>{
            console.log(index)
            let finalStudents = topic.finalStudents
            for(let i=0;i<selectedStudents.length;i++)
            {
                  for(let j=0;j<finalStudents.length;j++)
                  {
                         if(finalStudents[j].studentId===selectedStudents[i])
                         {
                           finalStudents[j].teamUp=value
                           finalStudents[j].teamIndex=index
                         }
                  }
            }
            topic.finalStudents = finalStudents
          }

          async function updatetopicsandstudent(topic,index){
            let newtopic = {
              topicName:topic.topicName,
              Tags:topic.Tags,
              Prerequisite:topic.Prerequisite,
              Discription:topic.Discription,
              Students:topic.Students,
              finalStudents:topic.finalStudents,
              Teams:topic.Teams,
              profobjId:topic.profobjId
            }
            editloader(true)
            Axios.post(`http://localhost:5000/alltopics/update/`+topic._id, newtopic)
            .then(res=>{
              
                let newdata = res.data.Teams;
                console.log(newdata)
                let dummytopics = topics
                dummytopics[indexoftopic].Teams = newdata
                editTopic(dummytopics) 
               
              selectedStudents.forEach((studentId)=>{  
                Axios.get(`http://localhost:5000/student/getbystudentId/`+studentId).then(res=>{
                          let studentsdata = res.data[0]
                          console.log(studentsdata)
                  let newstudent = {
                              ...studentsdata,
                              // TeamobjId:newdata[index]._id,
                              TeamNumber:index
                            }
                  console.log(newstudent)          
                Axios.post(`http://localhost:5000/student/updatebystudentId/`+studentId, newstudent).then(res=>console.log("student updated")).
                catch(err=>console.log(err))
                })
              })      
            })
            .catch(err=>console.log(err))
            editloader(false)
            
          }

         const handleAddstudents=(index,teamMember)=>{
          if (selectedStudents.length === 0) {
            let error = {...Error, message:"Filed's can't be Empty", color:"red"}   
            setError(error)
          }
          else{
            changeinfinalStuddents(topic,true,index)
            let newteamMember = [...teamMember,...selectedStudents]
            topic.Teams[index].teamMember = newteamMember
            topics[indexoftopic] = topic
            editTopic(topics) 
            setselectedStudents([])
            console.log(topic)

            // 1) CHANGE IN ALLTOPICS
            updatetopicsandstudent(topic,index)
            // console.log(newtopic)
          }
        }
        const handleDeletestudents=(indexofstudent,index,teamMember)=>{
          
          let oldmember = [...teamMember]
          let studentId = teamMember[indexofstudent]
          let finalStudents = [...topic.finalStudents];
          for(let i=0;i<finalStudents.length;i++)
          {
              if(finalStudents[i].studentId===teamMember[indexofstudent])
              {
                finalStudents[i].teamUp=false
                finalStudents[i].teamIndex = -1;
              }
          }
          topic.finalStudents = finalStudents
          let newmember = oldmember.filter((Member)=>Member!==teamMember[indexofstudent])
          setselectedStudents([teamMember[indexofstudent]])
          setselectedStudents([])
          topic.Teams[index].teamMember = newmember
          let newTems = topic.Teams.filter(obj=>obj.teamMember.length!==0)
          topic.Teams = newTems 
          topics[indexoftopic] = topic
          editTopic(topics)

          console.log(topic)

           // 1) CHANGE IN ALLTOPICS
           let newtopic = {
            topicName:topic.topicName,
            Tags:topic.Tags,
            Prerequisite:topic.Prerequisite,
            Discription:topic.Discription,
            Students:topic.Students,
            finalStudents:topic.finalStudents,
            Teams:topic.Teams,
            profobjId:topic.profobjId
          }
          editloader(true)
          Axios.post(`http://localhost:5000/alltopics/update/`+topic._id, newtopic)
          .then(res=>{
            
              let newdata = res.data.Teams;
              console.log(newdata)
             
          
              Axios.get(`http://localhost:5000/student/getbystudentId/`+studentId).then(res=>{
                        let studentsdata = res.data[0]
                        console.log(studentsdata)
                let newstudent = {
                            ...studentsdata,
                            // TeamobjId:newdata[index]._id,
                            TeamNumber:-1
                          }
                console.log(newstudent)          
              Axios.post(`http://localhost:5000/student/updatebystudentId/`+studentId, newstudent).then(res=>console.log("student updated")).
              catch(err=>console.log(err))
              })
          })
          .catch(err=>console.log(err))
           editloader(false)  
             
    
         
        }
        const handleSubmit =() => {
          
          if (selectedStudents.length === 0) {
              let error = {...Error, message:"Filed's can't be Empty", color:"red"}   
              setError(error)
          }
          else
          {
                  let newTeam = {
                      teamMember: selectedStudents
                  }
                  changeinfinalStuddents(topic,true,topic.Teams?topic.Teams.length:0)
                  let newTeams = [ ...topic.Teams, newTeam ]
                  topic.Teams = newTeams
                  topics[indexoftopic] = topic
                  editTopic(topics)
                  setselectedStudents([])
                  // console.log(topic)

                    
                   // 1) CHANGE IN ALLTOPICS
                   let index = topic.Teams?topic.Teams.length-1:0
                   updatetopicsandstudent(topic,index)
                 
                  

          }
        };
        return (
            <>
       <div >
        <h2>Select selectedStudents</h2>
      </div>
      <Autocomplete
        multiple
        id="selectedStudents-standard"
        options={optionsforStudents}
        getOptionLabel={option => option}
        filterSelectedOptions
        value={selectedStudents}
        onChange={(event, getOptionSelected) =>setselectedStudents(getOptionSelected)}
        renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Slelect multiple selectedStudents"
              placeholder="Add-Tages"
              color="primary"
              error={selectedStudents.length===0}
            />
        )}
      />

        <Box mt={2} display="flex" >
            <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            >
            Create Team
            </Button>
            <Box ml={2} color={Error.color} fontSize={20} m="auto">
                {Error.message}
            </Box>

      </Box>
      
            <Box mt={5}>
                <Teams topic={topic} handleAddstudents={handleAddstudents} handleDeletestudents={handleDeletestudents}  indexoftopic={indexoftopic}/>  
            </Box>

      </>
        )
}

export default Createteams
