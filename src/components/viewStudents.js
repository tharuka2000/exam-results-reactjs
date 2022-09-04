import React, { useContext } from 'react'
import { ResultsContext } from '../context/results-context'
const  ViewStudents=()=> {
    
    
    const contextValues = useContext(ResultsContext)
    const student =contextValues.students.map((stu)=>

    {
        return(<tr key={stu.id}>
            <td>{stu.name}</td>
            <td>{stu.phone}</td>
            <td>{stu.id}</td>
        </tr>)
    }
    )
  return (
    <table class="table">
        <thead class="table-dark">
        <tr>
                    
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Student ID</th>
        </tr>
        </thead>
        <tbody>
            {student}
        </tbody>
    </table>
  )
}

export default ViewStudents