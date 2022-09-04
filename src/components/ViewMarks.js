import React, { useContext } from 'react'
import { ResultsContext } from '../context/results-context'

export default function ViewMarks() {
    const contextValues = useContext(ResultsContext);

    const marks = contextValues.marks.map((studentmarks)=>(studentmarks.results.map((subject)=>
            <tr key={studentmarks.studentId.concat(subject.subject)}>
                
                <td>{studentmarks.name}</td>
                <td>{subject.subject}</td>
                <td>{subject.mark}</td>
                <td>{studentmarks.studentId}</td>
            </tr>

        )   
        ));

  return (
    <table className="table">
        <thead className="table-dark">
        <tr>
                    
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Mark</th>
                    <th>Student ID</th>
        </tr>
        </thead>
        <tbody>
            {marks}
        </tbody>
    </table>
  )
}
