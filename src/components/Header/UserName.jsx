import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Button, Flex, Text } from '@chakra-ui/react';

import { getUser } from '@/api/User';
import { useCentralTheme } from '@/theme';

export const UserName = () => {
  const { data: dataUser, isFetched: isFetchedUser } = useQuery(
    ['user'],
    getUser
  );

  const { textColor } = useCentralTheme();

  return (
    <Flex direction="column" align={{ base: 'flex-start', xl: 'flex-end' }}>
      {!!dataUser && !!dataUser.data && isFetchedUser && (
        <Text color={textColor} fontWeight="bold" fontSize="xl">
          {dataUser.data.fullName}
        </Text>
      )}
      {!!dataUser &&
      !!dataUser.data &&
      !!dataUser.data.isAdmin &&
      isFetchedUser ? (
        <Button as={Link} to="/admin" fontWeight="bold" size="xs" mr="auto">
          Admin
        </Button>
      ) : null}
    </Flex>
  );
};
