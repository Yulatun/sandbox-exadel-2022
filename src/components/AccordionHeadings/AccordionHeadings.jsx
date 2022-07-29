import { AddIcon } from '@chakra-ui/icons';
import { Box, useColorModeValue } from '@chakra-ui/react';

export const AccordionHeadings = (props) => {
  const bgMain = useColorModeValue('orange.50', 'teal.800');
  return (
    <>
      <Box margin="20px">
        <Box bg={bgMain} borderRadius="5px" padding="5px 10px">
          <h2>{props.headingOne}</h2>
        </Box>
        <Box
          display="flex"
          marginTop="15px"
          bg={bgMain}
          borderRadius="5px"
          padding="5px 10px"
        >
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
