import React from 'react';
import { useQuery } from 'react-query';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

import loginAction from '@/api/AuthProvider';

export const UserName = () => {
  const { data } = useQuery(['user'], () => loginAction());
  const headerTextColor = useColorModeValue('teal.900', 'orange.300');

  return (
    <Flex direction="column" align={{ base: '"flex-start"', xl: 'flex-end' }}>
      <Text color={headerTextColor} fontWeight="bold" fontSize="xl">
        {data?.fullName || ' '}
      </Text>
    </Flex>
  );
};
