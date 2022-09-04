import { useContext, useState } from "react";
import { ResultsContext } from "../context/results-context";

const AddMarks = ()=>{
    const marksa = [{name:"John", mark:"213",subject :'eng'},
    {name:"tharuka", mark:"123",subject :'eng'},
    {name:"Katy", mark:"321",subject :'eng'}]
    
    const constextValues = useContext(ResultsContext); 
    const [studentId, setStudentId] =useState("");
    const [subject, setSubject] = useState("");
    const[mark, setMark] =useState(0);
    const[students ,setStudents] = useState(constextValues.students);
    const[marks, setMarks] = useState(constextValues.marks);

    const markss = marks.map((studentmarks)=>(studentmarks.results.map((subject)=>
            <tr key={mark.id}>
                
                <td>{studentmarks.studentId}</td>
                <td>{subject.subject}</td>
                <td>{subject.mark}</td>
            </tr>
        )   
        ));

    const addMarks=()=>{
        console.log("Check registry "+studentId);
        let student = {}
        let isRegistered =false;

        let isAlreadyMarked = false;
        let tempstudentMarks = {}
        let tempResults = {}

        students.forEach((stu) =>{
             if(stu.id == studentId){
                    isRegistered = true;
                    student = stu
                    console.log(isRegistered);
            }

           })
           console.log(isRegistered)

        marks.forEach((studentMarks)=>{
            console.log(studentMarks.id)
            if(studentMarks.studentId == studentId){
                isAlreadyMarked =true;
                tempstudentMarks =studentMarks;
                tempResults=studentMarks.results
            }
        })
        if(isRegistered && subject != "" && isAlreadyMarked ){
            console.log("update")
            console.log(student)
            const updateResults = {
                
            }

            let isSubjectFound =false;
            tempResults.forEach((subjectObj)=>{
                
                if(subject.toLowerCase() == subjectObj.subject.toLowerCase()){
                    console.log("Greate works damn son")
                    console.log(mark)
                    subjectObj.mark = mark;
                    isSubjectFound = true;
                }
            })
            if(isSubjectFound){
            //input tempResults ass a parameter to update funstion
            console.log("Not pushed "+isAlreadyMarked)
            console.log(tempResults)

            }
            else{
            //input tempResults ass a parameter to update funstion

                tempResults.push({subject : subject , mark : mark})
                console.log("pushed "+isAlreadyMarked)
                console.log(tempResults)    

                
            }

        }
        else if(isRegistered && subject != "" && !isAlreadyMarked){
            console.log("totally new")
            const studentResutlsObj = {
                studentId : studentId,
                results : [{subject : subject,mark : mark} 
                           ]
           }
           console.log(studentResutlsObj);
        }
            
         
    }
    
    return(
        <div>
            <form>
                <label >Student ID</label>
                <input type='text' placeholder={studentId} onChange={(event)=>{setStudentId(event.target.value)}}></input>
                <br></br>
                <label >Subject</label>
                <input type='text'onChange={(event)=>{setSubject(event.target.value)}}></input>
                <br></br>
                <label>marks</label>
                <input type='number' min='0' max='100' placeholder="0" onChange={(event)=>{setMark(event.target.value)}}></input>
                <br></br>
                
            </form>
                <button onClick={addMarks} >Add marks</button>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Subject</th>
                        <th>Mark</th>
                    </tr>
                </thead>
                <tbody>
                {markss}
                </tbody>
                
            </table>
        </div>
    );
}

export default AddMarks;