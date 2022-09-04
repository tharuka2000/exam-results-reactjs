import { useContext, useEffect, useState } from "react";
import { ResultsContext } from "../context/results-context";
import ViewMarks from "./ViewMarks";

const AddMarks = ()=>{
    const marksa = [{name:"John", mark:"213",subject :'eng'},
    {name:"tharuka", mark:"123",subject :'eng'},
    {name:"Katy", mark:"321",subject :'eng'}]
    
    const constextValues = useContext(ResultsContext); 
    const [studentId, setStudentId] =useState("");
    const [subject, setSubject] = useState("");
    const[mark, setMark] =useState(0);
    const[students ,setStudents] = useState(constextValues.students);
    const[marks, setMarks] = useState([]);

    const markss = marks.map((studentmarks)=>(studentmarks.results.map((subject)=>
            <tr key={studentmarks.studentId}>
                
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
        
        if(isRegistered && subject != "" && isAlreadyMarked && (0<=mark && mark<101) ){
            console.log("update")
            
            let updateResults = {
                
            }
           // constextValues.updateMarksOndb(student.id,updateResults)

            let isSubjectFound =false;
            tempResults.forEach((subjectObj)=>{
                
                if(subject.toLowerCase() == subjectObj.subject.toLowerCase()){
                    
                    subjectObj.mark = mark;
                    isSubjectFound = true;
                }
            })
            if(isSubjectFound){
            //input tempResults as a parameter to update funstion
           
            console.log(tempResults)
            updateResults = { results :tempResults}
            constextValues.updateMarksOndb(tempstudentMarks.id,updateResults);

            }
            else{
            //input tempResults as a parameter to update funstion

                tempResults.push({subject : subject , mark : mark})
                console.log( tempstudentMarks.id)
                updateResults = {results : tempResults}
                constextValues.updateMarksOndb(tempstudentMarks.id,updateResults);    

                
            }

        }
        else if(isRegistered && subject != "" && !isAlreadyMarked){
            console.log("totally new")
            const studentResutlsObj = {
                studentId : studentId,
                results : [{subject : subject,mark : mark} 
                           ]
           }
           //console.log(studentResutlsObj);
           console.log(studentResutlsObj)
           constextValues.addMarksTodb(studentResutlsObj);
        }
        else if(!isRegistered ){
            console.log(isRegistered)
            alert("Student is not registered in the databased");
        }
        else{
            alert("COMPLETE !!\n"+
                    "Type a subject\n"+
                    "Input Marks between 0 - 100")
        }
            
        
         
    }
    useEffect(()=>{
       setMarks(constextValues.marks);
    
    },[constextValues.marks])
    useEffect(()=>{
        setStudents(constextValues.students);
    },[constextValues.students])
    return(
        <div>
            
                <div className="m-auto mt-4" style={{ width: '300Px' }}>
                    <form >
                        <div className="mb-3">
                            <label  className="form-label">Student ID</label>
                            <input type="text" className ="form-control "  onChange={(event)=>{setStudentId(event.target.value)}}></input>
                            
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Subject</label>

                            <input type="text" className ="form-control " onChange={(event)=>{setSubject(event.target.value)}} ></input>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Marks</label>

                            <input type="number" min='0' max='100' placeholder="0" className="form-control" onChange={(event)=>{setMark(event.target.value)}} ></input>
                        </div>
                    
                    </form>
            <button  className="btn btn-primary" onClick={addMarks}>Save Marks</button>
            </div>
            
            <div className="m-auto mt-5" style={{ width: '80%' }}>
                <ViewMarks/>
            </div>
            
        </div>
    );
}

export default AddMarks;