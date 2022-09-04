import { Link } from "react-router-dom";
const Home =()=>{

    return(
    <div className="m-auto m-4">
      <h1>Exam results Web App</h1>
      <span className="m-4">
        <Link to='/addStudent'>
        <button type="button" className="btn btn-dark ">Add Students</button>
      </Link>
      </span>
      <span className="m-4">
        <Link to='/addMarks'>
        <button type="button" className="btn btn-dark">Add Marks</button>
      </Link>
      </span>
      <span className="m-4">
        <Link to='/viewStudents'>
        <button type="button" className="btn btn-dark">View Students</button>
      </Link>
      </span>
      
      
    </div>
    );
}

export default Home;