import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch('./Manufac _ India_Agro_Dataset.json')
      .then(response => {
        return response.json();
      }).then(data => {
        setData(data);
        console.log(data);
      }).catch(err => {
        console.log("Error Reading data " + err);
      });
  }, [])
  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
