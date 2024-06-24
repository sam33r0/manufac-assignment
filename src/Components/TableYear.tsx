import { Table } from '@mantine/core';

function TableYear({ yMap }) {
  // console.log(yMap);
  // Map over crop data to generate table rows
  const row = Object.keys(yMap).map((element: any) =>
    <Table.Tr key={element} color='teal'>
      <Table.Td>{element}</Table.Td>
      <Table.Td>{yMap[element][13].name}</Table.Td>
      <Table.Td>{yMap[element][14].name}</Table.Td>
    </Table.Tr>
  )

  return (
    <div className='table'>
      <Table withColumnBorders withTableBorder  >
        <Table.Thead>
          <Table.Tr>
            <Table.Th  style={{ textAlign: 'center' }}>Year</Table.Th>
            <Table.Th  style={{ textAlign: 'center' }}>Crop with Maximum
              Production in that Year</Table.Th>
            <Table.Th  style={{ textAlign: 'center' }}>Crop with Minimum
              Production in that Year</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{row}</Table.Tbody>
      </Table>
      </div>
  );
}

export default TableYear;
