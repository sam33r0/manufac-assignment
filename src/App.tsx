import React, { useEffect, useState } from 'react';
import './App.css';
import '@mantine/core/styles.css';
import TableViewer from './Components/TableViewer/TableViewer';

function App() {
  // State to hold the data from the JSON file
  const [data, setData] = useState([]);

  // Fetch data from JSON file on component mount
  useEffect(() => {
    fetch('./Manufac_India_Agro_Dataset.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(err => {
        console.error("Error reading data", err);
      });
  }, []);
 
  return (
    // Render the TableViewer component with the fetched data
    <TableViewer data={data}/>
  );
}

export default App;
