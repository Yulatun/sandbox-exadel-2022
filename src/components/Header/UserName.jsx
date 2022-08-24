import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Button, Flex, Text } from '@chakra-ui/react';

import { getUser } from '@/api/User';
import { i18n } from '@/i18n';
import { useCentralTheme } from '@/theme';

export const UserName = () => {
  const { data: dataUser, isFetched: isFetchedUser } = useQuery(
    ['user'],
    getUser
  );

  const { textColor } = useCentralTheme();

  return (
    <Flex direction="column" pl={2} pr={4}>
      {!!dataUser && !!dataUser.data && isFetchedUser && (
        <Text
          color={textColor}
          fontWeight="bold"
          fontSize={{ base: 'xl', lg: 'lg', xl: 'xl' }}
          align={{ base: 'initial', lg: 'center' }}
          maxW={{ base: 40, md: 56 }}
        >
          {dataUser.data.fullName}
        </Text>
      )}
      {!!dataUser &&
      !!dataUser.data &&
      !!dataUser.data.isAdmin &&
      isFetchedUser ? (
        <Button
          as={Link}
          to="/admin"
          fontWeight="bold"
          size="xs"
          mx={{ base: 'none', lg: 'auto' }}
          mr={{ base: 'auto', lg: 'none' }}
          mt={{ base: 1, lg: 'none' }}
          lineHeight={1}
        >
          {i18n.t('admin.button')}
        </Button>
      ) : null}
    </Flex>
  );
};
