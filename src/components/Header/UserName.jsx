import React from 'react';
import { useQuery } from 'react-query';
import { Flex, Text } from '@chakra-ui/react';

import loginAction from '@/api/AuthProvider';
import { useCentralTheme } from '@/theme';

export const UserName = () => {
  const { data } = useQuery(['user'], () => loginAction());
  const { textColor } = useCentralTheme();
  return (
    <Flex direction="column" align={{ base: 'flex-start', xl: 'flex-end' }}>
      <Text color={textColor} fontWeight="bold" fontSize="xl">
        {data?.fullName || ' '}
      </Text>
    </Flex>
  );
};
