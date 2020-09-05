import React, { useState,useContext, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Profc } from "./ProfessorContext"
import {getcourseheadcell} from "./usefulfunction"
import Alert from '@material-ui/lab/Alert';
import Axios from "axios";


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}


let helpheadCells = [
  {
    id: "studentId",
    numeric: true,
    disablePadding: false,
    label: "Student ID"
  },
  {
    id: "stage-2",
    numeric: true,
    disablePadding: false,
    label: "approve(stage-2)"
  },
  {
    id: "stage-3",
    numeric: true,
    disablePadding: false,
    label: "student-approve(stage-3)"
  },
  {
    id: "stage-4",
    numeric: true,
    disablePadding: false,
    label: "final-approve(stage-4)"
  }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    
    topic,
    setrows
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
    
  };
  const [headCells, setheadCells] = useState([])
  const [isthisprof, setisthisprof] = useState(false)
  const { profobjId, professorCourses, offeredCourses } = useContext(Profc)

  const { topics  } = useContext(Profc)
  useEffect(() => {
    let courseheadcell = []
    console.log(offeredCourses)
    courseheadcell =professorCourses ?  getcourseheadcell(offeredCourses) :[]
    let dummyheadcell = [helpheadCells[0],...courseheadcell,helpheadCells[1],helpheadCells[2],helpheadCells[3]]
    setheadCells(dummyheadcell)

        let dummyrows = []    
        topic.Studentsdetails.forEach(student=>{
          let dummyresult = []
          let studentsdata = { studentId:student.studentId}
                student.results.forEach(sem=>{
                          sem.subject.forEach(sub=>{
                            courseheadcell.forEach(cell=>{
                                if(sub.courseName===cell.label)
                                {  
                                    dummyresult.push(sub.grade)  
                                }
                              })
                          })
                })  
                let dummyobj = { 
                      stage2:student.stage2,
                      stage3:student.stage3,
                      stage4:student.stage4
                }
                // for able and diable approvebutton
                // if(student.isapproved && student.finalApprove.profobjId===profobjId)
                // setisthisprof(true)
                // studentsdata = {...studentsdata, ...dummyresult,...dummyobj,isthisprof:true}
                // setisthisprof(false)

                if(student.isapproved && student.finalApprove.profobjId===profobjId && student.stage4)
                studentsdata = {...studentsdata, ...dummyresult,...dummyobj,isthisprof:true, isapproved:student.isapproved}
                else
                studentsdata = {...studentsdata, ...dummyresult,...dummyobj,isthisprof:false, isapproved:student.isapproved}
                // setisthisprof(false)
                dummyrows.push(studentsdata)
                console.log(studentsdata)   
                  
    })
    console.log(dummyrows)
    setrows(dummyrows)
    console.log(dummyrows)
  


  }, [topics, professorCourses])

  let table = headCells ? headCells.map(headCell => (
    <TableCell
      key={headCell.id}
      // align={headCell.numeric ? "right" : "left"}
      align='center'
      padding={headCell.disablePadding ? "none" : "default"}
      sortDirection={orderBy === headCell.id ? order : false}
    >
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : "asc"}
        onClick={createSortHandler(headCell.id)}
      >
        <Typography align=''>{headCell.label}</Typography>
        {orderBy === headCell.id ? (
          <span className={classes.visuallyHidden}>
            {order === "desc" ? "sorted descending" : "sorted ascending"}
          </span>
        ) : null}
      </TableSortLabel>
    </TableCell>
  ))
  :null
 
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {table}
      </TableRow>
    </TableHead>
  );
}


const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Students  
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

export default function EnhancedTable({ topic, indexoftopic }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("studentId");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setrows] = useState([])
  const [courseheadcell, setcourseheadcell] = useState([])
  const { professorCourses,offeredCourses, editTopic,topics, profobjId, editloader} = useContext(Profc); 
 
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    let dummycourseheadcell = [];
    dummycourseheadcell = getcourseheadcell(offeredCourses)
    setcourseheadcell(dummycourseheadcell)  
  }, [offeredCourses])
  
  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.studentId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    if(event.target.id==="buttondisapprove" || event.target.id=="buttonapprove")
    return
 
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDisapprove=async(selectedstudentId, index)=>{
        let dummytopic = topic;   
        //change in finalstudents
        for(let i=0;i<dummytopic.finalStudents.length;i++)
        {
                if(dummytopic.finalStudents[i].studentId===selectedstudentId)
                {

                  // check is in the Teams
                    if(dummytopic.finalStudents[i].teamUp)
                    {
                           
                            let newarray = []
                            console.log(dummytopic.Teams[dummytopic.finalStudents[i].teamIndex].teamMember)
                            for(let j=0;j<dummytopic.Teams[dummytopic.finalStudents[i].teamIndex].teamMember.length;j++)
                            {
                                    if(dummytopic.Teams[dummytopic.finalStudents[i].teamIndex].teamMember[j]!==selectedstudentId)
                                    newarray.push(dummytopic.Teams[dummytopic.finalStudents[i].teamIndex].teamMember[j])
                            }
                           dummytopic.Teams[dummytopic.finalStudents[i].teamIndex].teamMember  = newarray
                           if(newarray.length===0)
                           {
                            dummytopic.Teams[dummytopic.finalStudents[i].teamIndex].timeline = []
                           }
                           
                    }

                    dummytopic.finalStudents.splice(i,1)
                }
        }
        console.log(dummytopic)
        // change in StudentsDetauls
        for(let i=0;i<dummytopic.Studentsdetails.length;i++)
        {
                if(dummytopic.Studentsdetails[i].studentId===selectedstudentId)
                {
                    dummytopic.Studentsdetails[i].stage4 = false
                    dummytopic.Studentsdetails[i].finalApprove = {}
                    dummytopic.Studentsdetails[i].isapproved = false
                }
        }
        
        // finanly change in topics 
        let dummytopics = [...topics]
        dummytopics[indexoftopic] = dummytopic
        editTopic(dummytopics)
        console.log(dummytopics)
        console.log("success")


        console.log(topic)
        let flag = 0
        let studentdata = await fetchstudentsbystudentId(selectedstudentId)       // get data from STUDENT database   by studentId
            // console.log(studentdata)
            //  DATABASE HAVETOBE CHANGED :-1) STUDENTS, 2)  ALLTOPICS

            // 1)     change in appliedtopic in STUDENTS data base
            if(studentdata.finalApprove!={})
            {
            
            let dummyappliedtopics = [...studentdata.appliedTopics]
            for(let i=0;i<dummyappliedtopics.length;i++)
            {
                    if(dummyappliedtopics[i].profobjId===profobjId)
                    { 
                              for(let j=0;j<dummyappliedtopics[i].topics.length;j++)
                              {
                                          if(dummyappliedtopics[i].topics[j].topicobjId===topic._id)
                                          {
                                                let newvalue = dummyappliedtopics[i].topics[j];
                                                newvalue = {
                                                    ...newvalue,
                                                    stage4:false
                                                }

                                                dummyappliedtopics[i].topics[j] = newvalue
                                          }
                              }
                    }
            }

            
            console.log(dummyappliedtopics)

            // change in finalApprove in STUDENTS database
            let newstudent = {
                  ...studentdata,
                  appliedTopics:dummyappliedtopics,
                  finalApprove:{},
                  TeamNumber: -1
            }
            flag = 1
            // console.log(newstudent)
            await updatestudentbystudentId(newstudent.studentId, newstudent)   // update STUDENTS by studentId
            console.log("students update from disapprove")
          }

           //2)   change in ALLTOPICS database
                // change in final students
               if(flag) 
               {
                // Axios.post(`http://localhost:5000/alltopics/pullfinalStudent/`+ topic._id, studentdata._id ).then((res)=>console.log("alltopics student")).catch((err)=>console.log(err))
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
               Axios.post(`http://localhost:5000/alltopics/update/`+topic._id, newtopic).then((res)=>console.log("alltopics student")).catch((err)=>console.log(err))
              editloader(false)
              // console.log("alltopics update from disapprove")
               }

               setSelected([])
  }
  
  const handleApprove=()=>(selectedstudentId, index)=>{
    alert(selectedstudentId)
      let dummytopic = topic
     console.log("yes")
      // change in finalStudents
      dummytopic.finalStudents.push({ studentId:selectedstudentId, teamUp:false })

      // change in StudentsDetails
      for(let i=0;i<dummytopic.Studentsdetails.length;i++)
        {
                if(dummytopic.Studentsdetails[i].studentId===selectedstudentId)
                {
                    dummytopic.Studentsdetails[i].stage4 = true
                }
        }

        // finanly change in topics 
        let dummytopics = [...topics]
        dummytopics[indexoftopic] = dummytopic
        editTopic(dummytopics)
        console.log("success")

       

  }

  async function fetchstudentsbystudentId(studentId){
    editloader(true)
    let data = await Axios.get(`http://localhost:5000/student/getbystudentId/`+studentId).then(res=>res.data).catch(err=>console.log(err))
    // console.log(data)
    editloader(false)
    return data[0];
  }

  async function updatestudentbystudentId(studentId,data){
    editloader(true)
    Axios.post(`http://localhost:5000/student/updatebystudentId/`+studentId, data).then((res)=>console.log("student updated")).catch(err=>console.log(err))
    editloader(false)
  }

  const handlestage2=()=>{
      let dummytopic = topic

      // change in studentdetails
      selected.forEach((studentId)=>{
            dummytopic.Studentsdetails.forEach((studentdata)=>{
              if(studentdata.studentId===studentId)
                studentdata.stage2 = true
            })
      })

      // finanly change in topics 
      let dummytopics = [...topics]
      dummytopics[indexoftopic] = dummytopic
      editTopic(dummytopics)
      console.log("success")

      // DATABSE HAVE TO BE CHANGED :-  1) STUDENTS

      // 1) STUDENTS
            // change in appliedtopics  
      selected.forEach(async(studentId)=>{
          
            let studentdata =await fetchstudentsbystudentId(studentId)           // get data from STUDENT database by studentId
            let flag = 0;
            studentdata.appliedTopics.forEach((t)=>{
                               if(t.profobjId===profobjId)
                               {        
                                          console.log("YEs profId is same")   
                                         t.topics.forEach((tt,ind) => {
                                              if(tt.topicobjId===topic._id && tt.stage2===false)
                                              {
                                                  tt = {
                                                      ...tt,
                                                      stage2:true
                                                  }
                                                  console.log(tt)
                                                  console.log("yes topicobj id is same")
                                                  flag = 1;
                                              }
                                              t.topics[ind]=tt
                                        }); 
                                        


                               }

                                       
                                })
                         if(flag)       
                         await   updatestudentbystudentId(studentId,studentdata)     // update STUDENTS database
          })
          
      
      // change selcted
      setSelected([])

  }

  // console.log(topic)
  // const handlestage4=()=>{

  //   let dummytopic = topic

  //   // change in studentdetails
  //   selected.forEach((studentId)=>{
  //     // change in finalstudent
  //     let flag = 1
  //     dummytopic.finalStudents.forEach((student)=>{
  //             if(student.studentId===studentId)
  //             flag = 0
  //     })

  //       if(flag)
  //       {
  //           dummytopic.finalStudents.push({ studentId:studentId, teamUp:false, teamIndex:-1 })
  //           dummytopic.Studentsdetails.forEach((studentdata, ind)=>{
  //             if(studentdata.studentId===studentId && studentdata.stage4===false)
  //              {
  //                  studentdata.isapproved = true;
  //                  studentdata.finalApprove = { topicobjId:topic.topicobjId , profobjId  };
  //                  studentdata.stage4 = true;
                  
  //              }
  //           })

  //       }
  //   })

  //   // finanly change in topics 
  //   let dummytopics = [...topics]
  //   console.log(dummytopics)
  //   dummytopics[indexoftopic] = dummytopic
  //   editTopic(dummytopics)
    


  //       selected.forEach(async(studentId)=>{   
          
  //           let flag = 0
  //           let studentdata = await fetchstudentsbystudentId(studentId)       // get data from STUDENT database   by studentId
  //           // console.log(studentdata)
  //           //  DATABASE HAVETOBE CHANGED :-1) STUDENTS, 2)  ALLTOPICS

  //           // 1)     change in appliedtopic in STUDENTS data base
  //           if(!studentdata.finalApprove || studentdata.finalApprove==={} ) 
  //           {
            
  //           let dummyappliedtopics = [...studentdata.appliedTopics]
  //           for(let i=0;i<dummyappliedtopics.length;i++)
  //           {
  //                   if(dummyappliedtopics[i].profobjId===profobjId)
  //                   { 
  //                             for(let j=0;j<dummyappliedtopics[i].topics.length;j++)
  //                             {
  //                                         if(dummyappliedtopics[i].topics[j].topicobjId===topic._id)
  //                                         {
  //                                               let newvalue = dummyappliedtopics[i].topics[j];
  //                                               newvalue = {
  //                                                   ...newvalue,
  //                                                   stage4:true
  //                                               }

  //                                               dummyappliedtopics[i].topics[j] = newvalue
  //                                         }
  //                             }
  //                   }
  //           }

            
  //           // console.log(dummyappliedtopics)

  //           // change in finalApprove in STUDENTS database
  //           let newstudent = {
  //                 ...studentdata,
  //                 appliedTopics:dummyappliedtopics,
  //                 finalApprove:{
  //                     topicobjId:topic._id,
  //                     profobjId:profobjId
  //                 }
  //           }
  //           flag = 1;
  //           // console.log(newstudent)
  //           await updatestudentbystudentId(newstudent.studentId, newstudent)   // update STUDENTS by studentId
  //           console.log("students update from approve")
  //         }

  //           //2)   change in ALLTOPICS database
  //               // change in final students    
  //           if(flag)
  //           {
  //               let newfinalStudent = {
  //                 studentobjId_:studentdata._id,
  //                 studentId:studentdata.studentId,
  //                 teamUp:false,
  //                 teamIndex:-1
  //               } 
  //               // console.log("alltopic update from approve")
  //               editloader(true)
  //               Axios.post(`http://localhost:5000/alltopics/pushfinalStudent/`+ topic._id, newfinalStudent ).then((res)=>console.log("alltopics student")).catch((err)=>console.log(err))
  //               editloader(false)
  //           }



  //         })
  //           //
  //   // change selcted
  //   setSelected([])
  // }


  const handlestage4 = ()=>{
    
    selected.forEach(async(studentId)=>{  

      let flag = 0
      editloader(true)
      let studentdata = await fetchstudentsbystudentId(studentId)   

      if(!studentdata.finalApprove || studentdata.finalApprove==={})  flag = 1

      let dummytopic = topic
      console.log(topic);
      if(flag) 
      {
           
             
      
        
        
            dummytopic.finalStudents.push({ studentId:studentId, teamUp:false, teamIndex:-1 })
            dummytopic.Studentsdetails.forEach((studentdata, ind)=>{
              if(studentdata.studentId===studentId && studentdata.stage4===false)
               {
                   studentdata.isapproved = true;
                   studentdata.finalApprove = { topicobjId:topic.topicobjId , profobjId  };
                   studentdata.stage4 = true;
                  
               }
            })

            let dummytopics = [...topics]
            console.log(dummytopics)
            dummytopics[indexoftopic] = dummytopic
            editTopic(dummytopics)


            let dummyappliedtopics = [...studentdata.appliedTopics]
            for(let i=0;i<dummyappliedtopics.length;i++)
            {
                    if(dummyappliedtopics[i].profobjId===profobjId)
                    { 
                              for(let j=0;j<dummyappliedtopics[i].topics.length;j++)
                              {
                                          if(dummyappliedtopics[i].topics[j].topicobjId===topic._id)
                                          {
                                                let newvalue = dummyappliedtopics[i].topics[j];
                                                newvalue = {
                                                    ...newvalue,
                                                    stage4:true
                                                }

                                                dummyappliedtopics[i].topics[j] = newvalue
                                                console.log(dummyappliedtopics[i].topics[j]);
                                          }
                              }
                    }
            }

             // change in finalApprove in STUDENTS database
             let newstudent = {
              ...studentdata,
              appliedTopics:dummyappliedtopics,
              finalApprove:{
                  topicobjId:topic._id,
                  profobjId:profobjId
                    }
              }
              
              // console.log(newstudent)
              await updatestudentbystudentId(newstudent.studentId, newstudent)   // update STUDENTS by studentId
              console.log("students update from approve")


              //2)   change in ALLTOPICS database
                // change in final students    
            
                let newfinalStudent = {
                  studentobjId_:studentdata._id,
                  studentId:studentdata.studentId,
                  teamUp:false,
                  teamIndex:-1
                } 
                // console.log("alltopic update from approve")
               
                Axios.post(`http://localhost:5000/alltopics/pushfinalStudent/`+ topic._id, newfinalStudent ).then((res)=>console.log("alltopics student")).catch((err)=>console.log(err))
               
              }
    })

    editloader(false) 
    setSelected([])
  }
  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} order={order} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              offeredCourses={offeredCourses}
              professorCourses={professorCourses}
              topic={topic}
              setrows={setrows}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.studentId);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.studentId)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.studentId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align='center'
                      >
                        {row.studentId}
                      </TableCell>
                      { courseheadcell.map((cell,index)=> (<TableCell id={labelId}  component="th"  align="center">{row[index]}</TableCell>)) }
                      <TableCell id={labelId}  component="th"  align="center">{row.stage2?1:0}</TableCell>
                      <TableCell id={labelId}  component="th"  align="center">{row.stage3?1:0}</TableCell>
                      <TableCell  align="center" >

                        {  row.isapproved ? ( row.isthisprof ?  (<Button id="disapprove" onClick={()=>handleDisapprove(row.studentId, index)}>
                                    <span id="buttondisapprove">DisApprove</span>
                              </Button>) : (<Button id="disapprove" >
                              <span id="buttondisapprove">already done</span>
                                </Button>)):  (<Button id="approve" disabled={row.forstage4}  >
                                    <span id="buttonapprove">Approve</span>
                              </Button>) }

                        {/* {row.stage4 ? row.isthisprof ?
                              (<Button id="disapprove" onClick={()=>handleDisapprove(row.studentId, index)}>
                                    <span id="buttondisapprove">DisApprove</span>
                              </Button>): 
                              (<Button id="disapprove" >
                              <span id="buttondisapprove">already done</span>
                                </Button>):
                              (<Button id="approve" disabled={row.forstage4}  >
                                    <span id="buttonapprove">Approve</span>
                              </Button>)
                        } */}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Box display="flex" >
      <Box ml={2} mb={2} >
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handlestage2}
            >
            Approve students (Stage-2)
            </Button>
      </Box>
      <Box  mb={2} ml='auto' mr={2}  alignItems="right">
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handlestage4}   
              
            >
            Final approve (stage-4)
            </Button>
      </Box>
      </Box>
    </div>
  );
}
