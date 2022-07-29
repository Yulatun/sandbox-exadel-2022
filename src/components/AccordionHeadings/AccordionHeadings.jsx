import { AddIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

export const AccordionHeadings = (props) => {
  return (
    <>
      <Box margin="20px">
        <h2>{props.headingOne}</h2>
        <Box display="flex" marginTop="15px">
          <AddIcon
            width="37px"
            height="37px"
            padding="0.7rem"
            border="1px solid"
            borderRadius="50%"
            cursor="pointer"
          />
          <Box paddingTop="7px" marginLeft="20px">
            <h2 border="1px solid">{props.headingTwo}</h2>
          </Box>
        </Box>
      </Box>
    </>
  );
};
