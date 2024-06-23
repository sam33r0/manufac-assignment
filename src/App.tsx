import React, { useEffect, useState } from 'react';
import './App.css';
import TableYear from './Components/TableYear';
import TableCrop from './Components/TableCrop';
import '@mantine/core/styles.css';
import TableViewer from './Components/TableViewer/TableViewer';

function App() {
  // const [ymap, setYmap] = useState({});
  // const [crmap, setCrmap] = useState({});

  const [data, setData]=useState([])
  useEffect(() => {
    fetch('./Manufac_India_Agro_Dataset.json')
      .then(response => response.json())
      .then(data => {
        // const { yearMap, cropMap } = processData(data);
        // setYmap(yearMap);
        // setCrmap(cropMap);
        setData(data);
      })
      .catch(err => {
        console.error("Error reading data", err);
      });
  }, []);

  // const processData = (data: Array<any>) => {
  //   let cropMap = {};
  //   let yearMap = {};
  //   let op = 0;
  //   let yr = 1950;
  //   let minProd = Number.MAX_VALUE;
  //   let minProdCrop = "";
  //   let maxProdCrop = "";
  //   let maxProd = Number.MIN_VALUE;

  //   data.forEach((elem, ind) => {
  //     const index = Math.floor(ind / 13);

  //     if (!cropMap[elem["Crop Name"]]) {
  //       cropMap[elem["Crop Name"]] = { ArC: 0, YlD: 0, n: 0 };
  //     }

  //     const areaUnderCultivation = parseFloat(elem["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;
  //     const yieldOfCrops = parseFloat(elem["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;

  //     cropMap[elem["Crop Name"]].ArC += areaUnderCultivation;
  //     cropMap[elem["Crop Name"]].YlD += yieldOfCrops;
  //     cropMap[elem["Crop Name"]].n += 1;

  //     if (index !== op) {
  //       yearMap[yr].push({ maxProd: maxProdCrop, minProd: minProdCrop });
  //       op++;
  //       yr++;
  //       maxProd = Number.MIN_VALUE;
  //       minProd = Number.MAX_VALUE;
  //       maxProdCrop = "";
  //       minProdCrop = "";
  //     }

  //     if (!yearMap[yr]) {
  //       yearMap[yr] = [];
  //     }

  //     const cropProduction = parseFloat(elem["Crop Production (UOM:t(Tonnes))"]) || 0;
  //     yearMap[yr].push({
  //       name: elem["Crop Name"],
  //       prod: cropProduction,
  //       area: areaUnderCultivation,
  //       yield: yieldOfCrops,
  //     });

  //     if (cropProduction > maxProd) {
  //       maxProdCrop = elem["Crop Name"];
  //       maxProd = cropProduction;
  //     }

  //     if (cropProduction < minProd) {
  //       minProdCrop = elem["Crop Name"];
  //       minProd = cropProduction;
  //     }
  //   });

  //   yearMap[yr]?.push({ maxProd: maxProdCrop, minProd: minProdCrop });

  //   return { yearMap, cropMap };
  // };

  return (
   <TableViewer data={data}/>
  );
}

export default App;
