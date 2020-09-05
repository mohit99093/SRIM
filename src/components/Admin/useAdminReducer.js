import { useReducer } from "react"

import { EDIT_TIMELINE, INTIAL, EDIT_LOADER, EDIT_ALL_STUDENTS } from "./Action.js";
const editTimeline=(newarray,state)=>({
  ...state,
  timeline:newarray
})



const intial = (newvalue, state)=>({
        ...state,
        ...newvalue
})

const editloader=(newvalue,state)=>({
      ...state,
      open:newvalue
})

const editallStudents=(newarray, state)=>({
      ...state,
      allStudents : newarray
})

const AdminReducer = (state, action) => {
  switch (action.type) {
    case EDIT_TIMELINE:
      return editTimeline(action.newarray, state);
    case INTIAL:
      return intial(action.newvalue, state)
    case EDIT_LOADER:
      return editloader(action.newvalue,state)
    case EDIT_ALL_STUDENTS:
        return editallStudents(action.newarray, state)  
  //   case EDIT_APPLIED_TOPIC:
  //     return editAppliedTopic(action.newarray, state);
    default:
      return state;
  // }
};
}


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
  topicobjId:123,
  profobjId:123,
  
  professorName: "Sawrabh tiwari",
  profEmailId:"sawrabh@gmail.com",
  finalStudents:[ {studentId:"201701212",finalGrade:5},
  {studentId:"201701186",finalGrade:10},
  {studentId:"201701156",finalGrade:8},
  {studentId:"201701125",finalGrade:6},
                ],
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
  professorName: "Anil roy",
  profEmailId:"anil@gmail.com",
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
  Id:8
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

  let dummytimeline = [ 
    {
        stageName: "dummy stage - 1",
        selectedDate : "2017-07-15",
        discription: "this is test 1 stage 1 ",
       
    },
    {
      stageName: "dummy stage - 2",
      selectedDate :  "2017-07-08",
      discription: "this is test 1 stage 2 ",
    }
 ]
  const optionsforTags = [
    "web",
    "andriod",
    "ml",
    "deeplearing",
    "os",
    "software"
  ];  
  const optionsforProfName= [ "sawrabh tiwari", "Anil roy", "pm jat", "Anish Mathuriya", "bisvjit mishra"  ]
// export const useAdminReducer = () =>
//   useReducer(AdminReducer, {
//     _id:"5f18103e72cdd40cf0f2fcb9",
//     topics:[topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9],
//     optionsforTags:optionsforTags,
//     optionsforProfName: optionsforProfName,
//     appliedTopics: [ { profEmailId:"sawrabh@gmail.com",
//       profName: "sawrabh tiwari",
//        topics:[
//       { topicName:"acaab",
//         Id:6,
//         stage1:true,
//         stage2:1,
//         stage3:1,
//         stage4:false
//       }
//     ]} ],
//     allprofessor:[  /*{ professorName:prof.professorName,profEmailId:prof.emailId,profobjId:prof._id }*/  ],
//     allStudentforchat:[],
//     allStudents:[ 
//       {year:"2017",
//       students:[
//       { studentId:"201701212", profName:"sawrabh tiwari", finalGrade:10 },
//       { studentId:"201701213", profName:"sawrabh tiwari", finalGrade:9 },
//       { studentId:"201701214", profName:"sawrabh tiwari", finalGrade:8 },
//       { studentId:"201701215", profName:"sawrabh tiwari", finalGrade:7 },
//       { studentId:"201701216", profName:"sawrabh tiwari", finalGrade:6 },
//                 ]},
//                 {year:"2018",
//                 students:[
//                 { studentId:"201801212", profName:"sawrabh tiwari", finalGrade:10 },
//                 { studentId:"201801213", profName:"sawrabh tiwari", finalGrade:9 },
//                 { studentId:"201801214", profName:"sawrabh tiwari", finalGrade:8 },
//                 { studentId:"201801215", profName:"sawrabh tiwari", finalGrade:7 },
//                 { studentId:"201801216", profName:"sawrabh tiwari", finalGrade:6 },
//                           ]},
//                           {year:"2019",
//       students:[
//       { studentId:"201901212", profName:"sawrabh tiwari", finalGrade:10 },
//       { studentId:"201901213", profName:"sawrabh tiwari", finalGrade:9 },
//       { studentId:"201901214", profName:"sawrabh tiwari", finalGrade:8 },
//       { studentId:"201901215", profName:"sawrabh tiwari", finalGrade:7 },
//       { studentId:"201901216", profName:"sawrabh tiwari", finalGrade:6 },
//                 ]},
//                 {year:"2020",
//       students:[
//       { studentId:"202001212", profName:"sawrabh tiwari", finalGrade:10 },
//       { studentId:"202001213", profName:"sawrabh tiwari", finalGrade:9 },
//       { studentId:"202001214", profName:"sawrabh tiwari", finalGrade:8 },
//       { studentId:"202001215", profName:"sawrabh tiwari", finalGrade:7 },
//       { studentId:"202001216", profName:"sawrabh tiwari", finalGrade:6 },
//                 ]}          
// ],

//     timeline:dummytimeline,

   
//     open:false

     
//   });

  export const useAdminReducer = () =>
  useReducer(AdminReducer, {
    _id:"5f18103e72cdd40cf0f2fcb9",
    topics:[ ],
    optionsforTags:[],
    optionsforProfName: [],
    allprofessor:[  /*{ professorName:prof.professorName,profEmailId:prof.emailId,profobjId:prof._id }*/  ],
    allStudentforchat:[],
    allStudents:[  ],

    timeline:[],

   
    open:false

     
  });