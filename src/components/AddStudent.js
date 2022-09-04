import { useContext, useState } from "react";
import {ResultsContext} from "../context/results-context";
import 'bootstrap/dist/css/bootstrap.min.css'
import ViewStudents from "./viewStudents";
const AddStudent=()=>{
        const contextValues = useContext(ResultsContext);
        const [name, setName] = useState("");
        const[phone, SetPhone] = useState(0);
        // const students = [{name:"John", phone:"213",id :"01"},
        //                 {name:"tharuka", phone:"123",id :"02"},
        //                 {name:"Katy", phone:"321",id :"03"}]
           
        const addStudent=()=>{
                if(name =="" || phone == 0){
                   alert(" Input valid student details")
                }
                else 
                {
                    contextValues.addStudentTodb(name,phone);
                    console.log("name: "+name+"       phone: "+phone)
                }
               
        }
        const student =contextValues.students.map((stu)=>

                {
                    return(<tr key={stu.id}>
                        <td>{stu.name}</td>
                        <td>{stu.phone}</td>
                        <td>{stu.id}</td>
                    </tr>)
                }
                )
        
    return(
        <div>
            
            <div className="m-auto mt-4" style={{ width: '300Px' }}>
            <form >
                <div className="mb-3">
                    <label for="studentName" className="form-label">Student Name</label>
                    <input type="text" className ="form-control studentName" onChange={(event)=>{setName(event.target.value)}}></input>
                    
                </div>
                <div class="mb-3">
                    <label  className="form-label">Phone</label>

                    <input type="number" className="form-control" onChange={(event)=>{SetPhone(event.target.value)}} ></input>
                </div>
               
            </form>
            <button onClick={addStudent} class="btn btn-primary">Add Student</button>
            </div>

            <div className="m-auto mt-5" style={{ width: '80%' }}>
                <ViewStudents/>
            </div>
               
            
            
            

        </div>
    );
    
}

export default AddStudent;