import React, { useEffect, useState } from 'react';
import TableCrop from '../TableCrop';
import TableYear from '../TableYear';

interface CrmapInter {
  n: number;
  areaUnderCult: number;
  yieldOfCrop: number;
}

interface YmapInter {
  name: string;
  prod: number;
  area: number;
  yield: number;
}

function TableViewer({ data }: { data: Array<any> }) {
  const [ymap, setYmap] = useState<{ [key: number]: YmapInter[] }>({});
  const [crmap, setCrmap] = useState<{ [key: string]: CrmapInter }>({});

  const processData = (data: Array<any>) => {
    let cropMap: { [key: string]: CrmapInter } = {};
    let yearMap: { [key: number]: YmapInter[] } = {};
    let op = 0;
    let yr = 1950;
    let minProd = Number.MAX_VALUE;
    let minProdCrop = "";
    let maxProdCrop = "";
    let maxProd = Number.MIN_VALUE;

    data.forEach((elem, ind) => {
      const index = Math.floor(ind / 13);

      if (!cropMap[elem["Crop Name"]]) {
        cropMap[elem["Crop Name"]] = { areaUnderCult: 0, yieldOfCrop: 0, n: 0 };
      }

      const areaUnderCultivation = parseFloat(elem["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;
      const yieldOfCrops = parseFloat(elem["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;

      cropMap[elem["Crop Name"]].areaUnderCult += areaUnderCultivation;
      cropMap[elem["Crop Name"]].yieldOfCrop += yieldOfCrops;
      cropMap[elem["Crop Name"]].n += 1;

      if (index !== op) {
        yearMap[yr].push({ name: maxProdCrop, prod: maxProd, area: 0, yield: 0 });
        yearMap[yr].push({ name: minProdCrop, prod: minProd, area: 0, yield: 0 });
        op++;
        yr++;
        maxProd = Number.MIN_VALUE;
        minProd = Number.MAX_VALUE;
        maxProdCrop = "";
        minProdCrop = "";
      }

      if (!yearMap[yr]) {
        yearMap[yr] = [];
      }

      const cropProduction = parseFloat(elem["Crop Production (UOM:t(Tonnes))"]) || 0;
      yearMap[yr].push({
        name: elem["Crop Name"],
        prod: cropProduction,
        area: areaUnderCultivation,
        yield: yieldOfCrops,
      });

      if (cropProduction > maxProd) {
        maxProdCrop = elem["Crop Name"];
        maxProd = cropProduction;
      }

      if (cropProduction < minProd) {
        minProdCrop = elem["Crop Name"];
        minProd = cropProduction;
      }
    });

    yearMap[yr]?.push({ name: maxProdCrop, prod: maxProd, area: 0, yield: 0 });
    yearMap[yr]?.push({ name: minProdCrop, prod: minProd, area: 0, yield: 0 });

    return { yearMap, cropMap };
  };

  useEffect(() => {
    const { yearMap, cropMap } = processData(data);
    setYmap(yearMap);
    setCrmap(cropMap);
  }, [data]);

  return (
    <div className="Center">
      <div>
        <h2>Annual Crop Production 1950-2020 (7a)</h2>
        <TableYear yMap={ymap} />
      </div>
      <div>
        <h2>Average Yield & Cultivation Area 1950-2020 (7b)</h2>
        <TableCrop crmap={crmap} />
      </div>
    </div>
  );
}

export default TableViewer;
