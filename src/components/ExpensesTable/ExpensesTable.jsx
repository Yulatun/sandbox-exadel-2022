import { Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';

export const ExpensesTable = (props) => {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>{props.date}</Td>
              <Td>{props.category} </Td>
              <Td>{props.amount}</Td>
              <Td>{props.wallet} </Td>
              <Td>{props.payer} </Td>
              <Td>{props.notes} </Td>
              <Td>{props.edit} </Td>
              <Td>{props.delete} </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
