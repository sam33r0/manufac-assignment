# Manufac Assignment: Crop Production Data 
## Overview
This project visualizes crop production data from India between 1950 and 2020. It displays two tables:
Annual Crop Production (1950-2020): Lists the crop with the maximum and minimum production each year.
Average Yield & Cultivation Area (1950-2020): Shows the average yield and cultivation area of each crop over the entire period.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Data Processing](#data-processing)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/sam33r0/manufac-assignment
   cd manufac-assignment



2. Install dependencies:

    ```sh
    yarn install


3. Start Server
    ```sh
    yarn start

## Usage

Open your browser and navigate to http://localhost:3000 to view the application.


## Data Processing

The `TableViewer` component is responsible for processing the data and passing it to the `TableYear` and `TableCrop` components. Below is a high-level overview of the data processing logic:

1. **Initialization**: Initialize state variables to hold the year-wise and crop-wise data maps.

    ```tsx
    const [ymap, setYmap] = useState<{ [key: number]: YmapInter[] }>({});
    const [crmap, setCrmap] = useState<{ [key: string]: CrmapInter }>({});
    ```

2. **Data Processing Function**: Define a function to process the input data and populate the year-wise and crop-wise maps.

    - **Crop Map**: Accumulate area under cultivation and yield of crops for each crop name.
    - **Year Map**: Track maximum and minimum production crops for each year and accumulate data.

    ```tsx
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
    ```

3. **Update State**: Use `useEffect` to process the data and update the state variables when the data changes.

    ```tsx
    useEffect(() => {
      const { yearMap, cropMap } = processData(data);
      setYmap(yearMap);
      setCrmap(cropMap);
    }, [data]);
    ```

4. **Render Tables**: Render the `TableYear` and `TableCrop` components, passing the processed data as props.

    ```tsx
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
    ```


# Project Structure
1. App.tsx: The main component that fetches the data and renders the TableViewer component.<br/>
2. TableViewer.tsx: Processes the fetched data and passes it to the TableYear and TableCrop components for rendering.<br/>
3. TableYear.tsx: Displays a table of the crop with the maximum and minimum production for each year.<br/>
4. TableCrop.tsx: Displays a table of the average yield and cultivation area for each crop.<br/>