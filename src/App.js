import './App.css';
import {Routes, Route, useNavigate, NavLink} from "react-router-dom";
import {useState} from "react";
import Home from "./components/home";

import Login from "./components/login";
import ListSemesters from "./semester/list_semester";
import ListCourses from "./course/list_course";
import ListLecturer from "./lecturer/list_lecturer";
import ListStudent from "./student/list_student";
import ListClass from "./class/list_class";
import DelSemester from "./semester/del_semester";
import UpdateSemester from "./semester/update_semester";
import DelCourse from "./course/del_course";
import CreateSemester from "./semester/create_semester";
import CreateCourse from "./course/create_course";
import DelLecturer from "./lecturer/del_lecturer";
import CreateLecturer from "./lecturer/create_lecturer";
import UpdateCourse from "./course/update_course";
import UpdateLecturer from "./lecturer/update_lecturer";
import DeleteStudent from "./student/del_student";
import UpdateStudent from "./student/update_student";
import CreateStudent from "./student/create_student";
import DeleteClass from "./class/del_class";
import CreateClass from "./class/create_class";
import ListAttendance from "./attendance/list_attendance";
import UpdateClass from "./class/update_class";
import AssignLecturer from "./lecturer/assign";






function App() {
  const permission = localStorage.getItem("group")
  const username = localStorage.getItem("username")
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("group")
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className={'container-fluid'}>
          <NavLink to={"/"} className={'navbar-brand'}>Attendance System</NavLink>
          <button className={'navbar-toggler'} type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className={'navbar-toggler-icon'}></span>
          </button>
          <div className={'collapse navbar-collapse'} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {
              (() => {
                if(localStorage.getItem("token") && permission === 'admin') {
                  return(<div style={{display: "flex"}}>
                        <li className={'nav-item'}>
                        <NavLink to={'students'} className={'nav-link'} aria-current={'page'}>Students</NavLink>
                      </li>
                        <li className={'nav-item'}>
                        <NavLink to={'lecturers'} className={'nav-link'} aria-current={'page'}>Lecturers</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'semesters'} className={'nav-link'} aria-current={'page'}>Semesters</NavLink>
                      </li>
                        <li className={'nav-item'}>
                        <NavLink to={'classes'} className={'nav-link'} aria-current={'page'}>Classes</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'courses'} className={'nav-link'} aria-current={'page'}>Courses</NavLink>
                      </li>
                      </div>
                  )
                } else if (localStorage.getItem("token") && permission !== 'admin') {
                  return (
                      <li className={'nav-item'}>
                        <NavLink to={'classes'} className={'nav-link'} aria-current={'page'}>My Class</NavLink>
                      </li>
                  )
                }
              })()
            }
            </ul>
            <ul className={'navbar-nav ml-auto'}>
              {
                localStorage.getItem("token") ? <div style={{display: "flex"}}><li className="nav-item">
                      <div className={'nav-link'}>{username} -</div>
                    </li>
                    <li className={'nav-item'}>
                      <button className={'nav-link btn btn-danger'} style={{color: "white"}} aria-current={"page"} onClick={logout}>Logout</button>
                    </li></div> : <li className={'nav-item'}>
                <NavLink to={'login'} className={'nav-link btn btn-success'} style={{color: "white"}} aria-current={'page'}>Login</NavLink>
              </li>
              }
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path={'/'} element={<Home />}></Route>
        <Route path={'login'} element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
        <Route path={'semesters'} element={<ListSemesters />}></Route>
        <Route path={'semesters/del'} element={<DelSemester />}></Route>
        <Route path={'semesters/update'} element={<UpdateSemester />}></Route>
        <Route path={'semesters/create'} element={<CreateSemester />}></Route>
        <Route path={'courses'} element={<ListCourses />}></Route>
        <Route path={'courses/create'} element={<CreateCourse />}></Route>
        <Route path={'courses/del'} element={<DelCourse />}></Route>
        <Route path={'courses/update'} element={<UpdateCourse />}></Route>
        <Route path={'lecturers'} element={<ListLecturer />}></Route>
        <Route path={'lecturers/del'} element={<DelLecturer />}></Route>
        <Route path={'lecturers/create'} element={<CreateLecturer />}></Route>
        <Route path={'lecturers/update'} element={<UpdateLecturer />}></Route>
        <Route path={'students'} element={<ListStudent />}></Route>
        <Route path={'students/del'} element={<DeleteStudent />}></Route>
        <Route path={'students/create'} element={<CreateStudent />}></Route>
        <Route path={'students/update'} element={<UpdateStudent />}></Route>
        <Route path={'classes'} element={<ListClass />}></Route>
        <Route path={'classes/del'} element={<DeleteClass />}></Route>
        <Route path={'classes/create'} element={<CreateClass />}></Route>
        <Route path={'classes/Update'} element={<UpdateClass />}></Route>
        <Route path={'attendance/list_attendance'} element={<ListAttendance />}></Route>
        <Route path={'classes/assign'} element={<AssignLecturer />}></Route>
      </Routes>
    </div>
  );
}

export default App;
