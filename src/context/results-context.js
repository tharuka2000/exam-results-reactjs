import React, { createContext } from "react";



export const ResultsContext =createContext(
    {
            students : [
        {name :"tharuka",
         phone :"012321",
        id: "2zggHQYIn99tSAihMoit"}
    ],
    marks : [
        {
             studentId : "T3eK7kC9FTFK7GplxlJG",
             results : [{subject : "Maths",mark : "10"},
                        {subject : "English",mark : "20"} 
                        ]
        }],
    addStudentTodb : ()=>{},
    addMarksTodb : ()=>{},

    updateMarksOndb : ()=>{},

    getStudentsFromdb : ()=>{},
    getMarksFromdb: ()=>{},
    getStudentMark: ()=>{},
    }
)
