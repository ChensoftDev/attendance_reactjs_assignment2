import React from 'react';
import {Link} from "react-router-dom";

function ListAttendance(props) {
    return (
               <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Attendance</h1>
            <table className={'table table-striped table-dark'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Name</th>
                        <th scope={'col'}>Code</th>
                        <th><Link to={'create'} className={'btn btn-sm btn-primary'} style={{float: "right", width: "168px"}}>Create Course</Link></th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    );
}

export default ListAttendance;