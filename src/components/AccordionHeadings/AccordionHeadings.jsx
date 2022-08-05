import { AddIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

import { useCentralTheme } from '@/theme';
export const AccordionHeadings = (props) => {
  const { popupBgColor } = useCentralTheme();
  return (
    <>
      <Box margin="20px">
        <Box bg={popupBgColor} borderRadius="5px" padding="5px 10px">
          <h2>{props.headingOne}</h2>
        </Box>
        <Box
          display="flex"
          marginTop="15px"
          bg={popupBgColor}
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
