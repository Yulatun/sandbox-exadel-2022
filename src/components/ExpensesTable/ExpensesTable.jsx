import { Button, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';

export const ExpensesTable = (props) => {
  return (
    <>
      <TableContainer>
        <Table size="sm" w="90%" align="center" mt="10px" bg="orange.200">
          <Tbody>
            <Tr>
              <Td w="12%">{props.date} </Td>
              <Td w="12%">{props.category} </Td>
              <Td w="12%">{props.amount}</Td>
              <Td w="12%">{props.wallet} </Td>
              <Td w="12%">{props.payer} </Td>
              <Td w="12%">{props.notes} </Td>
              <Td w="12%">
                <Button onClick={props.edit}>Edit</Button>
              </Td>
              <Td w="12%">
                <Button onClick={props.delete}>Delete</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
