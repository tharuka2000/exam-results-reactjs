import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddStudent from "./components/AddStudent";
import AddMarks from "./components/AddMarks";

import { ResultsContext } from "./context/results-context";
import {firestore, studentsRef,marksRef} from "./firebaseConfig/firebase-config";

import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import ViewStudents from "./components/viewStudents";

function App() {
  //----------------------------------------

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    // const firebaseConfig = {
    //   apiKey: "AIzaSyBXkgmT9YUQGdGDu2pepISz6gfM69kDNDg",
    //   authDomain: "exam-results-2022.firebaseapp.com",
    //   projectId: "exam-results-2022",
    //   storageBucket: "exam-results-2022.appspot.com",
    //   messagingSenderId: "29544111168",
    //   appId: "1:29544111168:web:4665c57a7360f0f067d3a5",
    //   measurementId: "G-D4K8Y79LTS",
    // };

    // // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);

    // const firestore = getFirestore();
    // const studentsRef = collection(firestore, "students");
    // const marksRef = collection(firestore, "marks");







  //----------------------------------------

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);

  const getStudentsFromdb = async () => {
    try {
      await onSnapshot(studentsRef, (snapShot) => {
        let studentArray = [];
        snapShot.docs.forEach((doc) => {
          studentArray.push({ ...doc.data(), id: doc.id });
        });
        //console.log(students)
        setStudents((prev) => {
          return studentArray;
        });
      });
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };
  //Update the student if exist in the DB or create a new student if doen't exist
  const addStudent = async (newName, newPhone) => {
    const student = {
      name: newName,
      phone: newPhone,
    };
    try {
      await addDoc(studentsRef, student);
    } catch (error) {
      console.log(error);
    }
  };

  const getMarksFromdb = async () => {
    try {
      await onSnapshot(marksRef, (snapShot) => {
        let marksArray = [];
          snapShot.docs.forEach(async (docu) => {
          //marksArray.push({ ...doc.data(), id: doc.id });
          
          const a = doc(firestore, "students",docu.data().studentId);
          
            await getDoc(a)
           .then((stuDoc)=>{
            let c ={ ...docu.data(), id: docu.id , name : stuDoc.data().name}
            marksArray.push({ ...docu.data(), id: docu.id , name : stuDoc.data().name});
            // setMarks((prev)=>
            // {
            //   return [...prev,c]
            // })
           
           })
           
           setMarks((prev)=>
            {
              return marksArray
            })
          
          
        })
        
      }
       
        
       
      );
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };
  
  

  const addMarks = async (studentResultsObjact)=>{
      try{
          await addDoc(marksRef,studentResultsObjact);
      }
      catch(error){
        console.log(error);
      }
  }

  const updateMarks = async(marksId,resultsObj)=>{
    const marksRefs = doc(firestore, "marks",marksId);
      try{
        await updateDoc(marksRefs,resultsObj).then((doc)=>{console.log("complete")})
        
      }
      catch(error){
        console.log(error)
      }   
  }



 
  

  useEffect(() => {
    getStudentsFromdb();
    getMarksFromdb();
  }, []);

  // useEffect(() => {
  //   if (students.length != 0) {
  //     console.log(students);
  //     console.log(marks);
      
      
      
  //   }
  // }, [students]);

  

  return (
    <ResultsContext.Provider
      value={{ students: students, addStudentTodb: addStudent ,
         marks : marks,
        updateMarksOndb : updateMarks,
        addMarksTodb : addMarks
      }}
    >
      <BrowserRouter>
        {/* <button onClick={()=>{testM()}}>push</button> */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addStudent" element={<AddStudent />}></Route>
          <Route path="/addMarks" element={<AddMarks />}></Route>
          <Route path="/viewStudents" element={<ViewStudents/>}></Route>
        </Routes>
      </BrowserRouter>
    </ResultsContext.Provider>
  );
}

export default App;


// value={{ students: students, addStudentTodb: addStudent , marks : [
//   {
//        studentId : "T3eK7kC9FTFK7GplxlJG",
//        results : [{subject : "Maths",mark : "10"},
//                   {subject : "English",mark : "20"} 
//                   ]
//   }] }}