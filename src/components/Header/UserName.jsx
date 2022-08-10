import { Flex, Text } from '@chakra-ui/react';

import { useCentralTheme } from '@/theme';

export const UserName = () => {
  const { textColor } = useCentralTheme();

  return (
    <Flex direction="column" align={{ base: 'flex-start', xl: 'flex-end' }}>
      <Text color={textColor} fontWeight="bold" fontSize="xl">
        {/* {data?.fullName || ' '} */}
        {'text'}
      </Text>
    </Flex>
  );
};
