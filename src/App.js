import './App.css';
import {Routes, Route, useNavigate, NavLink} from "react-router-dom";
import {useState} from "react";
import Home from "./components/home";

import Login from "./components/login";
import ListSemesters from "./semester/list_semester";
import ListCourses from "./course/list_course";


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
                        <NavLink to={'semesters'} className={'nav-link'} aria-current={'page'}>Semesters</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'courses'} className={'nav-link'} aria-current={'page'}>Courses</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'lecturers'} className={'nav-link'} aria-current={'page'}>Lecturers</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'students'} className={'nav-link'} aria-current={'page'}>Students</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'classes'} className={'nav-link'} aria-current={'page'}>Classes</NavLink>
                      </li></div>
                  )
                } else if (localStorage.getItem("token") && permission !== 'admin') {
                  return (
                      <li className={'nav-item'}>
                        <NavLink to={'attendance'} className={'nav-link'} aria-current={'page'}>Attendance</NavLink>
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
        <Route path={'courses'} element={<ListCourses />}></Route>

      </Routes>
    </div>
  );
}

export default App;
