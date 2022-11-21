import React, {useState} from 'react';
import axios from "axios";
import {BaseURL} from "../components/constants";
import {Link, useNavigate} from "react-router-dom";

function UploadFile(props) {
  const [file, setFile] = useState()
     const navigate = useNavigate()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

    function handleSubmit(event) {
    event.preventDefault()
    const url = BaseURL +'upload/';
    const formData = new FormData();
    formData.append('myfile', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
            'content-type': 'multipart/form-data',
          Authorization: "Token "+localStorage.getItem("token")
      },
    };
    axios.post(url, formData, config).then((response) => {

      console.log(response.data);
          if(response.data.status == "ok") {
              navigate('/students')
          } else {
              alert("Cannot upload file !")
          }
    });

  }

    return (

            <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Upload Student From File</h1>
            <form onSubmit={handleSubmit}>

          <input type="file" onChange={handleChange}/>
          <button class="btn btn-sm btn-primary" type="submit">Upload</button>
                 <Link to={'/students'} className={'btn btn-sm btn-danger'}>Cancel</Link>
        </form>

            </div>


    );
}

export default UploadFile;