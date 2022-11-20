import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseURL} from "../components/constants";

function MyAttendance(props) {
    const [ attendanceData, setAttendanceData] = useState([]);
    const myid = localStorage.getItem("myid")

               useEffect(  () => {
                    axios.get(BaseURL +'attendance_details/?studentid=' + myid,{
                    headers: {
                        Authorization: "Token "+localStorage.getItem("token")
                    }
                    }).then(response => {
                        setAttendanceData(response.data)
                    }).catch(error => {
                        console.log(error);
                    })

            },[]);

            return (
               <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Attendance</h1>

            <table className={'table table-striped table-dark'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Date</th>
                        <th scope={'col'}>Class</th>
                        <th scope={'col'}>Status</th>
                    </tr>
                </thead>
                <tbody>
                {
                        attendanceData && attendanceData.map(myatt => {
                        return(

                            <tr>
                                <td>{myatt.date}</td>
                                <td>{myatt.class}</td>
                                <td>{myatt.status ? <button type={'button'} className={'btn btn-sm btn-success'} >Present</button> : <button type={'button'} className={'btn btn-sm btn-danger'} >Absent</button>}</td>
                            </tr>
                        )
                    })
                }




                </tbody>
            </table>
        </div>
    );

}

export default MyAttendance;