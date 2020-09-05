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


function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

export const check_p_a_s=(s)=>{

            let newstring1  = s.trim()
            let newstring2  = s.trim().substring(0,9)
            let newstring3 = s.trim().substring(s.length-13)
            if(newstring3!=="@daiict.ac.in")
            {
                    return "Invalid"
            }
            else
            if(newstring1 ==='Admin@daiict.ac.in')
            {
                                return  "Admin"
            }
            else if( isNumeric(newstring2) )
            {
                                return "Student"
            }
            else if(newstring1==="main")
            {
                    return "main"
            }
            else
            return "Prof"


}



