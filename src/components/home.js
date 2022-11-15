import React from 'react';

function Home(props) {
    return (
        <div>
            {
                localStorage.getItem("token") ? <h3 className={'display-3'}>Welcome to Attendance System</h3> : <h3 className={'display-3'}>Please Login!</h3>
            }
        </div>
    );
}

export default Home;