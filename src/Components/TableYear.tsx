import { Table } from '@mantine/core';

function TableYear({ yMap }) {
  // console.log(yMap);
  
  const row = Object.keys(yMap).map((element: any) =>
    <Table.Tr key={element}>
      <Table.Td>{element}</Table.Td>
      <Table.Td>{yMap[element][13].name}</Table.Td>
      <Table.Td>{yMap[element][14].name}</Table.Td>
    </Table.Tr>
  )

  return (
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
  );
}

export default TableYear;
