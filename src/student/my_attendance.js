import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseURL} from "../components/constants";

function MyAttendance(props) {
    const [ attendanceData, setAttendanceData] = useState([]);
    const [ classData, setclassData] = useState([]);
    const myid = localStorage.getItem("myid")

               useEffect(  () => {
                    axios.get(BaseURL +'attendance/',{
                    headers: {
                        Authorization: "Token "+localStorage.getItem("token")
                    }
                    }).then(response => {
                        setAttendanceData(response.data)


                        //attendanceDispatch({type: 'success', payload: response.data});
                    }).catch(error => {
                        //attendanceDispatch({type: 'error'});
                        console.log(error);
                    })

                   axios.get(BaseURL +'class/',{
                    headers: {
                        Authorization: "Token "+localStorage.getItem("token")
                    }
                    }).then(response => {
                        setclassData(response.data)
                        //attendanceDispatch({type: 'success', payload: response.data});
                    }).catch(error => {
                        //attendanceDispatch({type: 'error'});
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

                }

                {




                        attendanceData && attendanceData.filter(att => att.studentID === myid).map(myatt => {
console.log(myatt.studentID)
                        return(

                            <tr>
<td>{myatt.studentID}</td>



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