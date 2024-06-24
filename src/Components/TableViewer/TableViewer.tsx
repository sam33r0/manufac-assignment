import React, { useEffect, useState } from 'react';
import TableCrop from '../TableCrop';
import TableYear from '../TableYear';

// Define interfaces for the data structure
interface CrmapInter {
  n: number; // Number of entries for the crop
  areaUnderCult: number; // Total area under cultivation for the crop
  yieldOfCrop: number; // Total yield of the crop
}

interface YmapInter {
  name: string; // Name of the crop
  prod: number; // Production of the crop in tonnes
  area: number; // Area under cultivation for the crop
  yield: number; // Yield of the crop in Kg/Ha
}

function TableViewer({ data }: { data: Array<any> }) {
  // State to hold year-wise processed data
  const [ymap, setYmap] = useState<{ [key: number]: YmapInter[] }>({});
  // State to hold crop-wise processed data
  const [crmap, setCrmap] = useState<{ [key: string]: CrmapInter }>({});

  // Function to process the input data
  const processData = (data: Array<any>) => {
    let cropMap: { [key: string]: CrmapInter } = {}; 
    let yearMap: { [key: number]: YmapInter[] } = {}; 
    let op = 0; 
    let yr = 1950; 
    let minProd = Number.MAX_VALUE; 
    let minProdCrop = ""; 
    let maxProdCrop = ""; 
    let maxProd = Number.MIN_VALUE; 

    // Iterate over the data to populate cropMap and yearMap
    data.forEach((elem, ind) => {
      const index = Math.floor(ind / 13); // Determine the year index

      // If crop is not already in cropMap, initialize it
      if (!cropMap[elem["Crop Name"]]) {
        cropMap[elem["Crop Name"]] = { areaUnderCult: 0, yieldOfCrop: 0, n: 0 };
      }

      // Parse area under cultivation and yield of crops
      const areaUnderCultivation = parseFloat(elem["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;
      const yieldOfCrops = parseFloat(elem["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;

      // Update cropMap with the parsed values
      cropMap[elem["Crop Name"]].areaUnderCult += areaUnderCultivation;
      cropMap[elem["Crop Name"]].yieldOfCrop += yieldOfCrops;
      cropMap[elem["Crop Name"]].n += 1;

      // If we have moved to the next year (batch of 13 entries), update yearMap and reset variables
      if (index !== op) {
        yearMap[yr].push({ name: maxProdCrop, prod: maxProd, area: 0, yield: 0 }); // Add crop with max production for the year
        yearMap[yr].push({ name: minProdCrop, prod: minProd, area: 0, yield: 0 }); // Add crop with min production for the year
        op++;
        yr++;
        maxProd = Number.MIN_VALUE;
        minProd = Number.MAX_VALUE;
        maxProdCrop = "";
        minProdCrop = "";
      }

      // If yearMap for the current year is not initialized, initialize it
      if (!yearMap[yr]) {
        yearMap[yr] = [];
      }

      // Parse crop production
      const cropProduction = parseFloat(elem["Crop Production (UOM:t(Tonnes))"]) || 0;
      
      // Add crop data to yearMap for the current year
      yearMap[yr].push({
        name: elem["Crop Name"],
        prod: cropProduction,
        area: areaUnderCultivation,
        yield: yieldOfCrops,
      });

      // Update max and min production and corresponding crops
      if (cropProduction > maxProd) {
        maxProdCrop = elem["Crop Name"];
        maxProd = cropProduction;
      }

      if (cropProduction < minProd) {
        minProdCrop = elem["Crop Name"];
        minProd = cropProduction;
      }
    });

    // Add the last year's max and min production crops to yearMap
    yearMap[yr]?.push({ name: maxProdCrop, prod: maxProd, area: 0, yield: 0 });
    yearMap[yr]?.push({ name: minProdCrop, prod: minProd, area: 0, yield: 0 });

    return { yearMap, cropMap };
  };

  // Process data when the component mounts or data changes
  useEffect(() => {
    const { yearMap, cropMap } = processData(data);
    setYmap(yearMap); // Update state with processed year-wise data
    setCrmap(cropMap); // Update state with processed crop-wise data
  }, [data]);

  return (
    <div className="Center">
      <div>
        <h2>Annual Crop Production 1950-2020 (7a)</h2>
        <TableYear yMap={ymap} /> {/* Render year-wise data table */}
      </div>
      <div>
        <h2>Average Yield & Cultivation Area 1950-2020 (7b)</h2>
        <TableCrop crmap={crmap} /> {/* Render crop-wise data table */}
      </div>
    </div>
  );
}

export default TableViewer;
