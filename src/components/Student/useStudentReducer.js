import { useReducer } from "react"

import { EDIT_PROFILE, EDIT_APPLIED_TOPIC, INTIAL, EDIT_PROF_TIMELINE, EDIT_LOADER } from "./Action.js";

const editProfile=(newprofile,state)=>({
  ...state,
  profile:newprofile
})

const editproftimeline=(newarray,state)=>({
      ...state,
      Teamtimeline:newarray
})

const editAppliedTopic =(newappliedTopic,state)=>({
    ...state,
    appliedTopics:newappliedTopic
})

const intial=(newvalue,state)=>({
    ...state,
   ...newvalue

})


const editloader=(newvalue,state)=>({
  ...state,
  open:newvalue
})

const StudentReducer = (state, action) => {
  switch (action.type) {
    case INTIAL:
      return intial(action.newvalue, state)
    case EDIT_PROFILE:
      return editProfile(action.newprofile, state);
    case EDIT_APPLIED_TOPIC:
      return editAppliedTopic(action.newarray, state);
    case EDIT_PROF_TIMELINE:
      return editproftimeline(action.newarray, state);
    case EDIT_LOADER:
      return editloader(action.newvalue, state)  
    default:
      return state;
  }
};


let sem1 = {
  cpi:8,
  subject: [{ courseId:'EL103', courseName:'Basic Electronic Circuits', grad:10 },
  { courseId:'SC107', courseName:'Calculus', grad:9 },
  { courseId:'PC109', courseName:'Engineering Design Workshop', grad:5 },
  { courseId:'IT110', courseName:'Introduction to Programing Lab', grad:7 },
  { courseId:'IT105', courseName:'Introduction to Programming', grad:6 },
  { courseId:'PC110', courseName:'Language and Literature', grad:8 }
]
}
let sem2 = {
cpi:7,
subject:[{ courseId:'IT206', courseName:'Data Structure Lab', grad:4},
{ courseId:'IT205', courseName:'Data Structures', grad:7},
{ courseId:'SC205', courseName:'Discrete Mathematics', grad:10},
{ courseId:'CT111', courseName:'Introduction to Communication Systems', grad:6},
{ courseId:'HM106', courseName:'Approaches to Indian Society', grad:10},
{ courseId:'EL114', courseName:'Digital Logic Design', grad:2}]
}
let topic1={
  topicName:'aaaab',
  Tags:[ 'web', 'Andriod', 'ML' ],
  Prerequisite: [ 'Student have 10 pinter', 'Student is girl' ],
  Discription: 'Mohit1',
  indexoftopic:0,
  professorName: "Sawrabh tiwari",
  profEmailId:"sawrabh@gmail.com",
  profobjId:1,
  Id:1
  }
  let topic2={
  topicName:'abaab',
  Tags:[ 'web', 'Andriod', 'ML' ],
  Prerequisite: [ 'Student have 10 pinter', 'Student is girl' ],
  Discription: 'Mohit2',
  indexoftopic:1,
  professorName: "Anil roy",
  profEmailId:"anil@gmail.com",
  Id:2
  }
  let topic3={
  topicName:'acaab',
  Tags:[ 'web', 'Andriod', 'ML' ],
  Prerequisite: [ 'Student have 10 pinter', 'Student is girl' ],
  Discription: 'Mohit3',
  indexoftopic:2,
  professorName: "Sawrabh tiwari",
  profEmailId:"sawrabh@gmail.com",
  Id:3
  }
  let topic4={
  topicName:'baaab',
  Tags:[ 'web', 'Andriod', 'ML' ],
  Prerequisite: [ 'Student have 10 pinter', 'Student is girl' ],
  Discription: 'Mohit4',
  indexoftopic:3,
  professorName: "",
  profEmailId:"",
  Id:4

  }
  let topic5={
  topicName:'bbaab',
  Tags:[ 'web', 'Andriod', 'ML' ],
  Prerequisite: [ 'Student have 10 pinter', 'Student is girl' ],
  Discription: 'Mohit5',
  indexoftopic:4,
  professorName: "",
  profEmailId:"",
  Id:5
  }
  let topic6={
  topicName:'acaab',
  Tags:[ 'web', 'Andriod', 'ml' ],
  Prerequisite: [ 'Student have 10 pinter', 'Student is girl' ],
  Discription: 'Mohit6',
  indexoftopic:5,
  professorName: "Sawrabh tiwari",
  profEmailId:"sawrabh@gmail.com",
  Id:6
  }
  let topic7={
  topicName:'waaab',
  Tags:[ 'web', 'Andriod', 'ml' ],
  Prerequisite: [ 'Student have 10 pinter', 'Student is girl' ],
  Discription: 'Mohit7',
  indexoftopic:6,
  professorName: "",
  profEmailId:"",
  Id:7
  }
  let topic8={
  topicName:'wsaaab',
  Tags:[ 'web', 'Andriod', 'ML', 'os' ],
  Prerequisite: [ 'Student have 10 pinter', 'Student is girl' ],
  Discription: 'Mohit8',
  indexoftopic:7,
  professorName: "",
  profEmailId:"",
  topicobjId:8
  }
  let topic9={
  topicName:'aaaab',
  Tags:[ 'web', 'Andriod', 'ML' ],
  Prerequisite: [ 'Student have 10 pinter', 'Student is girl' ],
  Discription: 'Mohit9',
  indexoftopic:8,
  professorName: "",
  profEmailId:"",
  Id:9
  
  }
  const optionsforTags = [
    "web",
    "andriod",
    "ml",
    "deeplearing",
    "os",
    "software"
  ];  
  const optionsforProfName= [ "sawrabh tiwari", "Anil roy", "pm jat", "Anish Mathuriya", "bisvjit mishra"  ]
  let dummytimeline1 = [ 
    {
        stageName: "dummy1 stage - 1 team-2",
        fileinput : true,
        selectedDate : "2017-07-15",
        discription: "this is test 1 stage 1 ",
        grads:[]
    },
    {
      stageName: "dummy1 stage - 2 team-2",
      fileinput : false,
      selectedDate : "2017-07-08",
      discription: "this is test 1 stage 2 ",
      grads:[]
  }]
// export const useStudentReducer = () =>
//   useReducer(StudentReducer, {
//     studentobjId:123,
//     studentName:"Mohit Solanki",
//     studentId:"201701211",
//     emailId:"201701211@daiict.ac.in",
//     profile:{
//         toolsAndTechnology:["Mohit"],
//         intrest:["SOlanki abcd"],
//         other:"yelo"
//     },
//     finalgrade:0,
//     results:[sem1,sem2],
//     finalApprove:{
//             profobjId:233,
//             topicobjId:231,
//             topicName:"portal for intership",
//             profName:"sawrabh tiwari",
//             profEmailId:"sawrabh@gmail.com",
//     },
//     TeamobjId:123,
//     TeamNumber:1,
//     Teamtimeline:dummytimeline1,
//     Admintimeline:dummytimeline1,
//     alltopics:[topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9],
//     optionsforTags:optionsforTags,
//     optionsforProfName: optionsforProfName,
//     appliedTopics: [ { profEmailId:"sawrabh@gmail.com",
//       profName: "sawrabh tiwari",
//       profobjId:123,
//        topics:[
//       { topicName:"acaab",
//         topicobjId:123,
//         stage1:true,
//         stage2:1,
//         stage3:1,
//         stage4:false
//       }
//     ]} ],
//     allprofessor:[  /*{ professorName:prof.professorName,profEmailId:prof.emailId,profobjId:prof._id }*/ ],
//     AdminobjId:123
//     open:false
//   });


export const useStudentReducer = () =>
  useReducer(StudentReducer, {
   alltopics:[],
    open:false
  });