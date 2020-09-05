import axios from "axios"
export const  formatDate=(date)=>{
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
export const getcourseheadcell=(offeredCourses)=>{
    let dummyheadcell = []

            let ind = 0;
            offeredCourses.forEach(course=>{
                    if(course.isSelected)
                    {
                            dummyheadcell.push({
                                id:ind,
                                numeric:true,
                                disablePadding: false,
                                label: course.courseName
                            })
                            ind = ind+1;
                    }
            })
    

    return dummyheadcell
}
export const gettopicname=(str)=>(str.substring(0,str.search("team")-2))
export const getteamindex=(str)=>(str[str.search("-")+1]-1)  


export const updateProf=(professorCourses,emailId,professorName,topicobj,profobjId)=>{
      
    let newvalue = {
      professorCourses,
      emailId,
      professorName,
      topics:topicobj,

  }
    console.log(newvalue)
    axios.post(`http://localhost:5000/professor/update/`+profobjId, newvalue).then(()=>console.log("yes Professor updated in data base")).
    catch(err=>console.log(err));
  }



