import './App.css';
import Form from './Form'
import React, { useEffect, useState } from "react";
import axios from "./axios";

function App() {
  const [data, setData] = useState();
  const [userId, setUserId] = useState("0c3151bd-1cbf-4d64-b04d-cd9187a4c6e0");  //hardcoding for now since we only have 1 id
  useEffect(() => {
    const url = "data/" + userId;
    axios.get(url).then((response)=>{
      setData(response.data);
    })
  }, [userId]);
  return (
    <div className="App">
        <h1 className="pink">
          Feedback Form
        </h1>
      <Form data={data}/>
    </div>
  );
}

export default App;
