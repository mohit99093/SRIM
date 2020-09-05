import {useReducer} from 'react'
import { ADD_TOPIC, REMOVE_TOPIC, EDIT_TOPIC, EDIT_PROFNAME,EDIT_PROFCOURSES,EDIT_OFFERED_COURSES, EDIT_OPTION_TAGS, INTIAL, EDIT_TOPIC_OBJ, EDIT_LOADER, EDIT_EMAIL } from './Actions'


const inital=(newvalue,state)=>({
  ...state,
  ...newvalue,
  topicobj:newvalue.topics,
  topics:[]
})
const addTopicobj=(newvalue,state)=>({
  ...state,
  topicobj:[...state.topicobj, newvalue]
})
const addTopic=(topic, state)=>({
  ...state,
    topics:[...state.topics, topic]
})

const editTopic=(newarray, state)=>({
  ...state,
  topics:newarray  
})

const removeTopic=(topicName,state)=>({
    ...state,
    topics: state.topics.filter((t)=>topicName!==t.topicName)
})

const editprofessorName=(name,state)=>({
    ...state,
    professorName:name
})


const editofferedCourses=(newarray,state)=>({
  ...state,
  offeredCourses:[...newarray]
})

const editprofessorCourses=(newarray, state)=>{
  //console.log(newarray , "newarray")
  return {
  ...state,
  professorCourses: [...newarray]
}
}

const editoptionsforTags=(newarray, state)=>({
  ...state,
  optionsforTags: [...newarray]
})


const editloader=(newvalue,state)=>({
  ...state,
  open:newvalue
})

const editemailId=(newvalue,state)=>({
    ...state,
    emailId:newvalue,
})
const ProfessorReducer = (state, action) => {
    switch (action.type) {
      case INTIAL:
        return inital(action.newvalue,state)
      case ADD_TOPIC:
        return addTopic(action.topic, state);
      case REMOVE_TOPIC:
        return removeTopic(action.topic, state);
      case EDIT_TOPIC:
        return editTopic(action.newarray, state);
      case EDIT_PROFNAME:
        return editprofessorName(action.newvalue, state);
      case EDIT_OFFERED_COURSES:
        return editofferedCourses(action.newarray, state);
      case EDIT_PROFCOURSES:
            return editprofessorCourses(action.newarray, state);
      case EDIT_OPTION_TAGS:
            return editoptionsforTags(action.newarray, state);    
      case EDIT_TOPIC_OBJ:
          return addTopicobj(action.newvalue,state)  
      case EDIT_LOADER:
          return editloader(action.newvalue,state)   
      case EDIT_EMAIL:
          return editemailId(action.newvalue, state)        
      default:
        return state;
    }
  };

  let dummytimeline = [ 
      {
          stageName: "dummy stage - 1",
          fileinput : true,
          selectedDate : "2017-07-15",
          discription: "this is test 1 stage 1 ",
          grads:[ {studentId:"201701212", g:10}, 
                 {studentId:"201701211", g:5},
                 { studentId:"201701273", g:3}
                ]
      },
      {
        stageName: "dummy stage - 2",
        fileinput : false,
        selectedDate :  "2017-07-08",
        discription: "this is test 1 stage 2 ",
        grads:[{ studentId:"201701212",g:1},{studentId:"201701212",g:2},{studentId:"20170123",g:0}]
    }
   ]
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
  }
 ] 
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
 let sem11 = {
  cpi:6,
  subject: [{ courseId:'EL103', courseName:'Basic Electronic Circuits', grad:10 },
  { courseId:'SC107', courseName:'Calculus', grad:7 },
  { courseId:'PC109', courseName:'Engineering Design Workshop', grad:6 },
  { courseId:'IT110', courseName:'Introduction to Programing Lab', grad:2 },
  { courseId:'IT105', courseName:'Introduction to Programming', grad:5 },
  { courseId:'PC110', courseName:'Language and Literature', grad:6 }
]
}
let sem22 = {
cpi:5,
subject:[{ courseId:'IT206', courseName:'Data Structure Lab', grad:8},
{ courseId:'IT205', courseName:'Data Structures', grad:9},
{ courseId:'SC205', courseName:'Discrete Mathematics', grad:4},
{ courseId:'CT111', courseName:'Introduction to Communication Systems', grad:2},
{ courseId:'HM106', courseName:'Approaches to Indian Society', grad:1},
{ courseId:'EL114', courseName:'Digital Logic Design', grad:9}]
}
const topic1 = {
  topicobjId:123,
  topicName:"online portal",
  Tags:['web',"andriod"],
  Prerequisite:['student havae to pass in ml',"cpi>=10"],
  Discription:'Any one can take it',
  Students: [ "201701212","201701211","201701273","201701456","201701783","201701166","201701866"],
  Studentsdetails: [ 
    {   studentobjId:123, 
        studentId:"201701212",
        isapporved:false,
        finalApprove:{},
        results:[ sem1, sem2],
        stage1:true,
        stage2:false,
        stage3:true,
        stage4:true
    },
    {
        studentobjId:123,
        studentId:"201701211",
        isapporved:false,
        finalApprove:{},
        results:[sem11,sem22],
        stage1:true,
        stage2:false,
        stage3:true,
        stage4:true
    },
    {
      studentobjId:123,
      studentId:"201701273",
      isapporved:false,
      finalApprove:{},
        results:[sem11,sem22],
        stage1:true,
        stage2:true,
        stage3:true,
        stage4:true
    },
    {
      studentobjId:123,
        studentId:"201701456",
        isapporved:false,
        finalapprove:{},
        results:[sem11,sem22],
        stage1:true,
        stage2:true,
        stage3:true,
        stage4:true
    },
    { 
      studentobjId:123,
        studentId:"201701783",
        isapporved:false,
        finalapprove:{},
        results:[sem11,sem22],
        stage1:true,
        stage2:true,
        stage3:true,
        stage4:false
    },
    {
      studentobjId:123,
        studentId:"201701166",
        isapporved:false,
        finalapprove:{},
        results:[sem11,sem22],
        stage1:true,
        stage2:true,
        stage3:true,
        stage4:true
    },
    {
      studentobjId:123,
        studentId:"201701866",
        isapporved:false,
        finalapprove:{},
        results:[sem11,sem22],
        stage1:true,
        stage2:true,
        stage3:true,
        stage4:false
    }
  ],
  finalStudents : [ 
  {studentId:"201701212",teamUp:true, teamIndex:0},
  {studentId:"201701211",teamUp:true,teamIndex:0},
  {studentId:"201701273",teamUp:true,teamIndex:0},
  {studentId:"201701456",teamUp:false,teamIndex:-1},
  {studentId:"201701166",teamUp:false,teamIndex:-1} ],
  Teams:[ 
          { teamMember:["201701212","201701211","201701273"], 
            timeline: dummytimeline
          },
          { teamMember:[],
            timeline: dummytimeline1 
          }
        ]
}
const optionsforTags = [
  "web",
  "andriod",
  "ml",
  "deeplearing",
  "os",
  "software"
];

const courses = [
  { courseId:'EL103', courseName:'Basic Electronic Circuits', isSelected:true },
  { courseId:'SC107', courseName:'Calculus', isSelected:true},
  { courseId:'PC109', courseName:'Engineering Design Workshop', isSelected:true },
  { courseId:'IT110', courseName:'Introduction to Programing Lab', isSelected:false },
  { courseId:'IT105', courseName:'Introduction to Programming', isSelected:false },
  { courseId:'PC110', courseName:'Language and Literature', isSelected:false },
  {  courseId:'IT206', courseName:'Data Structure Lab', isSelected:true },
  { courseId:'IT205', courseName:'Data Structures', isSelected:false},
  { courseId:'SC205', courseName:'Discrete Mathematics', isSelected:true },
  { courseId:'CT111', courseName:'Introduction to Communication Systems', isSelected:false },
  {  courseId:'HM106', courseName:'Approaches to Indian Society', isSelected:false },
  { courseId:'EL114', courseName:'Digital Logic Design', isSelected:false }
]

const professorcourses = [ "EL103", "SC107","PC109","IT206","SC205"]
// export const useProfessorReducer = () =>
//   useReducer(ProfessorReducer, {
//     password:"",
//     topics: [topic1],
//     topicobj:[],
//     profobjId:"5f12ea5e934cb74340a2d91d",
//     emailId:"saurabh@daiict.ac.in",
//     optionsforTags:optionsforTags,
//     offeredCourses:courses,
//     professorName:"Saurabh tiwari",
//     professorCourses:professorcourses,
//     Admintimeline:[],
//     finalStage: {
//       stageName:"FinalStage",
//       fileinput:false,
//       discription:"This is the final Stage hear you have to pust final grad for student",
//       iscompleted:false
//   },
//       open:false
//   });


export const useProfessorReducer = () =>
  useReducer(ProfessorReducer, {
    password:"",
    topics: [],
    topicobj:[],
    profobjId:"",
    emailId:"",
    optionsforTags:[],
    offeredCourses:[],
    professorName:"",
    professorCourses:[],
    Admintimeline:[],
    finalStage: {
      stageName:"FinalStage",
      fileinput:false,
      discription:"This is the final Stage hear you have to pust final grad for student",
      iscompleted:false
  },
      open:false,
      AdminobjId:0,
      allStudents:[]
  });