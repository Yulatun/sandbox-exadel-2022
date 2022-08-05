import { AddIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

import { useCentralTheme } from '@/theme';
export const AccordionHeadings = (props) => {
  const { textColor, popupBgColor } = useCentralTheme();
  return (
    <>
      <Box margin="20px">
        <Box
          bg={popupBgColor}
          borderRadius="5px"
          padding="5px 8px"
          fontSize="lg"
          fontWeight="bold"
          backgroundColor="transparent"
          color={textColor}
        >
          <h2>{props.headingOne}</h2>
        </Box>
        <Box
          display="flex"
          marginTop="10px"
          bg={popupBgColor}
          borderRadius="5px"
          padding="5px 8px"
          backgroundColor="transparent"
        >
          <AddIcon
            width="38px"
            height="37px"
            padding="0.7rem"
            border="2px solid transparent"
            backgroundColor={popupBgColor}
            boxShadow="base"
            borderRadius="50%"
            cursor="pointer"
            color={textColor}
            _hover={{
              boxShadow: 'base',
              border: '2px',
              borderColor: textColor
            }}
          />
          <Box
            paddingTop="4px"
            marginLeft="20px"
            fontSize="lg"
            color={textColor}
          >
            <h2 border="1px solid">{props.headingTwo}</h2>
          </Box>
        </Box>
      </Box>
    </>
  );
};
