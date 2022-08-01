import React from 'react';
import { useQuery } from 'react-query';
import { Flex, Text } from '@chakra-ui/react';

import loginAction from '@/api/AuthProvider';

import { CentralTheme } from '../../theme/theme';

export const UserName = () => {
  const { data } = useQuery(['user'], () => loginAction());
  return (
    <Flex direction="column" align={{ base: 'flex-start', xl: 'flex-end' }}>
      <Text color={CentralTheme().textColor} fontWeight="bold" fontSize="xl">
        {data?.fullName || ' '}
      </Text>
    </Flex>
  );
};
